import React, { createContext, useReducer } from 'react'

export const FoodsContext = createContext();

const reducer= (state, pair) => ({ ...state, ...pair});

const initialState={
    Foods:[],
    currentFood:{},
    currentDeletion:"",
    isInserted:false
}

export const FoodsProvider=(props)=>{
    const [state, setState]=useReducer(reducer, initialState);

    return(
        <FoodsContext.Provider value={{state, setState}}>
            {props.children}
        </FoodsContext.Provider>
    )
}