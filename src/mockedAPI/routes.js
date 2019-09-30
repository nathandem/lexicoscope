import fetchMock from "fetch-mock";

import { predefinedCorpusFixture } from './fixtures/PredefinedCorpusFixtures';
import { savedUserDataFixture } from './fixtures/SavedUserDataFixtures';


fetchMock.get(/predefined-collections/, predefinedCorpusFixture);
fetchMock.get(/get_archives.ajax.php/, savedUserDataFixture);
// fetchMock.put(/\/posts\/(\w+)/, user.putUser);
