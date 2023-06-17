"use client"

import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function Logo() {
  const theme = useTheme();

  const setTheme = () => {
    if (theme.theme === "dark") {
      return "bg-gradient-one";
    } else if (theme.theme === "light") {
      return "bg-gradient-two";
    } else return "bg-gradient-three";
  }

  useEffect(() => {
    
  }, [])

  return (
    <span className={`w-6 h-6 rounded-full ${setTheme()} cursor-pointer`} />
  )
}