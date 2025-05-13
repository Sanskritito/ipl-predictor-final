"use client"

import Image from "next/image"
import { useState } from "react"
import { getTeamLogo } from "@/lib/team-logos"

interface TeamSelectItemProps {
  teamName: string
}

export function TeamSelectItem({ teamName }: TeamSelectItemProps) {
  const [imageError, setImageError] = useState(false)
  const logoPath = getTeamLogo(teamName)

  return (
    <div className="flex items-center gap-2">
      <div className="relative h-8 w-8 overflow-hidden rounded-full bg-white">
        <Image
          src={
            imageError
              ? `/placeholder.svg?height=32&width=32&query=${encodeURIComponent(teamName + " logo")}`
              : logoPath
          }
          alt={teamName}
          fill
          priority
          className="object-contain p-1"
          onError={() => setImageError(true)}
        />
      </div>
      <span>{teamName}</span>
    </div>
  )
}
