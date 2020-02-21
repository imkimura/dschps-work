export default function createGame() {

    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10
        }
    }

    function addPlayer(command) {
        const playerId = command.playerId
        const playerX = command.x
        const playerY = command.y

        state.players[playerId] = {
            x: playerX,
            y: playerY
        }
    }

    function removePlayer(command) {
        const playerId = command.playerId

        delete state.players[playerId]
    }

    function addFruit(command) {
        const fruitId = command.fruitId
        const fruitX = command.x
        const fruitY = command.y

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }
    }

    function removeFruit(command) {
        const fruitId = command.fruitId

        delete state.fruits[fruitId]
    }

    function movePlayer(command) {
        console.log(`game.movePlayer() -> Moving ${command.playerId} with ${command.keyPressed}`)

        const acceptMoves = {
            ArrowUp(player) {
                if (player.y > 0) {
                    player.y -= 1
                    return
                }
            },
            ArrowDown(player) {
                if ((player.y + 1) < state.screen.height) {
                    player.y += 1
                    return
                }
            },
            ArrowLeft(player) {
                if (player.x > 0) {
                    player.x -= 1
                    return
                }
            },
            ArrowRight(player) {
                if ((player.x + 1) < state.screen.width) {
                    player.x += 1
                    return
                }
            }
        }

        const keyPressed = command.keyPressed
        const playerId = command.playerId
        const player = state.players[command.playerId]
        const moveFunction = acceptMoves[keyPressed]

        if (player && moveFunction) {
            moveFunction(player)
            checkForCollision(playerId)
        }
    }

    function checkForCollision(playerId) {
        const player = state.players[playerId]

        for (const fruitId in state.fruits) {
            const fruit = state.fruits[fruitId]

            console.log(`Checking ${playerId} and ${fruitId}`)

            if (player.x === fruit.x && player.y === fruit.y) {
                console.log(`Collision between ${playerId} and ${fruitId}`)
                removeFruit({ fruitId: fruitId })
            }
        }
    }

    return {
        movePlayer,
        state,
        removePlayer,
        addPlayer,
        removeFruit,
        addFruit
    }
}