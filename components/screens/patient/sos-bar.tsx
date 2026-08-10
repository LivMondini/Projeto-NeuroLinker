"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { MicIcon, PhoneCallIcon, PhoneIcon } from "lucide-react"

import { useAppState } from "@/components/app-state"
import { Button } from "@/components/ui/button"

export function SosBar() {
  const { emergencyContact } = useAppState()
  const [calling, setCalling] = React.useState(false)

  return (
    <>
      <div className="sticky bottom-0 z-30 border-t-2 border-foreground/10 bg-card/95 px-4 pt-4 pb-20 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center gap-3">
          <button
            type="button"
            aria-label="Falar com o NeuroLinker (em breve)"
            className="flex h-16 flex-1 items-center gap-3 rounded-full border-2 border-border bg-background pr-2 pl-6 text-left transition-colors hover:border-primary/40"
          >
            <span className="flex-1 truncate text-xl text-muted-foreground">
              Pergunte algo para o NeuroLinker...
            </span>
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <MicIcon className="size-6" />
            </span>
          </button>

          <Button
            size="lg"
            onClick={() => setCalling(true)}
            className="h-16 shrink-0 gap-2 rounded-full bg-destructive px-6 text-xl font-extrabold text-destructive-foreground hover:bg-destructive/90"
          >
            <PhoneIcon className="size-6" data-icon="inline-start" />
            SOS
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {calling && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            role="alertdialog"
            aria-modal="true"
            aria-label="Chamada de emergência"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-pastel-story px-6 text-center"
          >
            <motion.span
              animate={{ opacity: [0.55, 1, 0.55] }}
              transition={{
                duration: 2.8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="flex size-28 items-center justify-center rounded-full bg-card text-primary"
            >
              <PhoneCallIcon className="size-14" />
            </motion.span>

            <div className="flex flex-col gap-3">
              <p className="text-3xl font-semibold text-muted-foreground">
                Ligando para
              </p>
              <p className="text-4xl leading-tight font-extrabold text-balance">
                {emergencyContact.name}
              </p>
              <p className="text-2xl">{emergencyContact.phone}</p>
            </div>

            <p className="max-w-md text-xl leading-relaxed text-pretty text-muted-foreground">
              Fique tranquilo. Respire com calma, a ajuda já está a caminho.
            </p>

            <Button
              variant="outline"
              size="lg"
              onClick={() => setCalling(false)}
              className="h-16 rounded-2xl px-10 text-xl font-bold"
            >
              Cancelar chamada
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
