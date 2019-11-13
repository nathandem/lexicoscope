// JSON avec une clés par langue, contenant les collections dispos dans cette langue (inclure les détails)
// => name, yearMin, yearMax, thumbnail, category, description, tokenSize

const dummyThumbnail = 'https://dummyimage.com/100x100/#808080/aaa';

export const CollectionsFixture = {
  fr: [
    {
      name: 'Phraseorom',
      yearMin: 1960,
      yearMax: 2005,
      thumbnail: dummyThumbnail,
      category: 'Romans',
      description: 'La meilleure collection qui soit !',
      alignedLanguages: {
        asSource:["en", "de", "fr"],
        asTarget:["en", "de", "fr"],
      },
      tokenSize: 1000000,
    },
    {
      name: 'Scientext',
      yearMin: 1970,
      yearMax: 1980,
      thumbnail: dummyThumbnail,
      category: 'Articles scientifiques',
      description: 'Une large collection de textes scientifiques.',
      alignedLanguages: {
        asSource:["en", "fr"],
        asTarget:["en", "fr"],
      },
      tokenSize: 50000,
    },
    {
      name: 'Emolex',
      yearMin: 1990,
      yearMax: 2000,
      thumbnail: dummyThumbnail,
      category: 'Presse quotidienne',
      description: 'Emolex est Emolex.',
      alignedLanguages: {
        asSource:["de", "fr"],
        asTarget:["de", "fr"],
      },
      tokenSize: 500000,
    },
  ],
  en: [
    {
      name: 'Phraseorom',
      yearMin: 1960,
      yearMax: 2005,
      thumbnail: dummyThumbnail,
      category: 'Novel',
      description: 'The best collection out there!',
      alignedLanguages: {
        asSource:["en", "de", "fr"],
        asTarget:["en", "de", "fr"],
      },
      tokenSize: 1000000,
    },
    {
      name: 'Scientext',
      yearMin: 1970,
      yearMax: 1980,
      thumbnail: dummyThumbnail,
      category: 'Scientific articles',
      description: 'A wide-ranging scientific collection.',
      alignedLanguages: {
        asSource:["en", "fr"],
        asTarget:["en", "fr"],
      },
      tokenSize: 50000,
    },
  ],
  de: [
    {
      name: 'Phraseorom',
      yearMin: 1960,
      yearMax: 2005,
      thumbnail: dummyThumbnail,
      category: 'xxxxx',
      description: 'Die beste Sammlung da draußen!',
      alignedLanguages: {
        asSource:["en", "de", "fr"],
        asTarget:["en", "de", "fr"],
      },
      tokenSize: 1000000,
    },
    {
      name: 'Emolex',
      yearMin: 1990,
      yearMax: 2000,
      thumbnail: dummyThumbnail,
      category: 'xxxxx',
      description: 'Emolex ist Emolex.',
      alignedLanguages: {
        asSource:["de", "fr"],
        asTarget:["de", "fr"],
      },
      tokenSize: 500000,
    },
  ],
};