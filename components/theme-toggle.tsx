"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ThemeToggleProps {
  theme: string
  setTheme: (theme: string) => void
}

export function ThemeToggle({ theme, setTheme }: ThemeToggleProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`${
        theme === "dark"
          ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
          : "bg-white border-gray-200 text-gray-800 hover:bg-gray-100"
      } transition-colors`}
    >
      {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
