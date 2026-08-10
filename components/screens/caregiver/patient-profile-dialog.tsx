"use client"

import * as React from "react"
import { CameraIcon, PencilIcon } from "lucide-react"

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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { readFileAsDataUrl } from "@/lib/read-file-as-data-url"

export function PatientProfileDialog() {
  const { patientName, patientAge, patientBio, patientPhotoUrl, setPatientProfile } =
    useAppState()

  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState(patientName)
  const [age, setAge] = React.useState(String(patientAge))
  const [bio, setBio] = React.useState(patientBio)
  const [photoUrl, setPhotoUrl] = React.useState(patientPhotoUrl)

  React.useEffect(() => {
    if (open) {
      setName(patientName)
      setAge(String(patientAge))
      setBio(patientBio)
      setPhotoUrl(patientPhotoUrl)
    }
  }, [open, patientName, patientAge, patientBio, patientPhotoUrl])

  async function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    const dataUrl = await readFileAsDataUrl(file)
    setPhotoUrl(dataUrl)
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!name.trim()) return
    setPatientProfile({
      patientName: name.trim(),
      patientAge: Number(age) || 0,
      patientBio: bio.trim(),
      patientPhotoUrl: photoUrl,
    })
    setOpen(false)
  }

  const initials = patientName
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        aria-label="Editar perfil do paciente"
        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <PencilIcon className="size-4" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Editar perfil do paciente</DialogTitle>
            <DialogDescription>
              Essas informações aparecem no painel do cuidador e ajudam a
              personalizar a Tela do Idoso.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-4">
            <div className="flex items-center gap-4">
              <Avatar size="lg" className="size-16">
                <AvatarImage src={photoUrl || undefined} alt={name} />
                <AvatarFallback className="text-base">
                  {initials || "?"}
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="patient-photo"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-3.5 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                <CameraIcon className="size-4" />
                Escolher foto
                <input
                  id="patient-photo"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handlePhotoChange}
                />
              </label>
            </div>

            <Field>
              <FieldLabel htmlFor="patient-name">Nome</FieldLabel>
              <Input
                id="patient-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ex.: Maria Aparecida"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="patient-age">Idade</FieldLabel>
              <Input
                id="patient-age"
                type="number"
                min={0}
                max={120}
                value={age}
                onChange={(event) => setAge(event.target.value)}
                placeholder="Ex.: 78"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="patient-bio">Sobre</FieldLabel>
              <Textarea
                id="patient-bio"
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                placeholder="Ex.: Foi professora de português por 30 anos."
                rows={3}
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
