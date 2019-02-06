import { AnyAction } from "redux";
import * as types from '../types';
import {IModal} from "../models";

export const openModal = (payload: IModal): AnyAction => ({
    type: types.SHOW_MODAL,
    payload,
});

export const closeModal = (): AnyAction => ({
    type: types.CLOSE_MODAL
});