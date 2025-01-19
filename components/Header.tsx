// components/Header.tsx
'use client'

import { useEffect, useState } from 'react'

export default function Header() {
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')
  }, [])

  return (
    <header className="border-b p-4">
      <h1 className="text-2xl font-bold">
        {greeting}, User
      </h1>
    </header>
  )
}