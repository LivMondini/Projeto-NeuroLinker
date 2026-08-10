"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  ArrowLeftIcon,
  BookOpenIcon,
  CalendarIcon,
  ImageIcon,
  UsersIcon,
  WifiOffIcon,
} from "lucide-react"

import { useAppState } from "@/components/app-state"
import { MedicationBanner } from "@/components/screens/patient/medication-banner"
import {
  FamilyCard,
  MemoriesCard,
  RoutineCard,
  StoryCard,
} from "@/components/screens/patient/patient-cards"
import { PatientMenuCard } from "@/components/screens/patient/patient-menu-card"
import { SosBar } from "@/components/screens/patient/sos-bar"

type Section = "home" | "story" | "family" | "routine" | "memories"

function todayLabel() {
  const formatted = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date())
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

export function PatientScreen() {
  const { patientName, isOffline } = useAppState()
  const [section, setSection] = React.useState<Section>("home")

  return (
    <div className="patient-scope flex min-h-[calc(100dvh-3rem)] flex-col bg-background">
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 pt-8 pb-32">
        <AnimatePresence mode="wait">
          {section === "home" ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col gap-6"
            >
              <header className="flex flex-col gap-2">
                <p className="text-xl font-semibold text-muted-foreground">
                  {todayLabel()}
                </p>
                <h1 className="text-[2.5rem] leading-tight font-extrabold text-balance">
                  Olá, {patientName}! Como posso te ajudar hoje?
                </h1>
                {isOffline && (
                  <p className="flex items-center gap-2 text-lg font-semibold text-muted-foreground">
                    <WifiOffIcon className="size-5" />
                    Sem internet — mostrando as informações salvas no
                    aparelho.
                  </p>
                )}
              </header>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <PatientMenuCard
                  title="Quem sou eu?"
                  subtitle="Sua história e identidade"
                  icon={BookOpenIcon}
                  tone="bg-pastel-story"
                  iconTone="bg-pastel-story-icon"
                  onClick={() => setSection("story")}
                />
                <PatientMenuCard
                  title="Minha família"
                  subtitle="Rostos e nomes queridos"
                  icon={UsersIcon}
                  tone="bg-pastel-family"
                  iconTone="bg-pastel-family-icon"
                  onClick={() => setSection("family")}
                  delay={0.05}
                />
                <PatientMenuCard
                  title="Minha rotina"
                  subtitle="Atividades do dia"
                  icon={CalendarIcon}
                  tone="bg-pastel-routine"
                  iconTone="bg-pastel-routine-icon"
                  onClick={() => setSection("routine")}
                  delay={0.1}
                />
                <PatientMenuCard
                  title="Ver fotos"
                  subtitle="Álbum de memórias"
                  icon={ImageIcon}
                  tone="bg-pastel-memories"
                  iconTone="bg-pastel-memories-icon"
                  onClick={() => setSection("memories")}
                  delay={0.15}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col gap-6"
            >
              <button
                type="button"
                onClick={() => setSection("home")}
                className="flex w-fit items-center gap-2 rounded-full px-2 py-2 text-xl font-bold text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeftIcon className="size-6" data-icon="inline-start" />
                Voltar
              </button>

              {section === "routine" && <MedicationBanner />}
              {section === "story" && <StoryCard />}
              {section === "family" && <FamilyCard />}
              {section === "routine" && <RoutineCard />}
              {section === "memories" && <MemoriesCard />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <SosBar />
    </div>
  )
}
