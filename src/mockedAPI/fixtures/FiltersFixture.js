// As a reminder this is the API contract, request and response bodies.

// REQUEST BODY
// lang: str ("en", "fr", ...)
// aligned_language: str ("en", "fr", ...)
// collection: str ("phraseorom", ...)
// categories: arrayOf(id)
// authors: arrayOf(id)
// titles: arrayOf(id)
// source_languages: arrayOf(str)
// year_min: int
// year_max: int

// RESPONSE BODY
// - Below are filters
// matches_category
// matches_author
// matches_title
// => couples of [id, value]. ID are needed for refresh_select, labels are shown on the screen
// matches_collection
// aligned_language
// source_languages
// year_min
// year_max
// - Below are stats
// nb_title
// nb_author
// nbToks
// nb_unknown_toks

// mock for one French collection
export const FrPhraseoromFixture = {
    matches_collection: ['Phraseorom'],
    matches_category: [[43, 'Fantasy'], [32, 'SF'], [76, 'Policier'], [48, 'Philosophie']],
    matches_author: [[23, 'Stendhal'], [43, 'Hugo'], [76, 'Balzac'], [86, 'Zola'], [54, 'Sartre']],
    matches_title: [[32, 'Le rouge et le Noir'], [65, 'Les Misérables'], [541, 'Les mots']],
    aligned_language: ['en', 'de'],
    source_languages: ['fr', 'en'],
    year_min: 1950,
    year_max: 2000,
    nb_title: 123,
    nb_author: 123,
    nbToks: 123456789,
    nb_unknown_toks: 123456,
};