"use client"

import * as React from "react"
import { RotateCcwIcon, WifiOffIcon } from "lucide-react"

import { useAppState } from "@/components/app-state"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

export function SettingsTab() {
  const {
    emergencyContact,
    setEmergencyContact,
    isOffline,
    setIsOffline,
    resetData,
  } = useAppState()

  const [name, setName] = React.useState(emergencyContact.name)
  const [phone, setPhone] = React.useState(emergencyContact.phone)

  const dirty =
    name !== emergencyContact.name || phone !== emergencyContact.phone

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Contato de emergência</CardTitle>
          <CardDescription>
            É esta pessoa que o botão SOS aciona na Tela do Idoso.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="contact-name">Nome</FieldLabel>
              <Input
                id="contact-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ex.: Ana (filha)"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="contact-phone">Telefone</FieldLabel>
              <Input
                id="contact-phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="(19) 98877-1234"
              />
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Button
            disabled={!dirty}
            onClick={() => setEmergencyContact({ name, phone })}
          >
            Salvar contato
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Funcionamento</CardTitle>
          <CardDescription>
            Ajustes de conectividade e dados do protótipo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle className="flex items-center gap-2">
                  <WifiOffIcon className="size-4" />
                  Modo offline
                </FieldTitle>
                <FieldDescription>
                  Simula o uso sem internet: a Tela do Idoso avisa que está
                  mostrando dados salvos no aparelho.
                </FieldDescription>
              </FieldContent>
              <Switch
                checked={isOffline}
                onCheckedChange={setIsOffline}
                aria-label="Ativar modo offline"
              />
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={resetData}>
            <RotateCcwIcon data-icon="inline-start" />
            Restaurar dados de exemplo
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
