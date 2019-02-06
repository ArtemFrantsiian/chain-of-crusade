import { AnyAction } from "redux";
import * as types from '../types';
import {IEffect} from "../models";

export const addEffect = (effect: IEffect): AnyAction => ({
    type: types.ADD_EFFECT,
    payload: effect
});

export const removeEffect = (): AnyAction => ({
    type: types.REMOVE_EFFECT
});