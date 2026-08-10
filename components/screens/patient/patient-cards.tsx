"use client"

import Image from "next/image"
import {
  BookOpenIcon,
  CheckCircle2Icon,
  ClockIcon,
  ImageIcon,
  MoonIcon,
  SunIcon,
  SunsetIcon,
  UsersIcon,
} from "lucide-react"

import { useAppState } from "@/components/app-state"
import { BigCard } from "@/components/screens/patient/big-card"
import { PERIODS, type Period } from "@/lib/types"

function EmptyLine({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-2xl border-2 border-dashed border-foreground/15 bg-card/70 p-5 text-xl text-pretty text-muted-foreground">
      {children}
    </p>
  )
}

export function StoryCard() {
  const { memories } = useAppState()
  const faqs = memories.filter((memory) => memory.type === "faq")

  return (
    <BigCard title="Minha História" icon={BookOpenIcon} tone="bg-pastel-story">
      {faqs.length === 0 ? (
        <EmptyLine>
          Ainda não há histórias cadastradas. Seu cuidador vai adicionar em
          breve.
        </EmptyLine>
      ) : (
        <ul className="flex flex-col gap-4">
          {faqs.map((faq) => (
            <li
              key={faq.id}
              className="rounded-2xl bg-card p-5 text-xl leading-relaxed"
            >
              <p className="font-extrabold">{faq.title}</p>
              <p className="mt-2 text-pretty">{faq.content}</p>
            </li>
          ))}
        </ul>
      )}
    </BigCard>
  )
}

export function FamilyCard() {
  const { familyMembers } = useAppState()

  return (
    <BigCard
      title="Minha Família"
      icon={UsersIcon}
      tone="bg-pastel-family"
      delay={0.1}
    >
      {familyMembers.length === 0 ? (
        <EmptyLine>Nenhum familiar cadastrado até agora.</EmptyLine>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {familyMembers.map((member) => (
            <li
              key={member.id}
              className="flex items-center gap-4 rounded-2xl bg-card p-4"
            >
              <Image
                src={member.photoUrl || "/placeholder.svg"}
                alt={`Foto de ${member.name}`}
                width={96}
                height={96}
                className="size-20 shrink-0 rounded-2xl object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-xl font-extrabold">{member.name}</p>
                <p className="truncate text-lg text-muted-foreground">
                  {member.relation}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </BigCard>
  )
}

const periodIcon: Record<Period, typeof SunIcon> = {
  Manhã: SunIcon,
  Tarde: SunsetIcon,
  Noite: MoonIcon,
}

export function RoutineCard() {
  const { medications } = useAppState()

  return (
    <BigCard
      title="Rotina Completa"
      icon={ClockIcon}
      tone="bg-pastel-routine"
      delay={0.2}
    >
      <div className="flex flex-col gap-6">
        {PERIODS.map((period) => {
          const items = medications
            .filter((med) => med.period === period)
            .sort((a, b) => a.time.localeCompare(b.time))
          const Icon = periodIcon[period]

          return (
            <div key={period} className="flex gap-4">
              <div className="flex flex-col items-center gap-2">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-card text-foreground">
                  <Icon className="size-6" />
                </span>
                {period !== "Noite" && (
                  <span
                    aria-hidden="true"
                    className="w-1 flex-1 rounded-full bg-foreground/15"
                  />
                )}
              </div>
              <div className="flex-1 pb-2">
                <h3 className="text-2xl font-extrabold">{period}</h3>
                {items.length === 0 ? (
                  <p className="mt-2 text-xl text-muted-foreground">
                    Nada marcado para este período.
                  </p>
                ) : (
                  <ul className="mt-3 flex flex-col gap-3">
                    {items.map((med) => (
                      <li
                        key={med.id}
                        className="flex items-center gap-4 rounded-2xl bg-card p-4 text-xl"
                      >
                        <span className="w-20 shrink-0 font-extrabold">
                          {med.time}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-bold">{med.name}</span>
                          <span className="block text-lg text-muted-foreground">
                            {med.dosage}
                          </span>
                        </span>
                        {med.taken && (
                          <span className="flex shrink-0 items-center gap-2 text-lg font-bold text-primary">
                            <CheckCircle2Icon className="size-6" />
                            Tomado
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </BigCard>
  )
}

export function MemoriesCard() {
  const { memories } = useAppState()
  const photos = memories.filter((memory) => memory.type === "photo")

  return (
    <BigCard
      title="Lembranças"
      icon={ImageIcon}
      tone="bg-pastel-memories"
      delay={0.3}
    >
      {photos.length === 0 ? (
        <EmptyLine>
          Nenhuma foto por aqui ainda. Em breve suas lembranças vão aparecer
          nesta página.
        </EmptyLine>
      ) : (
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {photos.map((photo) => (
            <li
              key={photo.id}
              className="overflow-hidden rounded-2xl bg-card pb-4"
            >
              <Image
                src={photo.content || "/placeholder.svg"}
                alt={photo.title}
                width={600}
                height={600}
                className="aspect-square w-full object-cover"
              />
              <p className="px-4 pt-4 text-xl font-bold text-pretty">
                {photo.title}
              </p>
            </li>
          ))}
        </ul>
      )}
    </BigCard>
  )
}
