"use client"

import type * as React from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

type BigCardProps = {
  title: string
  icon: React.ComponentType<{ className?: string }>
  /** Classe de fundo pastel, ex: "bg-pastel-story" */
  tone: string
  delay?: number
  children: React.ReactNode
}

export function BigCard({
  title,
  icon: Icon,
  tone,
  delay = 0,
  children,
}: BigCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
      className={cn(
        "flex flex-col gap-5 rounded-3xl border-2 border-foreground/10 p-6",
        tone
      )}
      aria-labelledby={`secao-${title}`}
    >
      <header className="flex items-center gap-4">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-card text-foreground">
          <Icon className="size-8" />
        </span>
        <h2
          id={`secao-${title}`}
          className="text-[1.75rem] leading-tight font-extrabold text-balance"
        >
          {title}
        </h2>
      </header>
      {children}
    </motion.section>
  )
}
