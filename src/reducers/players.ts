import { ICard } from './../models/index';
import { AnyAction } from "redux";
import { EOwner, IPlayers } from "../models";

import * as klement from '../assets/player/klement.png';
import * as sibori from '../assets/player/sibori.png';

import {
    taote,
    necessarySacrifice,
    weakness,
    ronin,
    herbalRemedies,
    boomSound,
    peddler,
    raiseFromTheDead,
    theEnemyOfFaith,
    apostate,
    yamabusi,
    yerisiarh,
    mistress,
    wrathOfHeaven,
    instructorLesson,
    guanDi,
    refinement,
    kumiho,
} from "../models/cards";

import * as types from "../types";

const initialState: IPlayers = {
    [EOwner.I]: {
        avatar: sibori,
        level: 1,
        name: "Sibori",
        progress: 150,
        energy: {
            count: 1,
            full: 1,
        },
        activity: 1,
        health: 20,
        pocket: [
            taote,
            necessarySacrifice,
            weakness,
            ronin,
            herbalRemedies,
            yamabusi,
            mistress,
            boomSound,
            guanDi,
            kumiho,
            { ...yerisiarh, id: 7 },
            { ...yerisiarh, id: 8 },
            { ...yerisiarh, id: 12 },
            { ...yerisiarh, id: 13 },
            { ...yerisiarh, id: 14 },
            { ...yerisiarh, id: 15 },
            { ...yerisiarh, id: 16 },
            { ...yerisiarh, id: 17 },
            { ...yerisiarh, id: 18 },
            { ...yerisiarh, id: 19 },
        ],
        arm: [],
        hangUp: [],
        table: []
    },
    [EOwner.Enemy]: {
        avatar: klement,
        level: 1,
        name: "Klement",
        progress: 150,
        energy: {
            count: 1,
            full: 1,
        },
        activity: 1,
        health: 20,
        pocket: [
            yerisiarh,
            wrathOfHeaven,
            instructorLesson,
            refinement,
            { ...yerisiarh, id: 6 },
            { ...yerisiarh, id: 7 },
            { ...yerisiarh, id: 8 },
            { ...yerisiarh, id: 12 },
            { ...yerisiarh, id: 13 },
            { ...yerisiarh, id: 14 },
            { ...yerisiarh, id: 15 },
            { ...yerisiarh, id: 16 },
            { ...yerisiarh, id: 17 },
            { ...yerisiarh, id: 18 },
            { ...yerisiarh, id: 19 },
        ],
        arm: [
            boomSound,
            peddler,
            raiseFromTheDead,
            theEnemyOfFaith,
            apostate,
        ],
        hangUp: [],
        table: []
    }
};

const nonCanTurnCards = (state = initialState) => {
    for (const card of state[EOwner.I].table) {
        card.canTurn = false;
    }
}

const addCardsOnBuy = (state = initialState) => {
    state[EOwner.I].arm = state[EOwner.I].pocket.slice(0, 5);
    state[EOwner.I].pocket = state[EOwner.I].pocket.slice(5);
    return {
        ...state
    }
}

const toggleCanTurn = (state = initialState, energy: number): void => {
    nonCanTurnCards(state);
    state[EOwner.I].arm = state[EOwner.I].arm.map((item: ICard) => ({
        ...item,
        canTurn: item.force <= energy
    }))
}

const startNewStep = (state = initialState, owner: EOwner, card: string | number, activity: number) => {
    state[owner].table = state[owner].table.map(item => ({
        ...item,
        isActive: item.isActive || !item.isActive
    }));
    state[owner].arm.push(state[owner].pocket.filter(item => item.id === card)[0]);
    state[owner].pocket = state[owner].pocket.filter(item => item.id !== card);
    state[owner].energy.count = activity;
    state[owner].energy.full = activity;
    state[owner].activity = activity;
    if (owner === EOwner.I) {
        toggleCanTurn(state, activity);
    }
    return {
        ...state
    }
};

const toHangUp = (state = initialState, owner: EOwner, cardName: string) => {
    const card = state[owner].table.filter(item => item.id === cardName)[0];
    if (card.isActive) {
        card.isActive = !card.isActive;
    }
    state[owner].hangUp.push(card);
    state[owner].table = state[owner].table.filter(item => item.id !== cardName);
};


const handleStepOne = (state = initialState) => {
    state[EOwner.I].table.push(state[EOwner.I].arm.filter(item => item.id === 'taote')[0]);
    state[EOwner.I].arm = state[EOwner.I].arm.filter(item => item.id !== 'taote');
    state[EOwner.I].energy.count = 0;
    toggleCanTurn(state, state[EOwner.I].energy.count);
    return {
        ...state
    };
};

const handleStepTwo = (state = initialState) => {
    state[EOwner.Enemy].table.push(state[EOwner.Enemy].arm.filter(item => item.id === 'boomSound')[0]);
    state[EOwner.Enemy].arm = state[EOwner.Enemy].arm.filter(item => item.id !== 'boomSound');
    state[EOwner.Enemy].energy.count = 0;
    return {
        ...state
    };
};

const handleStepThree = (state = initialState) => {
    toHangUp(state, EOwner.Enemy, 'boomSound');
    state[EOwner.Enemy].energy.count = 3;
    state[EOwner.Enemy].energy.full = 3;
    return {
        ...state
    };
};

const handleStepFour = (state = initialState) => {
    state[EOwner.Enemy].table.push(state[EOwner.Enemy].arm.filter(item => item.id === 'peddler')[0]);
    state[EOwner.Enemy].arm = state[EOwner.Enemy].arm.filter(item => item.id !== 'peddler');
    state[EOwner.Enemy].energy.count = 0;
    return {
        ...state
    };
};

const handleStepFive = (state = initialState) => startNewStep(state, EOwner.I, 'yamabusi', 2);

const handleStepSix = (state = initialState) => startNewStep(state, EOwner.Enemy, 'yerisiarh', 2);

const handleStepSeven = (state = initialState) => {
    state[EOwner.I].table.push(state[EOwner.I].arm.filter(item => item.id === 'herbalRemedies')[0]);
    state[EOwner.I].arm = state[EOwner.I].arm.filter(item => item.id !== 'herbalRemedies');
    const taoteIndex = state[EOwner.I].table.findIndex(item => item.id === 'taote');
    state[EOwner.I].table[taoteIndex] = {
        ...state[EOwner.I].table[taoteIndex],
        health: 2
    };
    state[EOwner.I].energy.count = 0;
    toggleCanTurn(state, state[EOwner.I].energy.count);
    return {
        ...state
    };
};

const handleStepEight = (state = initialState) => {
    toHangUp(state, EOwner.I, 'herbalRemedies');
    return {
        ...state
    };
};

const handleStepNine = (state = initialState) => {
    state[EOwner.I].health -= 3;
    return {
        ...state
    };
};

const handleStepTen = (state = initialState) => startNewStep(state, EOwner.I, 'mistress', 3);

const handleStepEleven = (state = initialState) => startNewStep(state, EOwner.Enemy, 'wrathOfHeaven', 3);

const handleStepTwelve = (state = initialState) => {
    state[EOwner.I].table.push({
        ...state[EOwner.I].arm.filter(item => item.id === 'ronin')[0],
        health: 4,
    });
    state[EOwner.I].arm = state[EOwner.I].arm.filter(item => item.id !== 'ronin');
    state[EOwner.I].energy.count = 0;
    toggleCanTurn(state, state[EOwner.I].energy.count);
    return {
        ...state
    };
};

const handleStepThirteen = (state = initialState) => {
    state[EOwner.Enemy].health -= 1;
    return {
        ...state
    };
};

const handleStepFourteen = (state = initialState) => {
    state[EOwner.Enemy].table.push(state[EOwner.Enemy].arm.filter(item => item.id === 'wrathOfHeaven')[0]);
    state[EOwner.Enemy].arm = state[EOwner.Enemy].arm.filter(item => item.id !== 'wrathOfHeaven');
    state[EOwner.Enemy].energy.count = 0;
    return {
        ...state
    };
};

const handleStepFifteen = (state = initialState) => {
    const roninIndex = state[EOwner.I].table.findIndex(item => item.id === 'ronin');
    state[EOwner.I].table[roninIndex] = {
        ...state[EOwner.I].table[roninIndex],
        health: 1
    };
    toHangUp(state, EOwner.Enemy, 'wrathOfHeaven');
    return {
        ...state
    };
};

const handleStepSixteen = (state = initialState) => {
    state[EOwner.I].health -= 3;
    return {
        ...state
    };
};

const handleStepSeventeen = (state = initialState) => startNewStep(state, EOwner.I, 'boomSound', 4);

const handleStepEighteen = (state = initialState) => startNewStep(state, EOwner.Enemy, 'instructorLesson', 4);

const handleStepNineteen = (state = initialState) => {
    const roninIndex = state[EOwner.I].table.findIndex(item => item.id === 'ronin');
    state[EOwner.I].table[roninIndex] = {
        ...state[EOwner.I].table[roninIndex],
        health: 4
    };
    state[EOwner.I].table.push(state[EOwner.I].arm.filter(item => item.id === 'boomSound')[0]);
    state[EOwner.I].arm = state[EOwner.I].arm.filter(item => item.id !== 'boomSound');
    state[EOwner.I].energy = {
        count: 3,
        full: 4,
    };
    toggleCanTurn(state, state[EOwner.I].energy.count);
    return {
        ...state
    };
};

const handleStepTwenty = (state = initialState) => {
    toHangUp(state, EOwner.I, 'boomSound');
    state[EOwner.I].energy = {
        count: 6,
        full: 6,
    };
    toggleCanTurn(state, state[EOwner.I].energy.count);
    return {
        ...state
    };
};

const handleStepTwentyOne = (state = initialState) => {
    state[EOwner.I].table.push({
        ...state[EOwner.I].arm.filter(item => item.id === 'yamabusi')[0],
        health: 7
    });
    state[EOwner.I].arm = state[EOwner.I].arm.filter(item => item.id !== 'yamabusi');
    state[EOwner.I].energy = {
        count: 0,
        full: 6,
    };
    toggleCanTurn(state, state[EOwner.I].energy.count);
    return {
        ...state
    };
};

const handleStepTwentyTwo = (state = initialState) => {
    state[EOwner.Enemy].health -= 1;
    return {
        ...state
    };
};

const handleStepTwentyThree = (state = initialState) => {
    state[EOwner.Enemy].health -= 3;
    return {
        ...state
    };
};

const handleStepTwentyFour = (state = initialState) => {
    state[EOwner.Enemy].table.push(state[EOwner.Enemy].arm.filter(item => item.id === 'apostate')[0]);
    state[EOwner.Enemy].arm = state[EOwner.Enemy].arm.filter(item => item.id !== 'apostate');
    state[EOwner.Enemy].energy = {
        count: 0,
        full: 4,
    };
    toggleCanTurn(state, state[EOwner.I].energy.count);
    return {
        ...state
    };
};

const handleStepTwentyFive = (state = initialState) => {
    const yamabusiIndex = state[EOwner.I].table.findIndex(item => item.id === 'yamabusi');
    state[EOwner.I].table[yamabusiIndex] = {
        ...state[EOwner.I].table[yamabusiIndex],
        health: 4
    };
    toggleCanTurn(state, state[EOwner.I].energy.count);
    return {
        ...state
    };
};

const handleStepTwentySix = (state = initialState) => {
    const peddlerIndex = state[EOwner.Enemy].table.findIndex(item => item.id === 'peddler');
    state[EOwner.Enemy].table[peddlerIndex] = {
        ...state[EOwner.Enemy].table[peddlerIndex],
        health: 0
    };
    return {
        ...state
    };
};

const handleStepTwentySeven = (state = initialState) => {
    toHangUp(state, EOwner.Enemy, 'peddler');
    return {
        ...state
    };
};

const handleStepTwentyEight = (state = initialState) => {
    const yamabusiIndex = state[EOwner.I].table.findIndex(item => item.id === 'yamabusi');
    state[EOwner.I].table[yamabusiIndex] = {
        ...state[EOwner.I].table[yamabusiIndex],
        health: 7
    };
    return startNewStep(state, EOwner.I, 'guanDi', 5);
};

const handleStepTwentyNine = (state = initialState) => startNewStep(state, EOwner.Enemy, 'refinement', 5);

const handleStepThirty = (state = initialState) => {
    state[EOwner.I].table.push(state[EOwner.I].arm.filter(item => item.id === 'necessarySacrifice')[0]);
    state[EOwner.I].arm = state[EOwner.I].arm.filter(item => item.id !== 'necessarySacrifice');
    state[EOwner.I].energy = {
        count: 0,
        full: 5,
    };
    toggleCanTurn(state, state[EOwner.I].energy.count);
    return {
        ...state
    };
};

const handleStepThirtyOne = (state = initialState) => {
    toHangUp(state, EOwner.I, 'yamabusi');
    toHangUp(state, EOwner.I, 'necessarySacrifice');
    state[EOwner.Enemy].health -= 11;
    return {
        ...state
    };
};

const handleStepThirtyTwo = (state = initialState) => {
    state[EOwner.Enemy].health -= 1;
    return {
        ...state
    };
};

const handleStepThirtyThree = (state = initialState) => {
    const apostateIndex = state[EOwner.Enemy].table.findIndex(item => item.id === 'apostate');
    state[EOwner.Enemy].table[apostateIndex] = {
        ...state[EOwner.Enemy].table[apostateIndex],
        health: 1
    };
    return {
        ...state
    };
};

const handleStepThirtyFour = (state = initialState) => {
    const roninIndex = state[EOwner.I].table.findIndex(item => item.id === 'ronin');
    state[EOwner.I].table[roninIndex] = {
        ...state[EOwner.I].table[roninIndex],
        health: 0
    };
    return {
        ...state
    };
};

const handleStepThirtyFive = (state = initialState) => {
    toHangUp(state, EOwner.I, 'ronin');
    return {
        ...state
    };
};

const handleStepThirtySix = (state = initialState) => {
    state[EOwner.Enemy].table.push(state[EOwner.Enemy].arm.filter(item => item.id === 'raiseFromTheDead')[0]);
    state[EOwner.Enemy].arm = state[EOwner.Enemy].arm.filter(item => item.id !== 'raiseFromTheDead');
    state[EOwner.Enemy].energy.count -= 4;
    return {
        ...state
    };
};

const handleStepThirtySeven = (state = initialState) => {
    toHangUp(state, EOwner.Enemy, 'raiseFromTheDead');
    state[EOwner.Enemy].table.push({
        ...state[EOwner.Enemy].hangUp.filter(item => item.id === 'peddler')[0],
        health: 3
    });
    state[EOwner.Enemy].hangUp = state[EOwner.Enemy].hangUp.filter(item => item.id !== 'peddler');
    return {
        ...state
    };
};

const handleStepThirtyEight = (state = initialState) => {
    state[EOwner.I].health -= 4;
    return {
        ...state
    };
};

const handleStepThirtyNine = (state = initialState) => startNewStep(state, EOwner.I, 'kumiho', 6);

const handleStepFourty = (state = initialState) => {
    const apostateIndex = state[EOwner.Enemy].table.findIndex(item => item.id === 'apostate');
    state[EOwner.Enemy].table[apostateIndex] = {
        ...state[EOwner.Enemy].table[apostateIndex],
        health: 4
    };
    return startNewStep(state, EOwner.Enemy, 18, 6);
};

const handleStepFourtyOne = (state = initialState) => {
    state[EOwner.I].table.push({
        ...state[EOwner.I].arm.filter(item => item.id === 'kumiho')[0],
        health: 6
    });
    state[EOwner.I].arm = state[EOwner.I].arm.filter(item => item.id !== 'kumiho');
    state[EOwner.I].energy.count -= 5;
    toggleCanTurn(state, state[EOwner.I].energy.count);
    return {
        ...state
    }
};

const handleStepFourtyTwo = (state = initialState) => {
    const kumihoIndex = state[EOwner.I].table.findIndex(item => item.id === 'kumiho');
    state[EOwner.I].table[kumihoIndex] = {
        ...state[EOwner.I].table[kumihoIndex],
        isActive: true
    };
    return {
        ...state
    }
};

const handleStepFourtyThree = (state = initialState) => {
    state[EOwner.Enemy].health -= 1;
    return {
        ...state
    };
};

const handleStepFourtyFour = (state = initialState) => {
    state[EOwner.Enemy].health = 0;
    return {
        ...state
    };
};

const handlers = {
    [types.ADD_CARDS]: addCardsOnBuy,
    [types.STEP_ONE]: handleStepOne,
    [types.STEP_TWO]: handleStepTwo,
    [types.STEP_THREE]: handleStepThree,
    [types.STEP_FOUR]: handleStepFour,
    [types.STEP_FIVE]: handleStepFive,
    [types.STEP_SIX]: handleStepSix,
    [types.STEP_SEVEN]: handleStepSeven,
    [types.STEP_EIGHT]: handleStepEight,
    [types.STEP_NINE]: handleStepNine,
    [types.STEP_TEN]: handleStepTen,
    [types.STEP_ELEVEN]: handleStepEleven,
    [types.STEP_TWELVE]: handleStepTwelve,
    [types.STEP_THIRTEEN]: handleStepThirteen,
    [types.STEP_FOURTEEN]: handleStepFourteen,
    [types.STEP_FIFTEEN]: handleStepFifteen,
    [types.STEP_SIXTEEN]: handleStepSixteen,
    [types.STEP_SEVENTEEN]: handleStepSeventeen,
    [types.STEP_EIGHTEEN]: handleStepEighteen,
    [types.STEP_NINETEEN]: handleStepNineteen,
    [types.STEP_TWENTY]: handleStepTwenty,
    [types.STEP_TWENTY_ONE]: handleStepTwentyOne,
    [types.STEP_TWENTY_TWO]: handleStepTwentyTwo,
    [types.STEP_TWENTY_THREE]: handleStepTwentyThree,
    [types.STEP_TWENTY_FOUR]: handleStepTwentyFour,
    [types.STEP_TWENTY_FIVE]: handleStepTwentyFive,
    [types.STEP_TWENTY_SIX]: handleStepTwentySix,
    [types.STEP_TWENTY_SEVEN]: handleStepTwentySeven,
    [types.STEP_TWENTY_EIGHT]: handleStepTwentyEight,
    [types.STEP_TWENTY_NINE]: handleStepTwentyNine,
    [types.STEP_THIRTY]: handleStepThirty,
    [types.STEP_THIRTY_ONE]: handleStepThirtyOne,
    [types.STEP_THIRTY_TWO]: handleStepThirtyTwo,
    [types.STEP_THIRTY_THREE]: handleStepThirtyThree,
    [types.STEP_THIRTY_FOUR]: handleStepThirtyFour,
    [types.STEP_THIRTY_FIVE]: handleStepThirtyFive,
    [types.STEP_THIRTY_SIX]: handleStepThirtySix,
    [types.STEP_THIRTY_SEVEN]: handleStepThirtySeven,
    [types.STEP_THIRTY_EIGHT]: handleStepThirtyEight,
    [types.STEP_THIRTY_NINE]: handleStepThirtyNine,
    [types.STEP_FOURTY]: handleStepFourty,
    [types.STEP_FOURTY_ONE]: handleStepFourtyOne,
    [types.STEP_FOURTY_TWO]: handleStepFourtyTwo,
    [types.STEP_FOURTY_THREE]: handleStepFourtyThree,
    [types.STEP_FOURTY_FOUR]: handleStepFourtyFour,
};

export default (state = initialState, action: AnyAction) => {
    const handler = handlers[action.type];
    return handler ? handler(state) : state;
};
