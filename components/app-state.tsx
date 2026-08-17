"use client";

import * as React from "react";
import type {
  EmergencyContact,
  FamilyMember,
  Medication,
  Memory,
  Mood,
  Screen,
} from "@/lib/types";

const STORAGE_KEY = "neurolinker:state:v1";

type AppData = {
  medications: Medication[];
  memories: Memory[];
  familyMembers: FamilyMember[];
  emergencyContact: EmergencyContact;
  patientMood: Mood;
  isOffline: boolean;
  patientName: string;
  patientAge: number;
  patientBio: string;
  patientPhotoUrl: string;
};

const initialData: AppData = {
  patientName: "Dona Helena",
  patientAge: 78,
  patientBio: "Foi professora de português por mais de 30 anos.",
  patientPhotoUrl: "",
  medications: [
    {
      id: "m1",
      name: "Donepezila",
      dosage: "10 mg — 1 comprimido",
      time: "08:00",
      taken: false,
      period: "Manhã",
    },
    {
      id: "m2",
      name: "Memantina",
      dosage: "10 mg — 1 comprimido",
      time: "13:00",
      taken: false,
      period: "Tarde",
    },
    {
      id: "m3",
      name: "Vitamina D",
      dosage: "8 gotas com água",
      time: "20:00",
      taken: false,
      period: "Noite",
    },
  ],
  memories: [
    {
      id: "f1",
      type: "faq",
      title: "Quem sou eu?",
      content:
        "Você é a Helena, tem 78 anos e mora na sua casa na Rua das Acácias. Foi professora de português por mais de 30 anos.",
      createdAt: Date.now() - 6 * 24 * 60 * 60 * 1000,
    },
    {
      id: "f2",
      type: "faq",
      title: "Onde eu estou?",
      content:
        "Você está em casa, no seu apartamento em Campinas. É um lugar seguro e a Ana passa aqui todos os dias.",
      createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    },
    {
      id: "f3",
      type: "faq",
      title: "Quem é a Ana?",
      content:
        "A Ana é a sua filha mais velha. Ela cuida de você com muito carinho e liga todos os dias à tarde.",
      createdAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
    },
    {
      id: "p1",
      type: "photo",
      title: "Meu casamento com o Carlos",
      content: "/memories/casamento.png",
      createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
    },
    {
      id: "p2",
      type: "photo",
      title: "Férias em Ubatuba",
      content: "/memories/praia.png",
      createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    },
    {
      id: "p3",
      type: "photo",
      title: "A casa da roça",
      content: "/memories/casa.png",
      createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    },
  ],
  familyMembers: [
    { id: "fam1", name: "Ana", relation: "Filha", photoUrl: "/family/ana.png" },
    {
      id: "fam2",
      name: "Carlos",
      relation: "Marido",
      photoUrl: "/family/carlos.png",
    },
    {
      id: "fam3",
      name: "Pedro",
      relation: "Neto",
      photoUrl: "/family/pedro.png",
    },
  ],
  emergencyContact: { name: "Ana (filha)", phone: "(19) 98877-1234" },
  patientMood: "tranquilo",
  isOffline: false,
};

type AppState = AppData & {
  ready: boolean;
  screen: Screen;
  setScreen: (screen: Screen) => void;
  toggleMedication: (id: string, taken: boolean) => void;
  addMedication: (med: Omit<Medication, "id" | "taken">) => void;
  updateMedication: (id: string, patch: Partial<Medication>) => void;
  removeMedication: (id: string) => void;
  addMemory: (memory: Omit<Memory, "id">) => void;
  updateMemory: (id: string, patch: Partial<Memory>) => void;
  removeMemory: (id: string) => void;
  addFamilyMember: (member: Omit<FamilyMember, "id">) => void;
  updateFamilyMember: (id: string, patch: Partial<FamilyMember>) => void;
  removeFamilyMember: (id: string) => void;
  setEmergencyContact: (contact: EmergencyContact) => void;
  setPatientMood: (mood: Mood) => void;
  setIsOffline: (offline: boolean) => void;
  setPatientProfile: (
    patch: Partial<
      Pick<
        AppData,
        "patientName" | "patientAge" | "patientBio" | "patientPhotoUrl"
      >
    >,
  ) => void;
  resetData: () => void;
};

const AppStateContext = React.createContext<AppState | null>(null);

const uid = () => Math.random().toString(36).slice(2, 10);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = React.useState<AppData>(initialData);
  const [screen, setScreen] = React.useState<Screen>("login");
  const [ready, setReady] = React.useState(false);

  // Carrega do localStorage no cliente.
  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<AppData>;
        setData({ ...initialData, ...parsed });
      }
    } catch (error) {
      console.log("[v0] Falha ao ler estado salvo:", error);
    }
    setReady(true);
  }, []);

  // Persiste em cada alteração.
  React.useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.log("[v0] Falha ao salvar estado:", error);
    }
  }, [data, ready]);

  const value = React.useMemo<AppState>(() => {
    const patch = (updater: (current: AppData) => AppData) => setData(updater);

    return {
      ...data,
      ready,
      screen,
      setScreen,
      toggleMedication: (id, taken) =>
        patch((c) => ({
          ...c,
          medications: c.medications.map((m) =>
            m.id === id ? { ...m, taken } : m,
          ),
        })),
      addMedication: (med) =>
        patch((c) => ({
          ...c,
          medications: [...c.medications, { ...med, id: uid(), taken: false }],
        })),
      updateMedication: (id, p) =>
        patch((c) => ({
          ...c,
          medications: c.medications.map((m) =>
            m.id === id ? { ...m, ...p } : m,
          ),
        })),
      removeMedication: (id) =>
        patch((c) => ({
          ...c,
          medications: c.medications.filter((m) => m.id !== id),
        })),
      addMemory: (memory) =>
        patch((c) => ({
          ...c,
          memories: [...c.memories, { ...memory, id: uid() }],
        })),
      updateMemory: (id, p) =>
        patch((c) => ({
          ...c,
          memories: c.memories.map((m) => (m.id === id ? { ...m, ...p } : m)),
        })),
      removeMemory: (id) =>
        patch((c) => ({
          ...c,
          memories: c.memories.filter((m) => m.id !== id),
        })),
      addFamilyMember: (member) =>
        patch((c) => ({
          ...c,
          familyMembers: [...c.familyMembers, { ...member, id: uid() }],
        })),
      updateFamilyMember: (id, p) =>
        patch((c) => ({
          ...c,
          familyMembers: c.familyMembers.map((m) =>
            m.id === id ? { ...m, ...p } : m,
          ),
        })),
      removeFamilyMember: (id) =>
        patch((c) => ({
          ...c,
          familyMembers: c.familyMembers.filter((m) => m.id !== id),
        })),
      setEmergencyContact: (contact) =>
        patch((c) => ({ ...c, emergencyContact: contact })),
      setPatientMood: (mood) => patch((c) => ({ ...c, patientMood: mood })),
      setIsOffline: (offline) => patch((c) => ({ ...c, isOffline: offline })),
      setPatientProfile: (p) => patch((c) => ({ ...c, ...p })),
      resetData: () => setData(initialData),
    };
  }, [data, ready, screen]);

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = React.useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState precisa estar dentro de <AppStateProvider>");
  }
  return context;
}
