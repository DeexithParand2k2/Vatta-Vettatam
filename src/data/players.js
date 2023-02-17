//based on zero indexed array
const playersTeamTwo = {
    b1: 20,
    b2: 18,
    b3: 19,
    b4: 17,
    b5: 14,
    b6: 16,
}
//indexes of these players where isPlaced will be the player name
const playersTeamOne = {
    r1: 0,
    r2: 1,
    r3: 2,
    r4: 3,
    r5: 4,
    r6: 6,
}

//valid moves
const validMovesArray = {
    r1: [],
    r2: [],
    r3: [],
    r4: [6],
    r5: [7,8],
    r6: [12,13],
    b1: [],
    b2: [],
    b3: [],
    b4: [15],
    b5: [7,8],
    b6: [12,13],
}

//opponent check
const opponentCheckArray = {
    r1: [],
    r2: [],
    r3: [],
    r4: [],
    r5: [],
    r6: [],
    b1: [],
    b2: [],
    b3: [],
    b4: [],
    b5: [],
    b6: [],
}

export {playersTeamTwo, playersTeamOne, validMovesArray, opponentCheckArray};