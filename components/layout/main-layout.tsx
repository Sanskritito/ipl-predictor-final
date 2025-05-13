"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { TopNav } from "./top-nav"
import { cn } from "@/lib/utils"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNav onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main
          className={cn(
            "flex-1 overflow-y-auto p-4 md:p-6 transition-all duration-300",
            isSidebarOpen ? "md:ml-64" : "md:ml-20",
          )}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
