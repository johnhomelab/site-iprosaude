import type { CollectionConfig } from 'payload';
import { Hero } from '../blocks/Hero';
import { Content } from '../blocks/Content';
import { Features } from '../blocks/Features';
import { BeforeAfter } from '../blocks/BeforeAfter';
import { Form } from '../blocks/Form';
import { CallToAction } from '../blocks/CallToAction';
import { TreatmentList } from '../blocks/TreatmentList';

export const LandingPages: CollectionConfig = {
  slug: 'landing-pages',
  admin: {
    useAsTitle: 'title',
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
        Content,
        Features,
        Form,
        CallToAction,
        TreatmentList,
        BeforeAfter,
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
