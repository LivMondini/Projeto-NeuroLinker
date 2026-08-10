"use client"

import { CheckIcon, PlusIcon } from "lucide-react"

import { useAppState } from "@/components/app-state"
import { Button } from "@/components/ui/button"
import { MOODS } from "@/lib/types"
import { cn } from "@/lib/utils"

const moodEmoji: Record<string, string> = {
  tranquilo: "🙂",
  alegre: "😄",
  confuso: "😕",
  agitado: "😠",
  triste: "😢",
}

export function OverviewTab({
  onNewMedication,
}: {
  onNewMedication: () => void
}) {
  const { medications, patientMood, setPatientMood, toggleMedication } =
    useAppState()

  const taken = medications.filter((med) => med.taken)

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-bold">Como a paciente está hoje?</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Registre o estado emocional dela
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {MOODS.map((mood) => {
            const isActive = patientMood === mood.value
            return (
              <button
                key={mood.value}
                type="button"
                onClick={() => setPatientMood(mood.value)}
                aria-pressed={isActive}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-2xl border px-4 py-5 transition-colors",
                  isActive
                    ? "border-primary/40 bg-primary/10"
                    : "border-transparent bg-muted hover:bg-muted/70",
                )}
              >
                <span className="text-3xl">{moodEmoji[mood.value]}</span>
                <span className="text-sm font-semibold">{mood.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-bold">
              <span aria-hidden="true">💊</span>
              Medicamentos de Hoje
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {taken.length}/{medications.length} administrados
            </p>
          </div>
          <Button
            size="sm"
            className="rounded-full"
            onClick={onNewMedication}
          >
            <PlusIcon data-icon="inline-start" />
            Novo Remédio
          </Button>
        </div>

        <ul className="mt-5 flex flex-col gap-2">
          {medications.map((med) => (
            <li key={med.id}>
              <button
                type="button"
                onClick={() => toggleMedication(med.id, !med.taken)}
                aria-pressed={med.taken}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors",
                  med.taken ? "bg-primary/10" : "bg-muted",
                )}
              >
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full border-2",
                    med.taken
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/30 bg-transparent",
                  )}
                >
                  {med.taken && <CheckIcon className="size-3.5" />}
                </span>
                <span
                  className={cn(
                    "min-w-0 flex-1 truncate font-semibold",
                    med.taken && "text-muted-foreground line-through",
                  )}
                >
                  {med.name} {med.dosage ? `— ${med.dosage.split(" ")[0]}` : ""}
                </span>
                <span
                  className={cn(
                    "shrink-0 text-sm tabular-nums text-muted-foreground",
                    med.taken && "line-through",
                  )}
                >
                  {med.time}
                </span>
              </button>
            </li>
          ))}
          {medications.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Nenhum remédio cadastrado ainda.
            </p>
          )}
        </ul>
      </div>
    </div>
  )
}
