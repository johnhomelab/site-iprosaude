import { getPayload } from 'payload';
import config from '../payload.config';

const seed = async () => {
  const payload = await getPayload({ config });

  console.log('Seeding database...');

  // --- Page 1: /urgencia ---
  const urgenciaData = {
    title: 'Urgência Odontológica',
    slug: 'urgencia',
    layout: [
      {
        blockType: 'hero',
        heading: 'Dor de dente não espera.',
        text: 'Já são {{TIME}}. Chegue em 5min do centro.',
      },
      {
        blockType: 'cta',
        label: 'LIGAR AGORA (Plantão 24h)',
        url: 'tel:75991904849',
      },
      {
        blockType: 'cta',
        label: 'WhatsApp (Plantão 24h)',
        url: 'https://wa.me/5575991897547?text=Preciso%20de%20atendimento%20%20urgente%20por%20favor!',
      },
      {
        blockType: 'features',
        features: [
          {
            title: 'Paciente Satisfeito',
            description: 'Cheguei de madrugada com dor insuportável e fui atendido em 10min.',
          },
          {
            title: 'Ana Souza',
            description: 'A equipe de plantão foi anjos na minha vida. Dor eliminada na hora.',
          },
          {
            title: 'Carlos Pereira',
            description: 'Excelente atendimento de urgência. Profissionais muito atenciosos.',
          },
        ],
      },
    ],
  };

  const existingUrgencia = await payload.find({
    collection: 'landing-pages',
    where: {
      slug: {
        equals: 'urgencia',
      },
    },
  });

  if (existingUrgencia.totalDocs > 0) {
    console.log('Updating /urgencia...');
    await payload.update({
      collection: 'landing-pages',
      id: existingUrgencia.docs[0].id,
      data: urgenciaData,
    });
  } else {
    console.log('Creating /urgencia...');
    await payload.create({
      collection: 'landing-pages',
      data: urgenciaData,
    });
  }

  // --- Page 2: /implantes ---
  const implantesData = {
    title: 'Implantes Dentários',
    slug: 'implantes',
    layout: [
      {
        blockType: 'hero',
        heading: 'Recupere seu sorriso e sua segurança.',
        text: 'Hoje já é dia {{DATE}}. Você vai aguardar mais quanto tempo para transformar sua autoestima e voltar a mastigar sem medo?',
      },
      {
        blockType: 'features',
        features: [
          {
            title: 'Carga Imediata',
            description: 'Implantes com Carga Imediata.',
          },
          {
            title: 'Conforto Total',
            description: 'Sedação Consciente. Sem corte e sem Dor.',
          },
          {
            title: 'Tecnologia 3D',
            description: 'Planejamento digital para máxima precisão.',
          },
          {
            title: 'Rapidez',
            description: 'Dentes fixos no mesmo dia.',
          },
        ],
      },
      {
        blockType: 'form',
        formId: 'Agendar Avaliação Oficial',
      },
    ],
  };

  const existingImplantes = await payload.find({
    collection: 'landing-pages',
    where: {
      slug: {
        equals: 'implantes',
      },
    },
  });

  if (existingImplantes.totalDocs > 0) {
    console.log('Updating /implantes...');
    await payload.update({
      collection: 'landing-pages',
      id: existingImplantes.docs[0].id,
      data: implantesData,
    });
  } else {
    console.log('Creating /implantes...');
    await payload.create({
      collection: 'landing-pages',
      data: implantesData,
    });
  }

  console.log('Seed completed successfully.');
  process.exit(0);
};

seed();
