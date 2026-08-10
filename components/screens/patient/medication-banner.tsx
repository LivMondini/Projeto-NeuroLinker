"use client"

import { motion } from "motion/react"
import { CheckIcon, PillIcon, SunIcon } from "lucide-react"

import { useAppState } from "@/components/app-state"
import { Button } from "@/components/ui/button"
import { PERIODS } from "@/lib/types"

export function MedicationBanner() {
  const { medications, toggleMedication } = useAppState()

  const pending = [...medications]
    .filter((med) => !med.taken)
    .sort(
      (a, b) =>
        PERIODS.indexOf(a.period) - PERIODS.indexOf(b.period) ||
        a.time.localeCompare(b.time)
    )

  const next = pending[0]

  if (!next) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="flex items-center gap-4 rounded-3xl border-2 border-primary/25 bg-card p-6"
      >
        <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
          <SunIcon className="size-8" />
        </span>
        <p className="text-2xl leading-snug font-bold text-pretty">
          Tudo em ordem! Você já tomou todos os remédios de hoje.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="flex flex-col gap-5 rounded-3xl border-2 border-primary/30 bg-card p-6 md:flex-row md:items-center md:justify-between"
    >
      <div className="flex items-center gap-4">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
          <PillIcon className="size-8" />
        </span>
        <div className="flex flex-col gap-1">
          <p className="text-xl font-semibold text-muted-foreground">
            Próximo remédio — {next.period}, às {next.time}
          </p>
          <p className="text-[2rem] leading-tight font-extrabold text-balance">
            {next.name}
          </p>
          <p className="text-xl">{next.dosage}</p>
        </div>
      </div>

      <Button
        size="lg"
        onClick={() => toggleMedication(next.id, true)}
        className="h-16 w-full shrink-0 rounded-2xl text-2xl font-bold md:w-auto md:px-8"
      >
        <CheckIcon className="size-7" data-icon="inline-start" />
        Já tomei
      </Button>
    </motion.div>
  )
}
