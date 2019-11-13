import fetchMock from "fetch-mock";

import { CollectionsFixture } from './fixtures/CollectionsFixture';
import { savedUserDataFixture } from './fixtures/SavedUserDataFixtures';
import { FrPhraseoromFixture } from './fixtures/FiltersFixtures';
import { ResultsFixture } from './fixtures/Results';


fetchMock.get(/collections/, CollectionsFixture);
fetchMock.get(/get_archives.ajax.php/, savedUserDataFixture);
fetchMock.post(/refresh_select.ajax.php/, FrPhraseoromFixture);
fetchMock.post(/search.ajax.php/, ResultsFixture);
// fetchMock.put(/\/posts\/(\w+)/, user.putUser);
