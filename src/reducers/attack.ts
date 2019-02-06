import { AnyAction } from "redux";
import * as types  from '../types';
import {IAttack} from "../models";

const initialState = "";

const handleAttack = (state: string, payload: IAttack) => payload;
const handleRemoveAttack = () => "";

const handlers = {
    [types.ATTACK]: handleAttack,
    [types.REMOVE_ATTACK]: handleRemoveAttack,
};

export default (state = initialState, action: AnyAction) => {
    const handler = handlers[action.type];
    return handler ? handler(state, action.payload) : state;
};