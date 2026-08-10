"use client"

import * as React from "react"
import {
  CameraIcon,
  ImageIcon,
  MessageCircleQuestionIcon,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react"

import { useAppState } from "@/components/app-state"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { readFileAsDataUrl } from "@/lib/read-file-as-data-url"
import { formatRelativeDay } from "@/lib/relative-time"
import type { Memory, MemoryType } from "@/lib/types"

type Draft = { title: string; content: string }

export function MemoriesTab() {
  const { memories, addMemory, updateMemory, removeMemory } = useAppState()

  const [open, setOpen] = React.useState(false)
  const [type, setType] = React.useState<MemoryType>("faq")
  const [editing, setEditing] = React.useState<Memory | null>(null)
  const [draft, setDraft] = React.useState<Draft>({ title: "", content: "" })

  const faqs = memories.filter((memory) => memory.type === "faq")
  const photos = memories
    .filter((memory) => memory.type === "photo")
    .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))

  const lastPhoto = photos[0]

  function openNew(nextType: MemoryType) {
    setType(nextType)
    setEditing(null)
    setDraft({ title: "", content: "" })
    setOpen(true)
  }

  function openEdit(memory: Memory) {
    setType(memory.type)
    setEditing(memory)
    setDraft({ title: memory.title, content: memory.content })
    setOpen(true)
  }

  async function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    const dataUrl = await readFileAsDataUrl(file)
    setDraft((d) => ({ ...d, content: dataUrl }))
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!draft.title.trim()) return
    if (editing) {
      updateMemory(editing.id, draft)
    } else {
      addMemory({ ...draft, type, createdAt: Date.now() })
    }
    setOpen(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Perguntas frequentes</CardTitle>
          <CardDescription>
            Respostas curtas que aparecem em &ldquo;Minha História&rdquo;.
          </CardDescription>
          <CardAction>
            <Button onClick={() => openNew("faq")}>
              <PlusIcon data-icon="inline-start" />
              Nova pergunta
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          {faqs.length === 0 ? (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <MessageCircleQuestionIcon />
                </EmptyMedia>
                <EmptyTitle>Nenhuma pergunta cadastrada</EmptyTitle>
                <EmptyDescription>
                  Cadastre respostas como &ldquo;Quem sou eu?&rdquo; ou
                  &ldquo;Onde eu estou?&rdquo;.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <ul className="flex flex-col gap-3">
              {faqs.map((faq) => (
                <li
                  key={faq.id}
                  className="flex items-start gap-3 rounded-xl border border-border p-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{faq.title}</p>
                    <p className="text-sm text-pretty text-muted-foreground">
                      {faq.content}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEdit(faq)}
                    aria-label={`Editar ${faq.title}`}
                  >
                    <PencilIcon />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeMemory(faq.id)}
                    aria-label={`Remover ${faq.title}`}
                  >
                    <Trash2Icon />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-bold">
              <ImageIcon className="size-5 text-pastel-memories-icon" />
              Galeria &amp; Biografia
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Lembranças e momentos especiais
            </p>
          </div>
          <Button
            size="sm"
            className="rounded-full"
            onClick={() => openNew("photo")}
          >
            <PlusIcon data-icon="inline-start" />
            Adicionar
          </Button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((photo) => (
            <div key={photo.id} className="group relative">
              <button
                type="button"
                onClick={() => openEdit(photo)}
                className="block aspect-square w-full overflow-hidden rounded-2xl bg-pastel-memories"
              >
                {photo.content ? (
                  <img
                    src={photo.content || "/placeholder.svg"}
                    alt={photo.title}
                    className="size-full object-cover"
                  />
                ) : (
                  <span className="flex size-full items-center justify-center text-pastel-memories-icon">
                    <ImageIcon className="size-8" />
                  </span>
                )}
              </button>
              <p className="mt-2 truncate text-sm font-semibold">
                {photo.title}
              </p>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => removeMemory(photo.id)}
                aria-label={`Remover ${photo.title}`}
                className="absolute top-1.5 right-1.5 bg-card/90 opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
              >
                <Trash2Icon />
              </Button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => openNew("photo")}
            className="flex aspect-square w-full flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-pastel-memories-icon/40 text-pastel-memories-icon transition-colors hover:bg-pastel-memories/40"
          >
            <PlusIcon className="size-6" />
          </button>
        </div>

        <p className="mt-5 text-sm text-muted-foreground">
          <strong className="text-foreground">
            {photos.length} {photos.length === 1 ? "memória" : "memórias"}
          </strong>{" "}
          registrada{photos.length === 1 ? "" : "s"} · Última adicionada{" "}
          {formatRelativeDay(lastPhoto?.createdAt)}
        </p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                {editing ? "Editar memória" : "Nova memória"}
              </DialogTitle>
              <DialogDescription>
                {type === "faq"
                  ? "Pergunta e resposta em linguagem simples e acolhedora."
                  : "Título da lembrança e uma foto do momento."}
              </DialogDescription>
            </DialogHeader>

            <FieldGroup className="py-4">
              <Field>
                <FieldLabel htmlFor="memory-title">
                  {type === "faq" ? "Pergunta" : "Título da foto"}
                </FieldLabel>
                <Input
                  id="memory-title"
                  value={draft.title}
                  onChange={(event) =>
                    setDraft({ ...draft, title: event.target.value })
                  }
                  placeholder={
                    type === "faq" ? "Quem sou eu?" : "Aniversário de 70 anos"
                  }
                  required
                />
              </Field>
              {type === "faq" ? (
                <Field>
                  <FieldLabel htmlFor="memory-content">Resposta</FieldLabel>
                  <Textarea
                    id="memory-content"
                    rows={4}
                    value={draft.content}
                    onChange={(event) =>
                      setDraft({ ...draft, content: event.target.value })
                    }
                    placeholder="Você é a Helena, tem 78 anos e mora..."
                  />
                </Field>
              ) : (
                <Field>
                  <FieldLabel>Foto</FieldLabel>
                  <div className="flex items-center gap-4">
                    <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-pastel-memories">
                      {draft.content ? (
                        <img
                          src={draft.content || "/placeholder.svg"}
                          alt=""
                          className="size-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="size-6 text-pastel-memories-icon" />
                      )}
                    </div>
                    <label
                      htmlFor="memory-photo"
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-3.5 py-2 text-sm font-medium transition-colors hover:bg-muted"
                    >
                      <CameraIcon className="size-4" />
                      Escolher foto
                      <input
                        id="memory-photo"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handlePhotoChange}
                      />
                    </label>
                  </div>
                </Field>
              )}
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
