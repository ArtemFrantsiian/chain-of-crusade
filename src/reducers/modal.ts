import { AnyAction } from "redux";
import * as types  from '../types';
import {IModal} from "../models";

const initialState = '';

const handleShow = (state: string, payload: IModal) => payload;
const handleClose = () => "";

const handlers = {
    [types.SHOW_MODAL]: handleShow,
    [types.CLOSE_MODAL]: handleClose,
};

export default (state = initialState, action: AnyAction) => {
    const handler = handlers[action.type];
    return handler ? handler(state, action.payload) : state;
};