import type { Block } from 'payload';

export const Location: Block = {
  slug: 'location',
  labels: {
    singular: 'Localização',
    plural: 'Localizações',
  },
  fields: [
    { name: 'titulo', type: 'text', defaultValue: 'Onde Estamos' },
    { name: 'endereco', type: 'textarea', label: 'Endereço Completo' },
    { name: 'horario', type: 'text', label: 'Horário de Funcionamento (Ex: Plantão 24h)' },
    { 
      name: 'mapUrl', 
      type: 'text', 
      label: 'Link do Google Maps (Embed URL)' 
    },
  ],
};