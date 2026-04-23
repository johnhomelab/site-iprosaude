'use client';

import React, { useState } from 'react';

type FormBlockProps = {
  title?: string | null;
  description?: string | null;
  showButton?: boolean | null;
  buttonText?: string | null;
  webhookUrl?: string | null;
};

type LeadFormState = {
  name: string;
  email: string;
  phone: string;
};

const DEFAULT_TITLE = 'Dê o primeiro passo';
const DEFAULT_DESCRIPTION = 'Preencha os dados abaixo para agendar sua avaliação na IPRO-Saúde.';
const DEFAULT_BUTTON_TEXT = 'Solicitar Atendimento';

export const FormBlock: React.FC<FormBlockProps> = ({
  title,
  description,
  showButton,
  buttonText,
  webhookUrl,
}) => {
  const [formData, setFormData] = useState<LeadFormState>({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const formatPhone = (value: string) => {
    let numbers = value.replace(/\D/g, '');
    if (numbers.length > 11) numbers = numbers.substring(0, 11);
    numbers = numbers.replace(/^(\d{2})(\d)/g, '($1) $2');
    numbers = numbers.replace(/(\d)(\d{4})$/, '$1-$2');
    return numbers;
  };

  const sanitizeText = (value: string) => value.replace(/\s+/g, ' ').trim();

  const sanitizeEmail = (value: string) => sanitizeText(value).toLowerCase();

  const sanitizedWebhookUrl = sanitizeText(webhookUrl || '');
  const shouldShowButton = showButton ?? true;
  const resolvedTitle = sanitizeText(title || '') || DEFAULT_TITLE;
  const resolvedDescription = sanitizeText(description || '') || DEFAULT_DESCRIPTION;
  const resolvedButtonText = sanitizeText(buttonText || '') || DEFAULT_BUTTON_TEXT;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shouldShowButton) {
      return;
    }

    const digits = formData.phone.replace(/\D/g, '');

    if (digits.length < 10) {
      alert('Por favor, insira um telefone válido com DDD.');
      return;
    }

    setStatus('submitting');

    const payload = {
      name: sanitizeText(formData.name),
      phone: digits,
      email: formData.email ? sanitizeEmail(formData.email) : '',
      pageSlug: window.location.pathname,
      source: 'landing-page',
    };

    try {
      const res = await fetch('/cms/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed');

      if (sanitizedWebhookUrl) {
        fetch(sanitizedWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }).catch(() => undefined);
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '' });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section className="py-16 px-4 bg-slate-50 flex justify-center">
        <div className="p-10 bg-white shadow-xl rounded-3xl max-w-md w-full text-center border-t-4 border-green-500">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h3 className="text-3xl font-bold text-slate-900 mb-4">Agendamento Solicitado!</h3>
          <p className="text-slate-600 mb-8 font-light">Nossa recepção recebeu seus dados e entrará em contato via WhatsApp em poucos minutos.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 bg-slate-50 flex justify-center">
      <div className="p-10 bg-white shadow-2xl rounded-3xl max-w-lg w-full border border-slate-100 relative overflow-hidden">
        {/* Detalhe estético no topo do formulário */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-amber-600"></div>
        
        <h3 className="text-3xl font-bold text-slate-900 mb-2 text-center tracking-tight">{resolvedTitle}</h3>
        <p className="text-slate-500 text-center mb-8 font-light">{resolvedDescription}</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Nome Completo</label>
            <input type="text" required className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Telefone / WhatsApp</label>
            <input type="tel" required placeholder="(75) 99999-9999" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none" value={formData.phone} onChange={(e) => { const formatted = formatPhone(e.target.value); setFormData({ ...formData, phone: formatted }); }} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email (Opcional)</label>
            <input type="email" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          </div>

          {status === 'error' && <p className="text-red-500 text-sm font-medium text-center">Ocorreu um erro. Tente nos chamar direto no WhatsApp.</p>}

          {shouldShowButton && (
            <button type="submit" disabled={status === 'submitting'} className="w-full bg-slate-900 hover:bg-slate-800 text-white text-lg font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed">
              {status === 'submitting' ? 'Enviando Dados...' : resolvedButtonText}
            </button>
          )}
        </form>
      </div>
    </section>
  );
};
