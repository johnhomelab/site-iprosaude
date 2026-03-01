import type { CollectionConfig } from 'payload';
import { Hero } from '../blocks/Hero';
import { Content } from '../blocks/Content';
import { Features } from '../blocks/Features';
import { BeforeAfter } from '../blocks/BeforeAfter';
import { Form } from '../blocks/Form';
import { CallToAction } from '../blocks/CallToAction';
import { TreatmentList } from '../blocks/TreatmentList';
import { HeroGold } from '../blocks/HeroGold';
import { Testimonials } from '../blocks/Testimonials';
import { Faq } from '../blocks/Faq';
import { Team } from '../blocks/Team';
import { Location } from '../blocks/Location';
import { Authority } from '../blocks/Authority';

export const LandingPages: CollectionConfig = {
  slug: 'landing-pages',
  access: {
  read: () => true,
  },
  admin: {
    useAsTitle: 'title',
// 👇 ADICIONE AQUI O BLOCO DE LIVE PREVIEW 👇
    livePreview: {
      url: ({ data }) => {
        // Se a página for a principal (slug 'home'), carrega a raiz '/'. 
        // Se for outra, carrega '/slug-da-pagina'
        const path = data?.slug === 'home' ? '' : `${data?.slug}`;
        
        // Aponta para o seu servidor local onde o Next.js está rodando
        return `http://localhost:3000/${path}`;
      },
    },
    // 👆 FIM DO BLOCO DE LIVE PREVIEW 👆
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'showFloatingButton',
      type: 'checkbox',
      label: 'Show Floating WhatsApp Button',
      admin: {
        position: 'sidebar',
      },
      defaultValue: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: [
        Hero,
        HeroGold,
        Content,
        Features,
        Testimonials,
        Form,
        CallToAction,
        TreatmentList,
        BeforeAfter,
		Faq, // <--- ADICIONAR AQUI
        Team, // <--- ADICIONAR AQUI
        Location, // <--- ADICIONAR AQUI
		Authority,
      ],
    },
    {
      name: 'meta',
      label: 'SEO & Metadata',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Meta Title',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Meta Description',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'OG Image',
        },
      ],
    },
  ],
};
