const createStore = (initialState = {}, reducer) => {
    let state =  initialState
    const listeners = []
    return {
        dispatch(action){
            state = reducer(state, action)
            listeners.forEach(listener => listener(state, action.type))

        },
        subscribe(listener){
            listeners.push(listener)
        },

    }
}

export default createStore
