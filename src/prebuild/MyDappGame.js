const abi =  [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x06fdde03"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "disputes",
    "outputs": [
      {
        "components": [
          {
            "name": "playerNumber",
            "type": "uint256"
          },
          {
            "name": "randomRanges",
            "type": "uint256[2][]"
          },
          {
            "name": "seed",
            "type": "bytes32"
          }
        ],
        "name": "disputeGameData",
        "type": "tuple"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x11be1997"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "refererReward",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x15196f2c"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "bytes32"
      },
      {
        "name": "_session",
        "type": "uint256"
      },
      {
        "name": "_disputeBets",
        "type": "uint256[]"
      },
      {
        "components": [
          {
            "name": "playerNumber",
            "type": "uint256"
          },
          {
            "name": "randomRanges",
            "type": "uint256[2][]"
          },
          {
            "name": "seed",
            "type": "bytes32"
          }
        ],
        "name": "_gameData",
        "type": "tuple"
      },
      {
        "name": "_signature",
        "type": "bytes"
      }
    ],
    "name": "openDispute",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xfe95554c"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "bytes32"
      },
      {
        "name": "_playerBalance",
        "type": "uint256"
      },
      {
        "name": "_bankrollerBalance",
        "type": "uint256"
      },
      {
        "name": "_totalBet",
        "type": "uint256"
      },
      {
        "name": "_session",
        "type": "uint256"
      },
      {
        "name": "_sign",
        "type": "bytes"
      }
    ],
    "name": "closeByConsent",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x33f278e6"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "bytes32"
      },
      {
        "name": "_player",
        "type": "address"
      },
      {
        "name": "_bankroller",
        "type": "address"
      },
      {
        "name": "_playerBalance",
        "type": "uint256"
      },
      {
        "name": "_bankrollerBalance",
        "type": "uint256"
      },
      {
        "name": "_openingBlock",
        "type": "uint256"
      },
      {
        "name": "_gameData",
        "type": "bytes"
      },
      {
        "name": "_N",
        "type": "bytes"
      },
      {
        "name": "_E",
        "type": "bytes"
      },
      {
        "name": "_signature",
        "type": "bytes"
      }
    ],
    "name": "openChannel",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x3daace23"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "platform",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x4bde38c8"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "bytes32"
      },
      {
        "name": "_N",
        "type": "bytes"
      },
      {
        "name": "_E",
        "type": "bytes"
      },
      {
        "name": "_rsaSignature",
        "type": "bytes"
      }
    ],
    "name": "resolveDispute",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x64629522"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "bytes32"
      },
      {
        "name": "_playerBalance",
        "type": "uint256"
      },
      {
        "name": "_bankrollerBalance",
        "type": "uint256"
      },
      {
        "name": "_totalBet",
        "type": "uint256"
      },
      {
        "name": "_session",
        "type": "uint256"
      },
      {
        "name": "_signature",
        "type": "bytes"
      }
    ],
    "name": "updateChannel",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x698b2fc5"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "channels",
    "outputs": [
      {
        "name": "state",
        "type": "uint8"
      },
      {
        "name": "player",
        "type": "address"
      },
      {
        "name": "bankroller",
        "type": "address"
      },
      {
        "name": "playerBalance",
        "type": "uint256"
      },
      {
        "name": "bankrollerBalance",
        "type": "uint256"
      },
      {
        "name": "totalBet",
        "type": "uint256"
      },
      {
        "name": "session",
        "type": "uint256"
      },
      {
        "name": "endBlock",
        "type": "uint256"
      },
      {
        "name": "gameData",
        "type": "bytes"
      },
      {
        "name": "RSAHash",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x7a7ebd7b"
  },
  {
    "constant": true,
    "inputs": [
      {
        "components": [
          {
            "name": "playerNumber",
            "type": "uint256"
          },
          {
            "name": "randomRanges",
            "type": "uint256[2][]"
          },
          {
            "name": "seed",
            "type": "bytes32"
          }
        ],
        "name": "_gameData",
        "type": "tuple"
      }
    ],
    "name": "hashGameData",
    "outputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function",
    "signature": "0xada3e210"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "minBet",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x9619367d"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "gameDevReward",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xa09dd3af"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "signidice",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xa12fa955"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "engine",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xc9d4623f"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "developer",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xca4b208b"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "safeTime",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xdd754511"
  },
  {
    "constant": true,
    "inputs": [
      {
        "components": [
          {
            "name": "playerNumber",
            "type": "uint256"
          },
          {
            "name": "randomRanges",
            "type": "uint256[2][]"
          },
          {
            "name": "seed",
            "type": "bytes32"
          }
        ],
        "name": "_gameData",
        "type": "tuple"
      },
      {
        "name": "_bets",
        "type": "uint256[]"
      }
    ],
    "name": "checkGameData",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function",
    "signature": "0xe1e48c38"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "bytes32"
      }
    ],
    "name": "closeByTime",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xed784626"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "bankrollReward",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xf303ea38"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "token",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xfc0c546a"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "platformReward",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xfe6551b6"
  },
  {
    "inputs": [
      {
        "name": "_engine",
        "type": "address"
      },
      {
        "name": "_token",
        "type": "address"
      },
      {
        "name": "_platform",
        "type": "address"
      },
      {
        "name": "_signidice",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor",
    "signature": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "action",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "id",
        "type": "bytes32"
      }
    ],
    "name": "logChannel",
    "type": "event",
    "signature": "0x3ca6653799ff65c4b26919c9ae0f9647c451ffa5bd5b97af26620c3278673e70"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getName",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x17d7de7c"
  }
]