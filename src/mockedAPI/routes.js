import fetchMock from "fetch-mock";

import { CollectionsFixture } from './fixtures/CollectionsFixture';
import { SavedUserDataFixture } from './fixtures/SavedUserDataFixture';
import { FrPhraseoromFixture } from './fixtures/FiltersFixture';
import { ResultsFixture } from './fixtures/ResultsFixture';


fetchMock.get(/collections/, CollectionsFixture);
fetchMock.get(/get_archives.ajax.php/, SavedUserDataFixture);
fetchMock.post(/refresh_select.ajax.php/, FrPhraseoromFixture);
fetchMock.post(/search.ajax.php/, ResultsFixture);
// fetchMock.put(/\/posts\/(\w+)/, user.putUser);
