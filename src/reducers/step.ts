import {Action} from "redux";
import {TOOGLE_STEP} from '../types';
import {EOwner} from "../models";
import * as types from "../types";

const initialState = EOwner.I;

const handleToogle = (state: EOwner) => state === EOwner.I ? EOwner.Enemy : EOwner.I;

const handlers = {
    [TOOGLE_STEP]: handleToogle,
};

export default (state = initialState, action: Action<types.TOOGLE_STEP>) => {
    const handler = handlers[action.type];
    return handler ? handler(state) : state;
};