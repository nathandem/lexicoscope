const resourcesBase = 'http://phraseotext.univ-grenoble-alpes.fr/lexicoscope_2.0';

export const CollectionsFixture = {
	"fr": {
		"phraseorom":{
			"yearMin":1950,
			"yearMax":2016,
			"thumbnail": resourcesBase + "/perl/thumbnails/phraseorom.png",
			"description":"Le principal objectif de ce projet est d’élaborer, dans une démarche inductive corpus-driven, une typologie structurelle et fonctionnelle des constructions lexico-syntaxiques spécifiques (CLS) au discours romanesque francophone, anglophone et germanophone du XX e siècle, le roman constituant le genre littéraire qui touche le lectorat le plus large.",
			"genre":"Romans",
			"category":"sub_genre",
			"alignedLanguages": {
				"asSource":["en"],
				"asTarget":["en"]
			},
			"tokenSize":113166903,
			"partition":["decade","sub_genre","author"]
		},
		"termith":{
			"yearMin":2005,
			"yearMax":2013,
			"thumbnail": resourcesBase + "/perl/thumbnails/termith.png",
			"description":"Le projet TermITH vise à indexer automatiquement des articles scientifiques intégraux en sciences humaines et sociales. Il a réuni six partenaires : l'Atilf, l'Inist, l'Inria (Grand-Est et Saclay), le Lidilem et le Lina. Les articles scientifiques ont été fournis par ADBS (Cairn), Lavoisier (Cairn), Elsevier via le projet ISTEX, Canadian Journal of Chemistry, OpenEdition et le projet Scientext.",
			"genre":"Articles scientifiques",
			"category":"discipline",
			"tokenSize":113166903,
			"alignedLanguages": {
				"asSource":[],
				"asTarget":[]
			},
			"partition":["decade","discipline","author"]

		},
		"emolex":{
			"yearMin":1938,
			"yearMax":2009,
			"thumbnail": resourcesBase + "/perl/thumbnails/emobase.png",
			"description":"Fondé sur une approche multilingue et multidisciplinaire (typologie intra et interlangue, sémantique lexicale, syntaxe, lexicographie, didactique des langues étrangères, TAL) et basé sur une étude de corpus, le projet a plusieurs objectifs. A partir d’un cadre théorique articulant les approches « représentationnistes » et « instrumentalistes » du sens (c’est-à-dire « sens-concept » vs sens-usage »), le projet vise à analyser les valeurs sémantiques, le comportement combinatoire (lexématique et syntaxique) et les profils discursifs des lexies des émotions dans cinq langues européennes (français, allemand, anglais, russe et espagnol), ce qui permet de mieux structurer le champ lexical des émotions par rapport à ce que proposent les études existantes en lexicologie et lexicographie. Cette « cartographie » linguistique des émotions aboutit au développement de nouveaux outils en didactique des langues étrangères, en lexicographie et en TAL.",
			"category":"genre",
			"genre":"Presse quotidienne (Le Monde, Le Figaro, Libération, Ouest France - 2007 et 2008), Romans",
			"tokenSize":128259209,
			"alignedLanguages": {
				"asSource":[],
				"asTarget":[]
			},
			"partition":["year","author"]
		},
		"europarl":{
			"yearMin":1996,
			"yearMax":2011,
			"thumbnail": resourcesBase + "/perl/thumbnails/europarl.png",
			"description":"Débats du parlement européen EuroParl (1996-2011, http://www.statmt.org/europarl/)",
			"genre":"discours politique",
			"category":"subject",
			"tokenSize":53758078,
			"alignedLanguages": {
				"asSource":[],
				"asTarget":[]
			},
			"partition":["year"]
		}
	},
	"en": {
		"phraseorom":{
			"yearMin":1950,
			"yearMax":2016,
			"thumbnail": resourcesBase + "/perl/thumbnails/phraseorom.png",
			"description": "Le principal objectif de ce projet est d’élaborer, dans une démarche inductive corpus-driven, une typologie structurelle et fonctionnelle des constructions lexico-syntaxiques spécifiques (CLS) au discours romanesque francophone, anglophone et germanophone du XX e siècle, le roman constituant le genre littéraire qui touche le lectorat le plus large.",
			"genre":"Romans",
			"category":"sub_genre",
			"tokenSize":135453940,
			"alignedLanguages": {
				"asSource":["fr"],
				"asTarget":["fr"]
			},
			"partition":["decade","sub_genre","author"]
		},
		"scientext":{
			"yearMin":1997,
			"yearMax":2005,
			"thumbnail": resourcesBase + "/perl/thumbnails/scientext.png",
			"description":"Textes de biologie et de médecine de la maison d’édition indépendante BioMed Central issus du projet ANR Scientext.",
			"genre":"Articles scientifiques",
			"category":"discipline",
			"tokenSize":44911586,
			"alignedLanguages": {
				"asSource":[],
				"asTarget":[]
			},
			"partition":["decade","discipline","author"]
		},
		"emolex":{
			"yearMin":1950,
			"yearMax":2010,
			"thumbnail": resourcesBase + "/perl/thumbnails/emobase.png",
			"description":"Fondé sur une approche multilingue et multidisciplinaire (typologie intra et interlangue, sémantique lexicale, syntaxe, lexicographie, didactique des langues étrangères, TAL) et basé sur une étude de corpus, le projet a plusieurs objectifs. A partir d’un cadre théorique articulant les approches « représentationnistes » et « instrumentalistes » du sens (c’est-à-dire « sens-concept » vs sens-usage »), le projet vise à analyser les valeurs sémantiques, le comportement combinatoire (lexématique et syntaxique) et les profils discursifs des lexies des émotions dans cinq langues européennes (français, allemand, anglais, russe et espagnol), ce qui permet de mieux structurer le champ lexical des émotions par rapport à ce que proposent les études existantes en lexicologie et lexicographie. Cette « cartographie » linguistique des émotions aboutit au développement de nouveaux outils en didactique des langues étrangères, en lexicographie et en TAL.",
			"genre":"Presse quotidienne (Times, The Independent, The Guardian, Leicester Mercury - 2008), Romans",
			"category":"genre",
			"tokenSize":58986623,
			"alignedLanguages": {
				"asSource":[],
				"asTarget":[]
			},
			"partition":["year","author"]
		},
		"europarl":{
			"yearMin":1996,
			"yearMax":2011,
			"thumbnail": resourcesBase + "/perl/thumbnails/europarl.png",
			"description": "Débats du parlement européen EuroParl (1996-2011, http://www.statmt.org/europarl/)",
			"genre":"discours politique",
			"category":"subject",
			"tokenSize":53758078, 
			"alignedLanguages": {
				"asSource":[],
				"asTarget":[]
			},
			"partition":["year"]
		}
	}
};
