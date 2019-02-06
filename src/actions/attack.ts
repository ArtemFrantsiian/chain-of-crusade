import { AnyAction } from "redux";
import * as types from '../types';
import { IAttack } from "../models";

export const attack = (payload: IAttack): AnyAction => ({
    type: types.ATTACK,
    payload,
});

export const removeAttack = (): AnyAction => ({
    type: types.REMOVE_ATTACK
});