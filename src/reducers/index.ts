import { combineReducers } from "redux";

import step from "./step";
import preview from "./preview";
import players from "./players";
import effect from "./effects";
import attack from "./attack";
import modal from "./modal";

export default combineReducers({
    step,
    preview,
    players,
    effect,
    attack,
    modal,
})