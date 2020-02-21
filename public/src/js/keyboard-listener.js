export default function createKeyboardListener() {
    const state = {
        observers: []
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    function notifyAll(command) {
        console.log(`keyboardListener() -> Notifying ${state.observers.length} observers`)

        for (const observerFunction of state.observers) {
            observerFunction(command)
        }
    }

    document.addEventListener('keydown', listenKey)

    function listenKey(e) {

        const keyPressed = e.key

        const command = {
            playerId: 'leia',
            keyPressed
        }

        notifyAll(command)
    }

    return { subscribe }
}