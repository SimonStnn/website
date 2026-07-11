'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type ConsentState = 'accepted' | 'declined' | null

interface ConsentContextValue {
  consent: ConsentState
  accept: () => void
  decline: () => void
  reset: () => void
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

const STORAGE_KEY = 'cookie-consent'

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>(null)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'accepted' || stored === 'declined') {
      setConsent(stored)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setConsent('accepted')
  }

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setConsent('declined')
  }

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY)
    setConsent(null)
  }

  return (
    <ConsentContext.Provider value={{ consent, accept, decline, reset }}>
      {children}
    </ConsentContext.Provider>
  )
}

export function useConsent() {
  const context = useContext(ConsentContext)
  if (!context) throw new Error('useConsent must be used within ConsentProvider')
  return context
}
