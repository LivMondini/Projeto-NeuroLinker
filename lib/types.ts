export type Period = "Manhã" | "Tarde" | "Noite"

export const PERIODS: Period[] = ["Manhã", "Tarde", "Noite"]

export type Medication = {
  id: string
  name: string
  dosage: string
  time: string
  taken: boolean
  period: Period
}

export type MemoryType = "faq" | "photo"

export type Memory = {
  id: string
  type: MemoryType
  title: string
  /** Para "faq" é o texto da resposta. Para "photo" é a URL da imagem. */
  content: string
  createdAt?: number
}

export type FamilyMember = {
  id: string
  name: string
  relation: string
  photoUrl: string
}

export type EmergencyContact = {
  name: string
  phone: string
}

export type Mood = "tranquilo" | "confuso" | "agitado" | "triste" | "alegre"

export const MOODS: { value: Mood; label: string; emojiless: string }[] = [
  { value: "tranquilo", label: "Tranquilo", emojiless: "Calmo e orientado" },
  { value: "alegre", label: "Alegre", emojiless: "Animado e comunicativo" },
  { value: "confuso", label: "Confuso", emojiless: "Desorientado no tempo" },
  { value: "agitado", label: "Agitado", emojiless: "Inquieto ou ansioso" },
  { value: "triste", label: "Triste", emojiless: "Apático ou retraído" },
]

export type Screen = "login" | "patient" | "caregiver"
