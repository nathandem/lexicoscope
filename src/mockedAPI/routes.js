import fetchMock from "fetch-mock";

import { predefinedCorpusFixture } from "./fixtures/PredefinedCorpusFixtures";


fetchMock.get(/predefined-collections/, predefinedCorpusFixture);
// fetchMock.put(/\/posts\/(\w+)/, user.putUser);
