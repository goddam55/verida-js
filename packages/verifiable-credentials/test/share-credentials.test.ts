// https://nodejs.org/api/assert.html
const assert = require('assert');
import { Utils } from '@verida/client-ts';
import Credentials from '../src/credentials';
import SharingCredential from '../src/sharing-credential';
import { config, connect } from './config';


describe('Share Credential tests', function () {
    describe('Share Credential Units', function () {
        this.timeout(100000);


        let appContext;
        let shareCredential;
        let credential;

        beforeEach(async function () {
            appContext = await connect(config.PRIVATE_KEY_1);

            shareCredential = new SharingCredential(appContext);

            credential = new Credentials(appContext)
        });

        let createdUri = ''

        it('Issue an encrypted credential', async function () {

            const item = await credential.createCredentialJWT(config.SUBJECT_DID, config.CREDENTIAL_DATA);
        
            const data = await shareCredential.issueEncryptedCredential(item);
            createdUri = data.uri

            assert.ok(data.result.ok, 'Document was saved correctly');

            const expectedUri = Utils.buildVeridaUri(
                config.ISSUER_DID,
                config.VERIDA_CONTEXT_NAME,
                config.VERIDA_EXPECTED_DATABASE,
                data.result.id
            );

            const uriWithoutKey = data.uri.substring(0, expectedUri.length);
            assert.equal(uriWithoutKey, expectedUri, 'URI is the expected value, without encryption key');

            assert.equal(expectedUri, data.uri, 'URI is the expected value, with encryption key')

            // @todo: Fetch the credential via data.uri, decode the credential and then ensure the vc.credentialSubject matches config.CREDENTIAL_DATA
        });
        it('Retrieve Credential data from URI using a different account', async function () {
            // @todo: Fetch the credential via data.uri, decode the credential and then ensure the vc.credentialSubject matches config.CREDENTIAL_DATA
            // BUT using config.PRIVATE_KEY_2

            const context = await connect(config.PRIVATE_KEY_2);

            const credential = new Credentials(context);

            const jwt = await Utils.fetchVeridaUri(createdUri, context);


            const verifiedCredential: any = await credential.verifyCredential(jwt);

            assert.equal(verifiedCredential.jwt, jwt, 'JWT signature is valid');
        });


        it('When Verida uri data does not exist in the database', async function () {

            const fetchVeridaUri = async () => {
                return await Utils.fetchVeridaUri(config.VERIDA_URI, appContext);
            };

            assert.rejects(fetchVeridaUri);
        });
    });
});
