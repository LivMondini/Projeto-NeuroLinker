"use client"

import * as React from "react"
import { CameraIcon, PencilIcon, Trash2Icon, UsersIcon } from "lucide-react"

import { useAppState } from "@/components/app-state"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { readFileAsDataUrl } from "@/lib/read-file-as-data-url"
import type { FamilyMember } from "@/lib/types"

type Draft = { name: string; relation: string; photoUrl: string }

const emptyDraft: Draft = { name: "", relation: "", photoUrl: "" }

export function FamilyTab() {
  const {
    familyMembers,
    addFamilyMember,
    updateFamilyMember,
    removeFamilyMember,
  } = useAppState()

  const [open, setOpen] = React.useState(false)
  const [editing, setEditing] = React.useState<FamilyMember | null>(null)
  const [draft, setDraft] = React.useState<Draft>(emptyDraft)

  function openNew() {
    setEditing(null)
    setDraft(emptyDraft)
    setOpen(true)
  }

  function openEdit(member: FamilyMember) {
    setEditing(member)
    setDraft({
      name: member.name,
      relation: member.relation,
      photoUrl: member.photoUrl,
    })
    setOpen(true)
  }

  async function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    const dataUrl = await readFileAsDataUrl(file)
    setDraft((d) => ({ ...d, photoUrl: dataUrl }))
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!draft.name.trim()) return
    if (editing) {
      updateFamilyMember(editing.id, draft)
    } else {
      addFamilyMember(draft)
    }
    setOpen(false)
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold">Família</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Pessoas que aparecem no card &ldquo;Minha Família&rdquo;.
          </p>
        </div>
        <Button size="sm" className="rounded-full" onClick={openNew}>
          <span aria-hidden="true">+</span>
          Adicionar
        </Button>
      </div>

      <div className="mt-5">
        {familyMembers.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <UsersIcon />
              </EmptyMedia>
              <EmptyTitle>Nenhum familiar cadastrado</EmptyTitle>
              <EmptyDescription>
                Adicione nome, parentesco e foto para ajudar no reconhecimento.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button onClick={openNew}>Adicionar familiar</Button>
            </EmptyContent>
          </Empty>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {familyMembers.map((member) => (
              <li
                key={member.id}
                className="flex items-center gap-3 rounded-2xl bg-muted p-3"
              >
                <Avatar className="size-12">
                  <AvatarImage
                    src={member.photoUrl || undefined}
                    alt={`Foto de ${member.name}`}
                  />
                  <AvatarFallback>
                    {member.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{member.name}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {member.relation || "Parentesco não informado"}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openEdit(member)}
                  aria-label={`Editar ${member.name}`}
                >
                  <PencilIcon />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFamilyMember(member.id)}
                  aria-label={`Remover ${member.name}`}
                >
                  <Trash2Icon />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                {editing ? "Editar familiar" : "Novo familiar"}
              </DialogTitle>
              <DialogDescription>
                Use fotos nítidas e recentes sempre que possível.
              </DialogDescription>
            </DialogHeader>

            <FieldGroup className="py-4">
              <div className="flex items-center gap-4">
                <Avatar size="lg" className="size-16">
                  <AvatarImage
                    src={draft.photoUrl || undefined}
                    alt={draft.name}
                  />
                  <AvatarFallback className="text-base">
                    {draft.name.slice(0, 2).toUpperCase() || "?"}
                  </AvatarFallback>
                </Avatar>
                <label
                  htmlFor="family-photo"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-3.5 py-2 text-sm font-medium transition-colors hover:bg-muted"
                >
                  <CameraIcon className="size-4" />
                  Escolher foto
                  <input
                    id="family-photo"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handlePhotoChange}
                  />
                </label>
              </div>

              <Field>
                <FieldLabel htmlFor="family-name">Nome</FieldLabel>
                <Input
                  id="family-name"
                  value={draft.name}
                  onChange={(event) =>
                    setDraft({ ...draft, name: event.target.value })
                  }
                  placeholder="Ex.: Ana"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="family-relation">Parentesco</FieldLabel>
                <Input
                  id="family-relation"
                  value={draft.relation}
                  onChange={(event) =>
                    setDraft({ ...draft, relation: event.target.value })
                  }
                  placeholder="Ex.: Filha"
                />
              </Field>
            </FieldGroup>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
