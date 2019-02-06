import {AnyAction} from "redux";
import {PREVIEW_CARD} from '../types';
import {ICard} from "../models";

const handlePreview = (state: ICard | undefined, payload: ICard) => payload;

const handlers = {
    [PREVIEW_CARD]: handlePreview,
};

export default (state: ICard | {} = {}, action: AnyAction) => {
    const handler = handlers[action.type];
    return handler ? handler(state, action.payload) : state;
};