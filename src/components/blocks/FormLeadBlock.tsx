'use client'

import React from 'react'

export const FormLeadBlock = ({ title, description, buttonText }: any) => {
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      whatsapp: formData.get('whatsapp'),
      isUrgent: formData.get('urgent') === 'on',
      message: formData.get('message'),
    }

    const res = await fetch('/cms/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    setLoading(false)

    if (res.ok) {
      setSuccess(true)
      e.currentTarget.reset()
    } else {
      alert('Erro ao enviar. Tente novamente.')
    }
  }

  if (success) {
    return (
      <section className="py-16 text-center">
        <h3 className="text-2xl font-bold text-green-500">
          Recebemos seus dados!
        </h3>
        <p className="text-slate-400 mt-2">
          Nossa equipe entrará em contato em breve.
        </p>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="max-w-xl mx-auto bg-slate-900 border border-white/10 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <p className="text-slate-400 mb-6">{description}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Seu nome" required className="w-full p-3 rounded bg-slate-800 text-white" />
          <input name="phone" placeholder="Telefone" required className="w-full p-3 rounded bg-slate-800 text-white" />
          <input name="whatsapp" placeholder="WhatsApp (opcional)" className="w-full p-3 rounded bg-slate-800 text-white" />

          <label className="flex items-center gap-2 text-slate-300">
            <input type="checkbox" name="urgent" />
            É urgência
          </label>

          <textarea name="message" placeholder="Mensagem (opcional)" className="w-full p-3 rounded bg-slate-800 text-white" />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 rounded"
          >
            {loading ? 'Enviando...' : buttonText}
          </button>
        </form>
      </div>
    </section>
  )
}
