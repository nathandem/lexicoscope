import fetchMock from "fetch-mock";

import { CollectionsFixture } from './fixtures/CollectionsFixture';
import { ExamplesFixture } from './fixtures/ExamplesFixture';
import { SavedUserDataFixture } from './fixtures/SavedUserDataFixture';
import { FrPhraseoromFixture } from './fixtures/FiltersFixture';
import { ResultsFixture } from './fixtures/ResultsFixture';


fetchMock.get(/collections/, CollectionsFixture);
fetchMock.get(/get_archives.ajax.php/, SavedUserDataFixture);
fetchMock.post(/refresh_select.ajax.php/, FrPhraseoromFixture);
fetchMock.post(/search.ajax.php/, ResultsFixture);
fetchMock.post(/get_examples.ajax.php/, ExamplesFixture);
// fetchMock.put(/\/posts\/(\w+)/, user.putUser);
