import {Action} from "redux";
import * as types from '../types';

export const toogleStep = (): Action<types.TOOGLE_STEP> => ({
    type: types.TOOGLE_STEP
});