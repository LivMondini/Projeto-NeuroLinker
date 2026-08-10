"use client"

import { motion } from "motion/react"

import { cn } from "@/lib/utils"

type PatientMenuCardProps = {
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  /** Classe de fundo pastel, ex: "bg-pastel-story" */
  tone: string
  /** Classe de fundo do ícone, ex: "bg-pastel-story-icon" */
  iconTone: string
  onClick: () => void
  delay?: number
}

export function PatientMenuCard({
  title,
  subtitle,
  icon: Icon,
  tone,
  iconTone,
  onClick,
  delay = 0,
}: PatientMenuCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "flex flex-col items-start gap-4 rounded-3xl border-2 border-foreground/10 p-6 text-left transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40",
        tone
      )}
    >
      <span
        className={cn(
          "flex size-14 shrink-0 items-center justify-center rounded-2xl text-primary-foreground",
          iconTone
        )}
      >
        <Icon className="size-7" />
      </span>
      <span className="flex flex-col gap-1">
        <span className="text-2xl leading-tight font-extrabold text-balance">
          {title}
        </span>
        <span className="text-lg text-muted-foreground">{subtitle}</span>
      </span>
    </motion.button>
  )
}
