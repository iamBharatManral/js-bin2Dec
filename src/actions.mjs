export const ADD_BINARY = "ADD_BINARY"
export const CHANGE_BINARIES= "CONVERT_TO_DECIMAL"

export const addBinary = () => {
    return {
        type: ADD_BINARY,
        payload: {}
    }
}

export const changeBinaries = (binaries) => {
    return {
        type: CHANGE_BINARIES,
        payload: {
            binaries
        }
    }
}
