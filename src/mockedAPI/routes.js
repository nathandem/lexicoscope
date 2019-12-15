import fetchMock from "fetch-mock";

import { CollectionsFixture } from './fixtures/CollectionsFixture';
import { ConcordMetaDataFixture } from './fixtures/ConcordMetaDataFixture';
import { ExamplesFixture } from './fixtures/ExamplesFixture';
import { SavedUserDataFixture } from './fixtures/SavedUserDataFixture';
import { FrPhraseoromFixture } from './fixtures/FiltersFixture';
import { ResultsFixture } from './fixtures/ResultsFixture';


fetchMock.get(/collections/, CollectionsFixture);
fetchMock.get(/get_archives.ajax.php/, SavedUserDataFixture);
fetchMock.post(/refresh_select.ajax.php/, FrPhraseoromFixture);
fetchMock.post(/create_session_id.ajax.php/, { status: 'ok', session_id: 'qwerty123' });
fetchMock.get(/search.ajax.php/, ResultsFixture);
fetchMock.post(/get_examples.ajax.php/, ExamplesFixture);
fetchMock.post(/get_result_meta.ajax.php/, ConcordMetaDataFixture);
fetchMock.post(/signIn.ajax.php/, {})  // just get a 200 status code
fetchMock.post(/signUp.ajax.php/, { status: 201 })  // 201 for a successful sign-up
fetchMock.post(/disconnect.ajax.php/, {})  // just get a 200 status code
