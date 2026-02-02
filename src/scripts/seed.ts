import { getPayload } from 'payload';
import config from '../payload.config';

const seed = async () => {
  const payload = await getPayload({ config });

  console.log('Seeding database...');

  const pages = [
    {
      title: 'Urgência Odontológica',
      slug: 'urgencia',
      layout: [
        {
          blockType: 'hero',
          heading: 'Dor de dente não espera.',
          text: 'Já são {{TIME}} e a dor não espera. Atendimento de emergência agora: chegue em 10min do centro.',
        },
        {
          blockType: 'cta',
          label: 'LIGAR AGORA (Plantão 24h)',
          url: 'tel:75991904849',
          style: 'urgent',
        },
        {
          blockType: 'features',
          features: [
            {
              title: 'Alívio Imediato',
              description: 'Protocolos avançados para eliminar a dor na primeira consulta.',
            },
            {
              title: 'Plantão 24h',
              description: 'Equipe pronta para atender sua emergência a qualquer hora.',
            },
            {
              title: 'Localização Central',
              description: 'Fácil acesso no centro da cidade.',
            },
          ],
        },
        {
            blockType: 'content',
            columns: [
                {
                    size: 'full',
                    richText: {
                        root: {
                            type: 'root',
                            children: [
                                {
                                    type: 'paragraph',
                                    children: [
                                        {
                                            type: 'text',
                                            text: 'Não deixe para depois. Infecções dentárias podem se espalhar rapidamente. Nossa equipe de plantão está equipada para resolver seu problema agora.'
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            ]
        }
      ],
    },
    {
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
              description: 'Saia com dentes fixos no mesmo dia da cirurgia.',
            },
            {
              title: 'Sem Dor',
              description: 'Técnicas minimamente invasivas e sedação consciente.',
            },
            {
              title: 'Durabilidade',
              description: 'Materiais de titânio e zircônia de altíssima qualidade.',
            },
            {
              title: 'Estética Natural',
              description: 'Dentes que parecem e funcionam como os naturais.',
            },
          ],
        },
        {
          blockType: 'content',
          columns: [
             {
                size: 'full',
                richText: {
                    root: {
                        type: 'root',
                        children: [
                             {
                                type: 'heading',
                                tag: 'h2',
                                children: [{ type: 'text', text: 'Por que escolher implantes?' }]
                            },
                            {
                                type: 'paragraph',
                                children: [
                                    {
                                        type: 'text',
                                        text: 'A perda dentária afeta não apenas a mastigação, mas também a confiança. Nossos especialistas utilizam tecnologia 3D para garantir precisão e um resultado perfeito.'
                                    }
                                ]
                            }
                        ]
                    }
                }
             }
          ]
        },
        {
          blockType: 'cta',
          label: 'Quero Agendar Avaliação',
          url: '#form',
          style: 'default',
        },
        {
          blockType: 'form',
          formId: 'implantes-lead',
        },
      ],
    },
    {
      title: 'Clínica Odontológica',
      slug: 'home',
      layout: [
        {
          blockType: 'hero',
          heading: 'Excelência em Odontologia ao seu Alcance.',
          text: 'Cuidamos do seu sorriso com tecnologia de ponta e atendimento humanizado. Venha nos conhecer.',
        },
        {
          blockType: 'features',
          features: [
            {
              title: 'Multidisciplinar',
              description: 'Todas as especialidades em um só lugar.',
            },
            {
              title: 'Tecnologia',
              description: 'Equipamentos modernos para diagnósticos precisos.',
            },
            {
              title: 'Conforto',
              description: 'Ambiente climatizado e acolhedor para você e sua família.',
            },
          ],
        },
        {
          blockType: 'cta',
          label: 'Conheça Nossos Tratamentos',
          url: '/implantes',
          style: 'default',
        },
      ],
    },
    {
        title: 'Próteses Dentárias',
        slug: 'protese',
        layout: [
            {
                blockType: 'hero',
                heading: 'Volte a Sorrir com Confiança.',
                text: 'Próteses modernas, confortáveis e com aspecto natural. Redescubra o prazer de sorrir.',
            },
            {
                blockType: 'features',
                features: [
                    {
                        title: 'Personalização',
                        description: 'Cada prótese é desenhada para combinar com seu rosto.',
                    },
                    {
                        title: 'Conforto',
                        description: 'Ajuste perfeito para evitar desconfortos e feridas.',
                    },
                    {
                        title: 'Materiais Premium',
                        description: 'Resinas e cerâmicas de alta durabilidade e estética.',
                    }
                ]
            },
            {
                blockType: 'cta',
                label: 'Agende uma Consulta',
                url: '#form',
                style: 'default'
            },
            {
                blockType: 'form',
                formId: 'protese-lead'
            }
        ]
    }
  ];

  for (const pageData of pages) {
    const existingPage = await payload.find({
      collection: 'landing-pages',
      where: {
        slug: {
          equals: pageData.slug,
        },
      },
    });

    if (existingPage.totalDocs > 0) {
      console.log(`Updating /${pageData.slug}...`);
      await payload.update({
        collection: 'landing-pages',
        id: existingPage.docs[0].id,
        data: pageData,
      });
    } else {
      console.log(`Creating /${pageData.slug}...`);
      await payload.create({
        collection: 'landing-pages',
        data: pageData,
      });
    }
  }

  console.log('Seed completed successfully.');
  process.exit(0);
};

seed();
