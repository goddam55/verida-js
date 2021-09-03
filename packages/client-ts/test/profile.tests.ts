
'use strict'
const assert = require('assert')

import VeridaClient from '../src/index'
import { Utils } from '@verida/3id-utils-node'
import { AutoAccount } from '@verida/account'
import { StorageLink } from '@verida/storage-link'
import CONFIG from './config'
StorageLink.setSchemaId(CONFIG.STORAGE_LINK_SCHEMA)

const utils = new Utils(CONFIG.CERAMIC_URL)

const DATA = {
    name: "Jane"
}

describe('Profile tests', () => {
    const client1 = new VeridaClient({
        defaultDatabaseServer: {
            type: 'VeridaDatabase',
            endpointUri: 'http://localhost:5000/'
        },
        defaultMessageServer: {
            type: 'VeridaMessage',
            endpointUri: 'http://localhost:5000/'
        },
        ceramicUrl: CONFIG.CERAMIC_URL
    })
    let ceramic1, did1, context1, profile1

    const client2 = new VeridaClient({
        defaultDatabaseServer: {
            type: 'VeridaDatabase',
            endpointUri: 'http://localhost:5000/'
        },
        defaultMessageServer: {
            type: 'VeridaMessage',
            endpointUri: 'http://localhost:5000/'
        },
        ceramicUrl: CONFIG.CERAMIC_URL
    })
    let ceramic2, did2, context2, profile2

    describe("Public profiles", function() {
        this.timeout(20 * 1000)

        it('can initialise own profile', async () => {
            ceramic1 = await utils.createAccount('ethr', CONFIG.ETH_PRIVATE_KEY)
            const account1 = new AutoAccount(ceramic1)
            did1 = await account1.did()
            await client1.connect(account1)
            context1 = await client1.openContext(CONFIG.CONTEXT_NAME, true)

            profile1 = await context1.openProfile()
            await profile1.set("name", DATA.name)
            const name = await profile1.get("name")
            assert.equal(name, DATA.name, "Can set and get a profile value")
        })

        it('can access an external profile', async () => {
            ceramic2 = await utils.createAccount('ethr', CONFIG.ETH_PRIVATE_KEY)
            const account2 = new AutoAccount(ceramic1)
            did2 = await account2.did()
            await client2.connect(account2)
            context2 = await client2.openContext(CONFIG.CONTEXT_NAME, true)

            profile2 = await context2.openProfile("public", did1)
            const name = await profile2.get("name")
            assert.equal(name, DATA.name, "Can get external public profile data")
        })
    })

    // @todo: add tests for private profiles
})