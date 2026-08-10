"use client"

import {
  HeartHandshakeIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  LogInIcon,
  WifiOffIcon,
} from "lucide-react"

import { useAppState } from "@/components/app-state"
import { Badge } from "@/components/ui/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import type { Screen } from "@/lib/types"
import { cn } from "@/lib/utils"

const items: { value: Screen; label: string; icon: typeof LogInIcon }[] = [
  { value: "login", label: "Login", icon: LogInIcon },
  { value: "patient", label: "Paciente", icon: HeartHandshakeIcon },
  { value: "caregiver", label: "Cuidador", icon: LayoutDashboardIcon },
]

export function DevNav() {
  const { screen, setScreen, isOffline } = useAppState()

  return (
    <>
      {isOffline && (
        <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
          <Badge variant="secondary" className="gap-1 shadow-md">
            <WifiOffIcon />
            Modo offline
          </Badge>
        </div>
      )}

      <nav
        aria-label="Navegação principal"
        className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-border bg-card/95 p-1.5 shadow-lg backdrop-blur"
      >
        {items.map((item) => {
          const isActive = screen === item.value
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => setScreen(item.value)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </button>
          )
        })}
      </nav>

      <Popover>
        <PopoverTrigger
          aria-label="Ajuda"
          className="fixed right-5 bottom-5 z-50 flex size-11 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-colors hover:bg-foreground/90"
        >
          <HelpCircleIcon className="size-5" />
        </PopoverTrigger>
        <PopoverContent align="end" side="top" className="w-72">
          <h3 className="text-sm font-semibold">Como navegar</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Use a barra inferior para alternar entre a tela de{" "}
            <strong className="text-foreground">Login</strong>, a{" "}
            <strong className="text-foreground">Tela do Paciente</strong> (uso
            do idoso) e a{" "}
            <strong className="text-foreground">Tela do Cuidador</strong>{" "}
            (gestão da família).
          </p>
        </PopoverContent>
      </Popover>
    </>
  )
}
