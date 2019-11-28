const dummyThumbnail = process.env.PUBLIC_URL + '/assets/img/dummyimage__100-100.png';

export const CollectionsFixture = {

  fr: {
    'Phraseorom': {
      yearMin: 1960,
      yearMax: 2005,
      thumbnail: dummyThumbnail,
      category: "Roman",
      description: "La meilleure collection qui soit !",
      alignedLanguages: {
        asSource:["en", "de", "fr"],
        asTarget:["en", "de", "fr"],
      },
      partitions: ["auteur", "genre", "année", "décade"],
      tokenSize: 1000000,
    },
    'Scientext': {
      yearMin: 1970,
      yearMax: 1980,
      thumbnail: dummyThumbnail,
      category: "Article scientifique",
      description: "Une large collection de textes scientifiques.",
      alignedLanguages: {
        asSource:["en", "fr"],
        asTarget:["en", "fr"],
      },
      partitions: ["auteur", "thème", "année", "décade"],
      tokenSize: 50000,
    },
    'Emolex': {
      yearMin: 1990,
      yearMax: 2000,
      thumbnail: dummyThumbnail,
      category: "Presse quotidienne",
      description: "Emolex est Emolex.",
      alignedLanguages: {
        asSource:["de", "fr"],
        asTarget:["de", "fr"],
      },
      partitions: ["auteur", "année", "décade"],
      tokenSize: 500000,
    },
  },

  en: {
    'Phraseorom': {
      yearMin: 1960,
      yearMax: 2005,
      thumbnail: dummyThumbnail,
      category: "Novel",
      description: "The best collection out there!",
      alignedLanguages: {
        asSource:["en", "de", "fr"],
        asTarget:["en", "de", "fr"],
      },
      partitions: ["author", "genre", "year", "decade"],
      tokenSize: 1000000,
    },
    'Scientext': {
      yearMin: 1970,
      yearMax: 1980,
      thumbnail: dummyThumbnail,
      category: "Scientific articles",
      description: "A wide-ranging scientific collection.",
      alignedLanguages: {
        asSource:["en", "fr"],
        asTarget:["en", "fr"],
      },
      partitions: ["author", "topic", "year", "decade"],
      tokenSize: 50000,
    },
  },

  de: {
    'Phraseorom': {
      yearMin: 1960,
      yearMax: 2005,
      thumbnail: dummyThumbnail,
      category: "Roman",
      description: "Die beste Sammlung da draußen!",
      alignedLanguages: {
        asSource:["en", "de", "fr"],
        asTarget:["en", "de", "fr"],
      },
      partitions: ["autor", "genre", "jahr", "dekade"],
      tokenSize: 1000000,
    },
    'Emolex': {
      yearMin: 1990,
      yearMax: 2000,
      thumbnail: dummyThumbnail,
      category: "Tagespresse",
      description: "Emolex ist Emolex.",
      alignedLanguages: {
        asSource:["de", "fr"],
        asTarget:["de", "fr"],
      },
      partitions: ["autor", "jahr", "dekade"],
      tokenSize: 50000,
    },
  },

};