"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <section className="flex gap-4 py-2">
      <Button
        variant="theme"
        size="theme"
        className="bg-gradient-one"
        onClick={() => setTheme("dark")}
      />
      <Button
        variant="theme"
        size="theme"
        className="bg-gradient-two"
        onClick={() => setTheme("light")}
      />
      <Button
        variant="theme"
        size="theme"
        className="bg-gradient-three"
        onClick={() => setTheme("cyberpunk")}
      />
    </section>
  )
}