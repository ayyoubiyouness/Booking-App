import { createContext, useReducer } from "react"

const INITIALE_STATE = {
    city: undefined,
    date: [],
    options: {
        adult: undefined,
        children: undefined,
        room: undefined
    }
}

export const SearchContext = createContext(INITIALE_STATE)

const searchReducer = (state, action) => {
    switch (action.type) {
        case "NEW_SEARCH":
            return action.payload
        case "RESET_SEARCH":
            return INITIALE_STATE
        default:
            return state
    }
}

export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(searchReducer, INITIALE_STATE)

    return (
        <SearchContext.Provider
            value={{
                city : state.city,
                date : state.date,
                options : state.options,
                dispatch

            }}

        >
            {children}

        </SearchContext.Provider>
    )
}
