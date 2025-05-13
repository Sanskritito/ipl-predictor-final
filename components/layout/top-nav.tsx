"use client"

import { Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ModeToggle } from "../mode-toggle"

interface TopNavProps {
  onMenuClick: () => void
}

export function TopNav({ onMenuClick }: TopNavProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>
      <div className="flex items-center gap-2 md:hidden">
        <Image src="/images/ipl-logo.png" alt="IPL Logo" width={48} height={48} className="h-12 w-12" />
        <span className="font-semibold">IPL Predictor</span>
      </div>
      <div className="flex-1"></div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary"></span>
          <span className="sr-only">Notifications</span>
        </Button>
        <ModeToggle />
      </div>
    </header>
  )
}
