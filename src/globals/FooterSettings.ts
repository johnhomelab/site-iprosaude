import type { GlobalConfig } from 'payload';

export const FooterSettings: GlobalConfig = {
  slug: 'footer-settings',
  label: '🏥Configurações da Clínica', // Nome que vai aparecer no menu do painel
  access: {
    read: () => true, // Permite que o site leia essas informações
  },
  fields: [
    {
      type: 'row', // Organiza os campos lado a lado no painel
      fields: [
        { name: 'clinicName', type: 'text', label: 'Nome da Clínica', defaultValue: 'Clínica Odontológica IPRO-Saúde', required: true, admin: { width: '50%' } },
        { name: 'responsible', type: 'text', label: 'Responsável Técnico', defaultValue: 'Dr. John', required: true, admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'cro', type: 'text', label: 'CRO-BA', required: true, admin: { width: '33%' } },
        { name: 'cnpj', type: 'text', label: 'CNPJ', required: true, admin: { width: '33%' } },
        { name: 'specialty', type: 'text', label: 'Especialidades', defaultValue: 'Implantes e Prótese', admin: { width: '33%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text', label: 'WhatsApp (Apenas Números. Ex: 5575991904849)', defaultValue: '5575991904849', required: true, admin: { width: '50%' } },
        { name: 'phoneFormatted', type: 'text', label: 'WhatsApp Formatado (Ex: (75) 99190-4849)', defaultValue: '(75) 99190-4849', required: true, admin: { width: '50%' } },
      ],
    },
    {
      name: 'address',
      type: 'text',
      label: 'Endereço Completo (Ex: Feira de Santana - BA)',
      defaultValue: 'Feira de Santana - BA',
      required: true,
    },
    {
      name: 'mapsQuery',
      type: 'text',
      label: 'Busca do Google Maps (Troque espaços por +. Ex: Clínica+IPRO-Saúde,Feira+de+Santana-BA)',
      defaultValue: 'Clínica+IPRO-Saúde,Feira+de+Santana-BA',
    },
    {
      type: 'row',
      fields: [
        { name: 'instagramUrl', type: 'text', label: 'Link do Instagram', defaultValue: 'https://instagram.com/iprosaude', admin: { width: '50%' } },
        { name: 'siteUrl', type: 'text', label: 'URL do Site Oficial', defaultValue: 'https://iprosaude.com.br', admin: { width: '50%' } },
      ],
    },
  ],
};
