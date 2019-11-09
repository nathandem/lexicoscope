// As a reminder this is the API contract, request and response bodies.

    // REQUEST BODY
    // "lang: str (""en"", ""fr"", ...)
    // year_min: int
    // year_max: int
    // collection: int
    // sub_genre
    // author
    // title
    // lang_source
    // lang_alignement
    // => int (id)"

    // RESPONSE BODY
    // - Below are filters
    // matches_collection
    // matches_sub_genre
    // matches_author
    // matches_title
    // aligned_langues
    // source_langues
    // => the el. above are couples of [id, value]. Value is shown on screen, id passed to the server
    // - Below are stats
    // nb_title
    // nb_author
    // nbToks
    // nb_unknown_toks


// mock for one French collection
// note: the `id`s can be whatever the server sends
export const FrPhraseoromFixture = {
    matches_collection: [[1, 'Phraseorom-fr']],
    matches_sub_genre: [[43, 'Fantasy'], [32, 'SF'], [76, 'Policier'], [48, 'Philosophie']],
    matches_author: [[23, 'Stendhal'], [43, 'Hugo'], [76, 'Balzac'], [86, 'Zola'], [54, 'Sartre']],
    matches_title: [[32, 'Le rouge et le Noir'], [65, 'Les Misérables'], [541, 'Les mots']],
    aligned_langues: ['en', 'de'],
    source_langues: ['fr', 'en'],
    minYear: 1950,
    maxYear: 2016,
    nb_title: 123,
    nb_author: 123,
    nbToks: 123456789,
    nb_unknown_toks: 123456,
};