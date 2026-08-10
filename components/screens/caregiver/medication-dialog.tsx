"use client"

import * as React from "react"

import { useAppState } from "@/components/app-state"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PERIODS, type Medication, type Period } from "@/lib/types"

type Draft = {
  name: string
  dosage: string
  time: string
  period: Period
}

const emptyDraft: Draft = {
  name: "",
  dosage: "",
  time: "08:00",
  period: "Manhã",
}

export function MedicationDialog({
  open,
  onOpenChange,
  editing,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  editing: Medication | null
}) {
  const { addMedication, updateMedication } = useAppState()
  const [draft, setDraft] = React.useState<Draft>(emptyDraft)

  React.useEffect(() => {
    if (open) {
      setDraft(
        editing
          ? {
              name: editing.name,
              dosage: editing.dosage,
              time: editing.time,
              period: editing.period,
            }
          : emptyDraft,
      )
    }
  }, [open, editing])

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!draft.name.trim()) return
    if (editing) {
      updateMedication(editing.id, draft)
    } else {
      addMedication(draft)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Editar remédio" : "Novo remédio"}
            </DialogTitle>
            <DialogDescription>
              As alterações aparecem na Tela do Idoso imediatamente.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-4">
            <Field>
              <FieldLabel htmlFor="med-name">Nome</FieldLabel>
              <Input
                id="med-name"
                value={draft.name}
                onChange={(event) =>
                  setDraft({ ...draft, name: event.target.value })
                }
                placeholder="Ex.: Donepezila"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="med-dosage">Dosagem</FieldLabel>
              <Input
                id="med-dosage"
                value={draft.dosage}
                onChange={(event) =>
                  setDraft({ ...draft, dosage: event.target.value })
                }
                placeholder="Ex.: 10 mg — 1 comprimido"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="med-time">Horário</FieldLabel>
              <Input
                id="med-time"
                type="time"
                value={draft.time}
                onChange={(event) =>
                  setDraft({ ...draft, time: event.target.value })
                }
              />
            </Field>
            <Field>
              <FieldLabel>Período</FieldLabel>
              <Select
                value={draft.period}
                onValueChange={(value) =>
                  setDraft({ ...draft, period: value as Period })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {PERIODS.map((period) => (
                      <SelectItem key={period} value={period}>
                        {period}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
