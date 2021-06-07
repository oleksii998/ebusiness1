import {createContext} from "react";

export const Reducer = (oldState, promotions) => {
    return {
        promotions
    }
};

export const initialState = {promotions: []};

export const PromotionContext = createContext(initialState);

