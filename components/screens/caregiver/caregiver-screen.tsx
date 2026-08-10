"use client"

import * as React from "react"
import { motion } from "motion/react"
import {
  BrainIcon,
  HeartHandshakeIcon,
  ImageIcon,
  LayoutDashboardIcon,
  PillIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"

import { useAppState } from "@/components/app-state"
import { FamilyTab } from "@/components/screens/caregiver/family-tab"
import { MedicationDialog } from "@/components/screens/caregiver/medication-dialog"
import { MedicationsTab } from "@/components/screens/caregiver/medications-tab"
import { MemoriesTab } from "@/components/screens/caregiver/memories-tab"
import { OverviewTab } from "@/components/screens/caregiver/overview-tab"
import { PatientProfileDialog } from "@/components/screens/caregiver/patient-profile-dialog"
import { SettingsTab } from "@/components/screens/caregiver/settings-tab"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const tabs = [
  { value: "overview", label: "Visão Geral", icon: LayoutDashboardIcon },
  { value: "medications", label: "Agenda / Remédios", icon: PillIcon },
  { value: "memories", label: "Memórias", icon: ImageIcon },
  { value: "family", label: "Família", icon: UsersIcon },
  { value: "settings", label: "Configurações", icon: SettingsIcon },
]

export function CaregiverScreen() {
  const { patientName, patientAge, setScreen } = useAppState()
  const [value, setValue] = React.useState("overview")
  const [medicationDialogOpen, setMedicationDialogOpen] = React.useState(false)

  const current = tabs.find((tab) => tab.value === value)

  return (
    <div className="min-h-[calc(100dvh-3rem)] bg-background pb-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
        <header className="flex flex-wrap items-center gap-4">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">
            Cuidador
          </span>
        </header>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-3xl font-extrabold tracking-tight">
              Visão geral de hoje
            </h1>
            <p className="mt-1 truncate text-base text-muted-foreground">
              Paciente: {patientName}, {patientAge} anos
            </p>
          </div>
          <div className="flex items-center gap-2">
            <PatientProfileDialog />
            <Button variant="outline" onClick={() => setScreen("patient")}>
              <HeartHandshakeIcon data-icon="inline-start" />
              Ver Tela do Idoso
            </Button>
          </div>
        </div>

        <Tabs
          value={value}
          onValueChange={(next) => setValue(next as string)}
          className="md:gap-8 md:data-horizontal:flex-row"
        >
          <TabsList
            variant="line"
            className="w-full shrink-0 flex-row overflow-x-auto md:h-fit md:w-56 md:flex-col md:items-stretch"
          >
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="justify-start gap-2 whitespace-nowrap md:w-full"
              >
                <tab.icon />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="min-w-0 flex-1">
            <motion.div
              key={value}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h2 className="mb-4 text-lg font-bold">{current?.label}</h2>
              <TabsContent value="overview">
                <OverviewTab
                  onNewMedication={() => setMedicationDialogOpen(true)}
                />
              </TabsContent>
              <TabsContent value="medications">
                <MedicationsTab />
              </TabsContent>
              <TabsContent value="memories">
                <MemoriesTab />
              </TabsContent>
              <TabsContent value="family">
                <FamilyTab />
              </TabsContent>
              <TabsContent value="settings">
                <SettingsTab />
              </TabsContent>
            </motion.div>
          </div>
        </Tabs>
      </div>

      <MedicationDialog
        open={medicationDialogOpen}
        onOpenChange={setMedicationDialogOpen}
        editing={null}
      />
    </div>
  )
}
