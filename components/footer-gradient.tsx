"use client"

import { useTheme } from "next-themes";

export default function FooterGradient() {
  const theme = useTheme();

  const setTheme = () => {
    if (theme.theme === "dark") {
      return "bg-gradient-one";
    } else if (theme.theme === "light") {
      return "bg-gradient-two";
    } else return "bg-gradient-three";
  }

  return (
    <div className={`w-full max-w-screen h-1 ${setTheme()}`} />
  )
}