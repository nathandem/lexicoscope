// JSON avec une clés par langue, contenant les collections dispos dans cette langue (inclure les détails)
// => name, yearMin, yearMax, thumbnail, description, tokenSize

const dummyThumbnail = 'https://dummyimage.com/100x100/#808080/aaa';

export const predefinedCorpusFixture = {
  fr: [
    {
      name: 'Phraseorom-fr',
      yearMin: 1960,
      yearMax: 2005,
      thumbnail: dummyThumbnail,
      description: 'La meilleure collection qui soit !',
      tokenSize: 1000000,
    },
    {
      name: 'Scientext-fr',
      yearMin: 1970,
      yearMax: 1980,
      thumbnail: dummyThumbnail,
      description: 'Une large collection de textes scientifiques.',
      tokenSize: 50000,
    },
    {
      name: 'Emolex-fr',
      yearMin: 1990,
      yearMax: 2000,
      thumbnail: dummyThumbnail,
      description: 'Emolex est Emolex.',
      tokenSize: 500000,
    },
  ],
  en: [
    {
      name: 'Phraseorom-en',
      yearMin: 1960,
      yearMax: 2005,
      thumbnail: dummyThumbnail,
      description: 'The best collection out there!',
      tokenSize: 1000000,
    },
    {
      name: 'Scientext-en',
      yearMin: 1970,
      yearMax: 1980,
      thumbnail: dummyThumbnail,
      description: 'A wide-ranging scientific collection.',
      tokenSize: 50000,
    },
    {
      name: 'Emolex-en',
      yearMin: 1990,
      yearMax: 2000,
      thumbnail: dummyThumbnail,
      description: 'Emolex is Emolex.',
      tokenSize: 500000,
    },
  ],
  de: [
    {
      name: 'Phraseorom-de',
      yearMin: 1960,
      yearMax: 2005,
      thumbnail: dummyThumbnail,
      description: 'Die beste Sammlung da draußen!',
      tokenSize: 1000000,
    },
    {
      name: 'Scientext-de',
      yearMin: 1970,
      yearMax: 1980,
      thumbnail: dummyThumbnail,
      description: 'Eine umfangreiche wissenschaftliche Sammlung.',
      tokenSize: 50000,
    },
    {
      name: 'Emolex-de',
      yearMin: 1990,
      yearMax: 2000,
      thumbnail: dummyThumbnail,
      description: 'Emolex ist Emolex.',
      tokenSize: 500000,
    },
  ],
};