'use client' // Must be a client component

import { createContext, useContext } from 'react'

const ScrollContext = createContext<any>(null)

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = 0 // Adjust for fixed navbar
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset

      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <ScrollContext.Provider value={{ scrollToSection }}>
      {children}
    </ScrollContext.Provider>
  )
}

export const useScroll = () => useContext(ScrollContext)
