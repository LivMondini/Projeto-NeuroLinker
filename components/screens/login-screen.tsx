"use client"

import * as React from "react"
import { motion } from "motion/react"
import {
  BrainIcon,
  CalendarCheckIcon,
  EyeIcon,
  EyeOffIcon,
  HeartHandshakeIcon,
  LayoutDashboardIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react"

import { useAppState } from "@/components/app-state"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import type { Screen } from "@/lib/types"
import { cn } from "@/lib/utils"

const perks = [
  { icon: BrainIcon, label: "Perfil de identidade personalizado" },
  { icon: UsersIcon, label: "Conexão com toda a família" },
  { icon: CalendarCheckIcon, label: "Rotina simplificada dia a dia" },
]

type Role = "patient" | "caregiver"

export function LoginScreen() {
  const { setScreen, setPatientProfile } = useAppState()
  const [role, setRole] = React.useState<Role>("patient")
  const [mode, setMode] = React.useState<"login" | "signup">("login")

  const [nome, setNome] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [senha, setSenha] = React.useState("")
  const [mostrarSenha, setMostrarSenha] = React.useState(false)
  const [erro, setErro] = React.useState<string | null>(null)

  function goToRoleScreen() {
    const destination: Screen = role === "patient" ? "patient" : "caregiver"
    setScreen(destination)
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    if (mode === "signup") {
      if (!nome || !email || !senha) {
        setErro("Preencha nome, e-mail e senha para criar sua conta.")
        return
      }
      setErro(null)
      if (role === "patient") {
        setPatientProfile({ patientName: nome })
      }
      goToRoleScreen()
      return
    }

    if (!email || !senha) {
      setErro("Preencha o e-mail e a senha para continuar.")
      return
    }
    setErro(null)
    goToRoleScreen()
  }

  return (
    <main className="flex min-h-dvh flex-col lg:flex-row">
      {/* Painel esquerdo — apresentação */}
      <div
        className="relative hidden flex-col justify-between overflow-hidden p-10 text-primary-foreground lg:flex lg:w-1/2"
        style={{
          background:
            "linear-gradient(160deg, var(--gradient-login-from), var(--gradient-login-to))",
        }}
      >
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary-foreground/15">
            <BrainIcon className="size-5" />
          </span>
          <span className="text-lg font-bold">NeuroLinker</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-md"
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-balance">
            Memórias infinitas, conexões reais.
          </h1>
          <p className="mt-4 text-lg text-pretty text-primary-foreground/80">
            Apoiando memórias e simplificando o cuidado no Alzheimer.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {perks.map((perk) => (
            <div
              key={perk.label}
              className="flex items-center gap-3 rounded-2xl bg-primary-foreground/10 px-4 py-3.5"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/15">
                <perk.icon className="size-5" />
              </span>
              <span className="text-base font-medium">{perk.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Painel direito — formulário */}
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="mb-6 flex items-center gap-2.5 lg:hidden">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <BrainIcon className="size-5" />
            </span>
            <span className="text-xl font-bold">NeuroLinker</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight">
            {mode === "login" ? "Bem-vindo de volta" : "Criar sua conta"}
          </h2>
          <p className="mt-1 text-base text-muted-foreground">
            {mode === "login"
              ? "Entre na sua conta"
              : "Leva menos de um minuto"}
          </p>

          {/* Toggle Idoso / Cuidador */}
          <div className="mt-6 grid grid-cols-2 gap-1 rounded-full border border-border bg-muted p-1">
            <button
              type="button"
              onClick={() => setRole("patient")}
              className={cn(
                "flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition-colors",
                role === "patient"
                  ? "bg-card text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <HeartHandshakeIcon className="size-4" />
              Sou Idoso
            </button>
            <button
              type="button"
              onClick={() => setRole("caregiver")}
              className={cn(
                "flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition-colors",
                role === "caregiver"
                  ? "bg-card text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <LayoutDashboardIcon className="size-4" />
              Sou Cuidador
            </button>
          </div>

          <Button
            variant="outline"
            size="lg"
            type="button"
            className="mt-5 h-13 w-full rounded-full text-base"
            onClick={goToRoleScreen}
          >
            <GoogleIcon />
            Entrar com o Google
          </Button>

          <div className="my-5 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs font-medium text-muted-foreground uppercase">
              ou
            </span>
            <Separator className="flex-1" />
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <FieldGroup className="gap-4">
              {erro ? (
                <div
                  role="alert"
                  className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
                >
                  {erro}
                </div>
              ) : null}

              {mode === "signup" ? (
                <Field>
                  <FieldLabel htmlFor="nome" className="text-sm font-semibold">
                    Nome completo
                  </FieldLabel>
                  <div className="relative">
                    <UserIcon className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="nome"
                      autoComplete="name"
                      placeholder="Seu nome"
                      value={nome}
                      onChange={(event) => setNome(event.target.value)}
                      className="h-13 rounded-full pl-11 text-base"
                    />
                  </div>
                </Field>
              ) : null}

              <Field>
                <FieldLabel htmlFor="email" className="text-sm font-semibold">
                  E-mail
                </FieldLabel>
                <div className="relative">
                  <MailIcon className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="nome@email.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-13 rounded-full pl-11 text-base"
                  />
                </div>
              </Field>

              <Field>
                <FieldLabel htmlFor="senha" className="text-sm font-semibold">
                  Senha
                </FieldLabel>
                <div className="relative">
                  <LockIcon className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="senha"
                    type={mostrarSenha ? "text" : "password"}
                    autoComplete={
                      mode === "signup" ? "new-password" : "current-password"
                    }
                    placeholder="••••••••"
                    value={senha}
                    onChange={(event) => setSenha(event.target.value)}
                    className="h-13 rounded-full pl-11 pr-12 text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarSenha((v) => !v)}
                    aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                    aria-pressed={mostrarSenha}
                    className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {mostrarSenha ? (
                      <EyeOffIcon className="size-4.5" />
                    ) : (
                      <EyeIcon className="size-4.5" />
                    )}
                  </button>
                </div>
              </Field>

              <Button
                type="submit"
                size="lg"
                className="h-13 w-full rounded-full text-base font-semibold"
              >
                {mode === "login" ? "Entrar" : "Criar conta e entrar"}
              </Button>
            </FieldGroup>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "login" ? (
              <>
                Ainda não tem conta?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setErro(null)
                    setMode("signup")
                  }}
                  className="font-semibold text-primary underline underline-offset-4"
                >
                  Criar conta
                </button>
              </>
            ) : (
              <>
                Já tem uma conta?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setErro(null)
                    setMode("login")
                  }}
                  className="font-semibold text-primary underline underline-offset-4"
                >
                  Entrar
                </button>
              </>
            )}
          </p>
        </motion.div>
      </div>
    </main>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4.5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v2.98h3.86c2.26-2.09 3.56-5.17 3.56-8.8z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.92l-3.86-2.98c-1.07.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.28v3.09C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.28A11.96 11.96 0 0 0 0 12c0 1.93.46 3.76 1.28 5.38l3.99-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.94 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.28 6.62l3.99 3.09C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  )
}
