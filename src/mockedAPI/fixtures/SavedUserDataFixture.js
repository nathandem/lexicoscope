// `get_archives` returns 2 arrays: corpus[] and params[]
// both contain 3 things: file, date, json

export const SavedUserDataFixture = {
  corpus: [
    {
      file: 'French novels of the 20th century',
      date: '2019-06-01',
      json: {
        collection_name: 'Phraseorom-fr',
        year_min: '1960',
        year_max: '2000',
        token_size: '200000',
      },
    },
    {
      file: 'Futurist German novels of the 2nd half of the 20th century',
      date: '2019-06-03',
      json: {
        collection_name: 'Phraseorom-de',
        year_min: '1960',
        year_max: '2000',
        token_size: '100000',
      },
    },
    {
      file: 'French scientific texts of the 1960s',
      date: '2019-06-05',
      json: {
        collection_name: 'Scientext-fr',
        year_min: '1960',
        year_max: '1969',
        token_size: '10000',
      },
    },
    {
      file: 'Police French novels of the 1990s',
      date: '2019-06-07',
      json: {
        collection_name: 'Phraseorom-fr',
        year_min: '1990',
        year_max: '1999',
        token_size: '200000',
      },
    },
    {
      file: 'Fantastic English novels of the 1980s',
      date: '2019-06-09',
      json: {
        collection_name: 'Phraseorom-en',
        year_min: '1980',
        year_max: '1989',
        token_size: '400000',
      },
    }
  ],
  params: [],
};