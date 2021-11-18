export const DIDStorageABI = {
    'ABI version': 2,
    version: '2.1',
    header: ['pubkey', 'time', 'expire'],
    functions: [
        {
            name: 'constructor',
            inputs: [],
            outputs: []
        },
        {
            name: 'echo',
            inputs: [
                {name: 'text', type: 'string'}
            ],
            outputs: [
                {name: 'value0', type: 'string'}
            ]
        },
        {
            name: 'getDid',
            inputs: [
                {name: 'id', type: 'uint256'}
            ],
            outputs: [
                {
                    components: [{name: 'status', type: 'string'}, {
                        name: 'issuerPubKey',
                        type: 'uint256'
                    }, {name: 'didDocument', type: 'string'}], name: 'value0', type: 'tuple'
                }
            ]
        },
        {
            name: 'addDid',
            inputs: [
                {name: 'pubKey', type: 'uint256'},
                {name: 'didDocument', type: 'string'}
            ],
            outputs: [
                {name: 'value0', type: 'uint256'}
            ]
        },
        {
            name: 'sendValue',
            inputs: [
                {name: 'dest', type: 'address'},
                {name: 'amount', type: 'uint128'},
                {name: 'bounce', type: 'bool'}
            ],
            outputs: []
        },
        {
            name: 'getMyPubKey',
            inputs: [],
            outputs: [
                {name: 'value0', type: 'uint256'}
            ]
        },
        {
            name: 'signData',
            inputs: [
                {name: 'data', type: 'string'}
            ],
            outputs: [
                {name: 'value0', type: 'uint256'}
            ]
        },
        {
            name: 'verifySignature',
            inputs: [
                {name: 'data', type: 'string'},
                {name: 'signature', type: 'uint256'}
            ],
            outputs: [
                {name: 'value0', type: 'bool'}
            ]
        },
        {
            name: 'didStorage',
            inputs: [],
            outputs: [
                {
                    components: [{name: 'status', type: 'string'}, {
                        name: 'issuerPubKey',
                        type: 'uint256'
                    }, {name: 'didDocument', type: 'string'}], name: 'didStorage', type: 'map(uint256,tuple)'
                }
            ]
        }
    ],
    data: [],
    events: [],
    fields: [
        {name: '_pubkey', type: 'uint256'},
        {name: '_timestamp', type: 'uint64'},
        {name: '_constructorFlag', type: 'bool'},
        {
            components: [{name: 'status', type: 'string'}, {name: 'issuerPubKey', type: 'uint256'}, {
                name: 'didDocument',
                type: 'string'
            }], name: 'didStorage', type: 'map(uint256,tuple)'
        }
    ]
} as const;
