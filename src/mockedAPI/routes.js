import fetchMock from "fetch-mock";

import { predefinedCorpusFixture } from './fixtures/PredefinedCorpusFixtures';
import { savedUserDataFixture } from './fixtures/SavedUserDataFixtures';
import { FrPhraseoromFixture } from './fixtures/FiltersFixtures';
import { ResultsFixture } from './fixtures/Results';


fetchMock.get(/predefined-collections/, predefinedCorpusFixture);
fetchMock.get(/get_archives.ajax.php/, savedUserDataFixture);
fetchMock.post(/refresh_select.ajax.php/, FrPhraseoromFixture);
fetchMock.post(/search.ajax.php/, ResultsFixture);
// fetchMock.put(/\/posts\/(\w+)/, user.putUser);
