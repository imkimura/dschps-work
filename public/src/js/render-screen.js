export default function renderScreen(screen, game, requestAnimationFrame) {

    const context = screen.getContext('2d')
    context.fillStyle = 'white'
    context.clearRect(0, 0, 10, 10)

    for (const playerName in game.state.players) {
        const player = game.state.players[playerName]

        context.fillStyle = 'white'

        // var img = document.getElementById("image");
        // var pat = context.createPattern(img, "no-repeat");
        // context.fillStyle = pat;

        context.fillRect(player.x, player.y, 1, 1);

    }

    for (const fruitName in game.state.fruits) {
        const fruit = game.state.fruits[fruitName]

        context.fillStyle = 'red'
        context.fillRect(fruit.x, fruit.y, 1, 1)
    }
    requestAnimationFrame(() => {
        renderScreen(screen, game, requestAnimationFrame)
    });
}