'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { STREAM_URL, isOnAir } from '@/lib/constants'
import { trackPlayRadio } from '@/lib/ga'

type PlayerContextValue = {
  playing: boolean
  onAir: boolean
  toggle: () => void
  play: () => void
  stop: () => void
}

const PlayerContext = createContext<PlayerContextValue | null>(null)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [onAir, setOnAir] = useState(() => isOnAir())

  useEffect(() => {
    const tick = () => {
      const live = isOnAir()
      setOnAir(live)
      if (!live && audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause()
        setPlaying(false)
      }
    }
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const audio = new Audio(STREAM_URL)
    audio.preload = 'none'
    audioRef.current = audio

    const onEnded = () => setPlaying(false)
    const onPause = () => setPlaying(false)
    const onPlay = () => setPlaying(true)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('play', onPlay)

    return () => {
      audio.pause()
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('play', onPlay)
      audioRef.current = null
    }
  }, [])

  const play = useCallback(() => {
    if (!isOnAir()) {
      setOnAir(false)
      return
    }
    const audio = audioRef.current
    if (!audio) return
    void audio
      .play()
      .then(() => {
        trackPlayRadio()
        setPlaying(true)
      })
      .catch(() => {
        setPlaying(false)
      })
  }, [])

  const stop = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    setPlaying(false)
  }, [])

  const toggle = useCallback(() => {
    if (playing) stop()
    else play()
  }, [play, playing, stop])

  const value = useMemo(
    () => ({ playing, onAir, toggle, play, stop }),
    [playing, onAir, toggle, play, stop],
  )

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider')
  return ctx
}
