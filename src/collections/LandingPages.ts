import type { CollectionConfig } from 'payload';
import { Hero } from '../blocks/Hero';
import { Content } from '../blocks/Content';
import { FormLeadBlock } from '../blocks/FormLeadBlock'
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

  admin: {
    useAsTitle: 'title',

    // Botão "Preview" do admin (para de chamar /cms/api/.../preview)
    preview: (doc) => {
      const slug = (doc as any)?.slug || '';
      const base = process.env.NEXT_PUBLIC_APP_URL || 'http://127.0.0.1:3010';
      return `${base}/api/preview?redirect=/${slug}`;
    },

    // Live Preview URL base
    livePreview: {
      url: ({ data }) => {
        const slug = (data as any)?.slug || '';
        const base = process.env.NEXT_PUBLIC_APP_URL || 'http://127.0.0.1:3010';
        return `${base}/api/preview?redirect=/${slug}`;
      },
    },
  },

  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'showFloatingButton',
      type: 'checkbox',
      label: 'Show Floating WhatsApp Button',
      admin: { position: 'sidebar' },
      defaultValue: true,
    },
    {
      name: 'showHeader',
      type: 'checkbox',
      label: 'Show Header',
      admin: { position: 'sidebar' },
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
        FormLeadBlock,
        TreatmentList,
        BeforeAfter,
        Faq,
        Team,
        Location,
        Authority,
      ],
    },
    {
      name: 'meta',
      label: 'SEO & Metadata',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', label: 'Meta Title' },
        { name: 'description', type: 'textarea', label: 'Meta Description' },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'OG Image' },
      ],
    },
  ],
};
