"use client"

import * as React from "react"
import { PencilIcon, PillIcon, PlusIcon, Trash2Icon } from "lucide-react"

import { useAppState } from "@/components/app-state"
import { MedicationDialog } from "@/components/screens/caregiver/medication-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Switch } from "@/components/ui/switch"
import { PERIODS, type Medication } from "@/lib/types"

export function MedicationsTab() {
  const { medications, removeMedication, toggleMedication } = useAppState()

  const [open, setOpen] = React.useState(false)
  const [editing, setEditing] = React.useState<Medication | null>(null)

  function openNew() {
    setEditing(null)
    setOpen(true)
  }

  function openEdit(med: Medication) {
    setEditing(med)
    setOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      {PERIODS.map((period) => {
        const items = medications
          .filter((med) => med.period === period)
          .sort((a, b) => a.time.localeCompare(b.time))

        return (
          <Card key={period}>
            <CardHeader>
              <CardTitle>{period}</CardTitle>
              <CardDescription>
                {items.length === 0
                  ? "Nenhum remédio neste período"
                  : `${items.length} remédio(s) programado(s)`}
              </CardDescription>
              {period === "Manhã" && (
                <CardAction>
                  <Button onClick={openNew}>
                    <PlusIcon data-icon="inline-start" />
                    Novo remédio
                  </Button>
                </CardAction>
              )}
            </CardHeader>
            <CardContent>
              {items.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Use “Novo remédio” para adicionar uma dose neste período.
                </p>
              ) : (
                <ul className="flex flex-col gap-3">
                  {items.map((med) => (
                    <li
                      key={med.id}
                      className="flex flex-wrap items-center gap-3 rounded-xl border border-border p-3"
                    >
                      <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                        <PillIcon className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold">{med.name}</p>
                        <p className="truncate text-sm text-muted-foreground">
                          {med.time} · {med.dosage}
                        </p>
                      </div>
                      <Badge variant={med.taken ? "default" : "secondary"}>
                        {med.taken ? "Tomado" : "Pendente"}
                      </Badge>
                      <Switch
                        checked={med.taken}
                        onCheckedChange={(checked) =>
                          toggleMedication(med.id, checked)
                        }
                        aria-label={`Marcar ${med.name} como tomado`}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEdit(med)}
                        aria-label={`Editar ${med.name}`}
                      >
                        <PencilIcon />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeMedication(med.id)}
                        aria-label={`Remover ${med.name}`}
                      >
                        <Trash2Icon />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        )
      })}

      {medications.length === 0 && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <PillIcon />
            </EmptyMedia>
            <EmptyTitle>Nenhum remédio cadastrado</EmptyTitle>
            <EmptyDescription>
              Cadastre a rotina de medicação para que ela apareça na Tela do
              Idoso.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={openNew}>
              <PlusIcon data-icon="inline-start" />
              Adicionar remédio
            </Button>
          </EmptyContent>
        </Empty>
      )}

      <MedicationDialog open={open} onOpenChange={setOpen} editing={editing} />
    </div>
  )
}
