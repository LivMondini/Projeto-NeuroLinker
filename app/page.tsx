"use client"

import { AppStateProvider, useAppState } from "@/components/app-state"
import { DevNav } from "@/components/dev-nav"
import { CaregiverScreen } from "@/components/screens/caregiver/caregiver-screen"
import { LoginScreen } from "@/components/screens/login-screen"
import { PatientScreen } from "@/components/screens/patient/patient-screen"

function CurrentScreen() {
  const { screen } = useAppState()

  if (screen === "patient") return <PatientScreen />
  if (screen === "caregiver") return <CaregiverScreen />
  return <LoginScreen />
}

export default function Page() {
  return (
    <AppStateProvider>
      <DevNav />
      <CurrentScreen />
    </AppStateProvider>
  )
}
