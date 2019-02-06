import {AnyAction} from "redux";
import * as types from '../types';
import {ICard} from "../models";

export const previewCard = (card: ICard): AnyAction => ({
    type: types.PREVIEW_CARD,
    payload: card
});