import createStore from "./store.mjs";
import {ADD_BINARY, CHANGE_BINARIES, addBinary, changeBinaries} from "./actions.mjs";
// State
const initialState = {
    binaries: [0, 0, 0, 0, 0, 0, 0, 0]
}

const reducer = (state, action) => {
    switch (action.type) {
        case ADD_BINARY:
            return {
                binaries: [...state.binaries, 0]
            }
        case CHANGE_BINARIES:
            return {
                binaries: action.payload.binaries
            }

    }
    return state
}


// Pure Functions

const positionValue = (position, radix, val) => (radix ** position) * val
const bin2Dec = (binaries) => {
    let position = 0
    return binaries.reduceRight((acc, val) => {
        const result = acc + positionValue(position, 2, val)
        position += 1
        return result
    }, 0)
}

// Side Effects

const createLabelInput = (listener, value) => {
    const input = document.createElement('input')
    input.value = value
    input.maxLength = 1
    input.pattern = "[01]{1}"
    input.addEventListener("input", listener)
    return input
}


const app = () => {
    const store = createStore(initialState, reducer)
    const inputsContainer = document.querySelector(".inputsContainer")
    const inputElms = document.getElementsByTagName("input")
    const decimal = document.querySelector(".decimal")
    const btn = document.querySelector("button")
    btn.addEventListener('click',() => store.dispatch(addBinary()))

    const handleInput = (event) => {
        const value = parseInt(event.target.value)
        if(value === 0 || value === 1){
            const binaries = Array.from(inputElms).map(input => parseInt(input.value))
            store.dispatch(changeBinaries(binaries))
        }

    }
    Array.from(inputElms).forEach(input => {
        input.addEventListener("input", handleInput)
    })

    const listener = (state, actionType) => {
        if(actionType === ADD_BINARY){
            const newInput = createLabelInput(handleInput, 0)
            inputsContainer.appendChild(newInput)
            decimal.innerText = `Decimal: ${bin2Dec(state.binaries)}`
        }else if(actionType === CHANGE_BINARIES){
            decimal.innerText = `Decimal: ${bin2Dec(state.binaries)}`
        }
    }

    store.subscribe(listener)

}

app()


