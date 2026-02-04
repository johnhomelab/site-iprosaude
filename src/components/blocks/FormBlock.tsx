'use client';

import React, { useState } from 'react';

export const FormBlock: React.FC<any> = (props) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const formatPhone = (value: string) => {
    // Remove all non-digits
    let numbers = value.replace(/\D/g, '');

    // Limit to 11 digits
    if (numbers.length > 11) numbers = numbers.substring(0, 11);

    // Apply mask
    numbers = numbers.replace(/^(\d{2})(\d)/g, '($1) $2');
    numbers = numbers.replace(/(\d)(\d{4})$/, '$1-$2');

    return numbers;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData({ ...formData, phone: formatted });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate Phone Length
    const digits = formData.phone.replace(/\D/g, '');
    if (digits.length < 10) {
        alert('Por favor, insira um telefone válido com DDD.');
        return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, formId: props.formId, pageSlug: window.location.pathname }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setFormData({ name: '', email: '', phone: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="form-block p-8 bg-green-50 shadow-md rounded-lg max-w-md mx-auto my-8 text-center">
        <h3 className="text-2xl font-bold text-green-700 mb-4">Obrigado!</h3>
        <p className="text-green-800">Recebemos seu contato. Em breve falaremos com você.</p>
        <button onClick={() => setStatus('idle')} className="mt-4 text-green-600 underline">Enviar outro</button>
      </div>
    );
  }

  return (
    <div className="form-block p-8 bg-white shadow-md rounded-lg max-w-md mx-auto my-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Agende sua Avaliação</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp</label>
          <input
            type="tel"
            required
            placeholder="(11) 99999-9999"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.phone}
            onChange={handlePhoneChange}
          />
        </div>

        {status === 'error' && (
          <p className="text-red-600 text-sm">Ocorreu um erro. Tente novamente.</p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors disabled:opacity-50"
        >
          {status === 'submitting' ? 'Enviando...' : 'Solicitar Atendimento'}
        </button>
      </form>
    </div>
  );
};
