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
export const FrPhraseoromFixture = {
    matches_collection: ['Phraseorom-fr'],
    matches_sub_genre: ['Fantasy', 'SF', 'Policier', 'Philosophie'],
    matches_author: ['Stendhal', 'Hugo', 'Balzac', 'Zola', 'Sartre'],
    matches_title: ['Le rouge et le Noir', 'Les Misérables', 'Les mots'],
    aligned_langues: ['en', 'de'],
    source_langues: ['fr', 'en'],
    nb_title: 123,
    nb_author: 123,
    nbToks: 123456789,
    nb_unknown_toks: 123456,
};