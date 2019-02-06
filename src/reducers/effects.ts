import { AnyAction } from "redux";
import * as types  from '../types';
import {IEffect} from "../models";

const initialState = "";

const handleAddEffect = (state: string, { name, color = 0xff0000 }: IEffect) => ({
    name,
    color
});
const handleRemoveEffect = () => "";

const handlers = {
    [types.ADD_EFFECT]: handleAddEffect,
    [types.REMOVE_EFFECT]: handleRemoveEffect,
};

export default (state = initialState, action: AnyAction) => {
    const handler = handlers[action.type];
    return handler ? handler(state, action.payload) : state;
};