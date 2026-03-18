'use client'

import React from 'react'


const WEBHOOK_SUBMIT =
  'https://workflow.efeso1.com.br/webhook/cadastro_pacientes'

const WEBHOOK_VALIDATE_CPF =
  'https://workflow.efeso1.com.br/webhook/validacpf'

function onlyDigits(value: string) {
  return value.replace(/\D/g, '')
}

function formatPhone(value: string) {
  const digits = onlyDigits(value).slice(0, 11)

  if (digits.length <= 2) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function formatCPF(value: string) {
  const digits = onlyDigits(value).slice(0, 11)

  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`
  if (digits.length <= 9) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
  }

  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
}

function formatBirthDate(value: string) {
  const digits = onlyDigits(value).slice(0, 8)

  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

function toIsoDate(brDate: string) {
  const digits = onlyDigits(brDate)
  if (digits.length !== 8) return ''

  const day = digits.slice(0, 2)
  const month = digits.slice(2, 4)
  const year = digits.slice(4, 8)

  return `${year}-${month}-${day}`
}

function toSubmitDate(brDate: string) {
  const digits = onlyDigits(brDate)
  if (digits.length !== 8) return ''

  const day = digits.slice(0, 2)
  const month = digits.slice(2, 4)
  const year = digits.slice(4, 8)

  return `${day}-${month}-${year}`
}

function isValidDate(brDate: string) {
  const iso = toIsoDate(brDate)
  if (!iso) return false

  const [year, month, day] = iso.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  )
}

function getDeviceInfo() {
  const ua = navigator.userAgent

  let browser = 'Desconhecido'
  let os = 'Desconhecido'
  let device = 'Desktop/Outro'

  if (/CriOS/i.test(ua)) browser = 'Chrome (iOS)'
  else if (/Edg/i.test(ua)) browser = 'Edge'
  else if (/OPR|Opera/i.test(ua)) browser = 'Opera'
  else if (/Chrome/i.test(ua)) browser = 'Chrome'
  else if (/Firefox/i.test(ua)) browser = 'Firefox'
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari'
  else if (/MSIE|Trident/i.test(ua)) browser = 'IE'

  if (/Windows/i.test(ua)) os = 'Windows'
  else if (/Android/i.test(ua)) os = 'Android'
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS'
  else if (/Macintosh|Mac OS X/i.test(ua)) os = 'macOS'
  else if (/Linux/i.test(ua)) os = 'Linux'

  if (/iPhone/i.test(ua)) device = 'iPhone'
  else if (/iPad/i.test(ua)) device = 'iPad'
  else if (/Android/i.test(ua)) {
    const androidMatch =
      ua.match(/Android.*?;\s*([^;]*?)\s*Build/i) ||
      ua.match(/Android.*?;\s*([^;]*?)\s*\)/i)

    device = androidMatch?.[1]?.trim() || 'Android Phone/Tablet'
  } else if (/Mobi/i.test(ua)) {
    device = 'Dispositivo Móvel Genérico'
  }

  return { browser, os, device }
}

export default function CadastroDePacientePageClient() {
  const [screen, setScreen] = React.useState<1 | 2 | 3>(1)
  const [submitting, setSubmitting] = React.useState(false)

  const [form, setForm] = React.useState({
    nome_completo: '',
    data_nascimento: '',
    cpf: '',
    telefone: '',
    email: '',
    motivo_consulta: '',
  })

  const [cpfError, setCpfError] = React.useState('')
  const [formError, setFormError] = React.useState('')

  function updateField(field: keyof typeof form, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setCpfError('')
    setFormError('')

    if (!form.nome_completo.trim()) {
      setFormError('Preencha o nome completo.')
      return
    }

    if (!isValidDate(form.data_nascimento)) {
      setFormError('Informe uma data de nascimento válida.')
      return
    }

    if (onlyDigits(form.cpf).length !== 11) {
      setCpfError('CPF inválido. Por favor, digite um CPF válido.')
      return
    }

    if (onlyDigits(form.telefone).length < 10) {
      setFormError('Informe um número de contato válido.')
      return
    }

    setSubmitting(true)

    try {
      const validateResponse = await fetch(WEBHOOK_VALIDATE_CPF, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cpf: onlyDigits(form.cpf),
        }),
      })

      let valido = false

      try {
        const json = await validateResponse.json()
        valido = json?.valido ?? json?.data?.valido ?? false
      } catch {
        valido = false
      }

if (!valido) {
        setCpfError('CPF inválido. Por favor, digite um CPF válido.')
        setSubmitting(false)
        return
      }

      const deviceInfo = getDeviceInfo()

      const payload = {
        nome_completo: form.nome_completo.trim(),
        data_nascimento: toSubmitDate(form.data_nascimento),
        cpf: onlyDigits(form.cpf),
        telefone: onlyDigits(form.telefone),
        email: form.email.trim(),
        motivo_consulta: form.motivo_consulta.trim(),
        rastreamento_browser: deviceInfo.browser,
        rastreamento_os: deviceInfo.os,
        rastreamento_dispositivo: deviceInfo.device,
        rastreamento_userAgent: navigator.userAgent,
      }

      const submitResponse = await fetch(WEBHOOK_SUBMIT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!submitResponse.ok) {
        throw new Error('Falha ao enviar cadastro.')
      }

      setScreen(3)
    } catch (error) {
      setFormError('Não foi possível enviar seus dados agora. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#1a1a1a] px-5 py-10 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-slate-50 px-6 py-5 text-center border-b border-slate-200">
          <h2 className="text-[#B8860B] text-2xl font-bold">IPRO-Saúde</h2>
          <p className="text-slate-500 text-sm">
            Instituto de Prevenção e Reabilitação Oral
          </p>
        </div>

        {screen === 1 && (
          <section className="p-8 animate-[fadeIn_.5s_ease]">
            <h3 className="text-xl font-bold text-slate-800 text-center mb-4">
              Termos de Uso
            </h3>

            <div className="text-slate-700 leading-7 text-justify bg-slate-100 p-4 rounded-lg border-l-4 border-[#B8860B]">
              Ao se cadastrar, você concorda com o tratamento de seus dados
              pessoais para fins de agendamento, atendimento e comunicação.
              Garantimos a proteção e o sigilo de suas informações de acordo com
              nossa Política de Privacidade.
            </div>

            <button
              type="button"
              onClick={() => setScreen(2)}
              className="mt-8 w-full rounded-lg bg-[#B8860B] hover:bg-[#8B6508] text-white font-bold py-3 transition-colors"
            >
              Aceito
            </button>
          </section>
        )}

        {screen === 2 && (
          <section className="p-8 animate-[fadeIn_.5s_ease]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={form.nome_completo}
                  onChange={(e) => updateField('nome_completo', e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full rounded-lg border border-slate-300 px-3 py-3 text-slate-900 focus:outline-none focus:border-[#B8860B] focus:ring-4 focus:ring-[#B8860B]/10"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Data de Nascimento *
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  value={form.data_nascimento}
                  onChange={(e) =>
                    updateField(
                      'data_nascimento',
                      formatBirthDate(e.target.value)
                    )
                  }
                  placeholder="dd/mm/aaaa"
                  className="w-full rounded-lg border border-slate-300 px-3 py-3 text-slate-900 focus:outline-none focus:border-[#B8860B] focus:ring-4 focus:ring-[#B8860B]/10"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  CPF *
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  value={form.cpf}
                  onChange={(e) => {
                    setCpfError('')
                    updateField('cpf', formatCPF(e.target.value))
                  }}
                  placeholder="000.000.000-00"
                  maxLength={14}
                  className={`w-full rounded-lg border px-3 py-3 text-slate-900 focus:outline-none focus:ring-4 ${
                    cpfError
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                      : 'border-slate-300 focus:border-[#B8860B] focus:ring-[#B8860B]/10'
                  }`}
                />
                {cpfError && (
                  <p className="mt-1 text-sm text-red-500">{cpfError}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Número para contato *
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  value={form.telefone}
                  onChange={(e) =>
                    updateField('telefone', formatPhone(e.target.value))
                  }
                  placeholder="(00) 00000-0000"
                  maxLength={15}
                  className="w-full rounded-lg border border-slate-300 px-3 py-3 text-slate-900 focus:outline-none focus:border-[#B8860B] focus:ring-4 focus:ring-[#B8860B]/10"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Email <span className="text-slate-400 font-normal">Opcional</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full rounded-lg border border-slate-300 px-3 py-3 text-slate-900 focus:outline-none focus:border-[#B8860B] focus:ring-4 focus:ring-[#B8860B]/10"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Motivo da consulta{' '}
                  <span className="text-slate-400 font-normal">Opcional</span>
                </label>
                <textarea
                  value={form.motivo_consulta}
                  onChange={(e) =>
                    updateField('motivo_consulta', e.target.value.slice(0, 100))
                  }
                  placeholder="Ex: Avaliação para implante..."
                  rows={4}
                  className="w-full rounded-lg border border-slate-300 px-3 py-3 text-slate-900 resize-none focus:outline-none focus:border-[#B8860B] focus:ring-4 focus:ring-[#B8860B]/10"
                />
                <div className="mt-1 text-right text-xs text-slate-400">
                  {form.motivo_consulta.length}/100
                </div>
              </div>

              {formError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {formError}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-[#B8860B] hover:bg-[#8B6508] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3 transition-colors"
              >
                {submitting ? 'Verificando e enviando...' : 'Confirmar Dados'}
              </button>
            </form>
          </section>
        )}

        {screen === 3 && (
          <section className="p-8 animate-[fadeIn_.5s_ease] text-center">
            <div className="w-20 h-20 rounded-full bg-green-500 text-white flex items-center justify-center text-4xl mx-auto mb-5">
              ✓
            </div>

            <h3 className="text-2xl font-bold text-green-600 mb-2">
              Dados Enviados!
            </h3>

            <p className="text-slate-600">
              Obrigado pelo cadastro.
            </p>

            <p className="text-slate-500 mt-3">
              A equipe da IPRO-Saúde entrará em contato em breve para confirmar
              seu horário.
            </p>

            <button
              type="button"
              onClick={() => {
                setScreen(1)
                setCpfError('')
                setFormError('')
                setForm({
                  nome_completo: '',
                  data_nascimento: '',
                  cpf: '',
                  telefone: '',
                  email: '',
                  motivo_consulta: '',
                })
              }}
              className="mt-8 w-full rounded-lg bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 transition-colors"
            >
              Voltar ao início
            </button>
          </section>
        )}
      </div>
    </main>
  )
}
