"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight, Compass, Home, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Match Predictor",
      icon: Compass,
      href: "/predictor",
      active: pathname === "/predictor",
    },
    {
      label: "Venue Stats",
      icon: MapPin,
      href: "/venues",
      active: pathname === "/venues",
    },
  ]

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex h-full flex-col border-r bg-background transition-all duration-300",
        isOpen ? "w-64" : "w-[70px]",
      )}
    >
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/new-ipl-logo.png" alt="IPL Logo" width={48} height={48} className="h-12 w-12" />
          {isOpen && (
            <div className="flex flex-col">
              <span className="font-semibold leading-none tracking-tight">IPL Predictor</span>
              <span className="text-xs text-muted-foreground">ML | DL</span>
            </div>
          )}
        </Link>
        <div className="flex-1" />
        <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>
      <ScrollArea className="flex-1 py-2">
        <nav className="grid gap-1 px-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                route.active ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                !isOpen && "justify-center",
              )}
            >
              <route.icon className={cn("h-5 w-5", route.active && "text-primary")} />
              {isOpen && <span>{route.label}</span>}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="mt-auto border-t p-4">
        <div className={cn("flex items-center gap-3", !isOpen && "justify-center")}>
          <div className="relative h-8 w-8 rounded-full bg-primary/20">
            <span className="absolute inset-0 flex items-center justify-center font-semibold text-primary">AI</span>
          </div>
          {isOpen && (
            <div className="grid gap-0.5 text-sm">
              <span className="font-medium">AI Predictor</span>
              <span className="text-xs text-muted-foreground">v2.0.4 (Beta)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
