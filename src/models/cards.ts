import { generatePseudoRandomSalt } from "0x.js";

import * as taoteFull from '../assets/cards/big/image/4.png';
import * as taoteMin from '../assets/cards/min/image/4.png';
import * as necessarySacrificeFull from '../assets/cards/big/image/15.png';
import * as necessarySacrificeMin from '../assets/cards/min/image/15.png';
import * as weaknessFull from '../assets/cards/big/image/16.png';
import * as weaknessMin from '../assets/cards/min/image/16.png';
import * as roninFull from '../assets/cards/big/image/2.png';
import * as roninMin from '../assets/cards/min/image/2.png';
import * as herbalRemediesFull from '../assets/cards/big/image/14.png';
import * as herbalRemediesMin from '../assets/cards/min/image/14.png';
import * as boomSoundFull from '../assets/cards/big/image/11.png';
import * as boomSoundMin from '../assets/cards/min/image/11.png';
import * as peddlerFull from '../assets/cards/big/image/18.png';
import * as peddlerMin from '../assets/cards/min/image/18.png';
import * as raiseFromTheDeadFull from '../assets/cards/big/image/13.png';
import * as raiseFromTheDeadMin from '../assets/cards/min/image/13.png';
import * as theEnemyOfFaithFull from '../assets/cards/big/image/7.png';
import * as theEnemyOfFaithMin from '../assets/cards/min/image/7.png';
import * as apostateFull from '../assets/cards/big/image/6.png';
import * as apostateMin from '../assets/cards/min/image/6.png';
import * as yamabusiFull from '../assets/cards/big/image/17.png';
import * as yamabusiMin from '../assets/cards/min/image/17.png';
import * as yerisiarhFull from '../assets/cards/big/image/1.png';
import * as yerisiarhMin from '../assets/cards/min/image/1.png';
import * as mistressFull from '../assets/cards/big/image/8.png';
import * as mistressMin from '../assets/cards/min/image/8.png';
import * as wrathOfHeavenFull from '../assets/cards/big/image/12.png';
import * as wrathOfHeavenMin from '../assets/cards/min/image/12.png';
import * as instructorLessonFull from '../assets/cards/big/image/10.png';
import * as instructorLessonMin from '../assets/cards/min/image/10.png';
import * as guanDiFull from '../assets/cards/big/image/3.png';
import * as guanDiMin from '../assets/cards/min/image/3.png';
import * as refinementFull from '../assets/cards/big/image/9.png';
import * as refinementMin from '../assets/cards/min/image/9.png';
import * as kumihoFull from '../assets/cards/big/image/5.png';
import * as kumihoMin from '../assets/cards/min/image/5.png';

import {ECardLabel} from "./index";

export const taote = {
    id: "taote",
    erc721id: generatePseudoRandomSalt(),
    image: {
        full: taoteFull,
        min: taoteMin,
    },
    name: {
        en: "Taote",
        ru: "Таоте"
    },
    label: ECardLabel.EAST,
    description: {
        en: "1 energy",
        ru: "1 енергии"
    },
    isActive: false,
    canTurn: true,
    force: 1,
    health: 1,
};

export const necessarySacrifice = {
    id: "necessarySacrifice",
    erc721id: generatePseudoRandomSalt(),
    image: {
        full: necessarySacrificeFull,
        min: necessarySacrificeMin,
    },
    name: {
        en: "Necessary sacrifice",
        ru: "Необходимая жертва"
    },
    label: ECardLabel.CONJURATION,
    description: {
        en: "5 energy. Donate creation, damage x1.5 from the health of the donated creation.",
        ru: "5 энергии. Пожертвовать создание, нанести урон x1.5 от здоровья пожертвованного создания",
    },
    force: 5,
    canTurn: false,
};

export const weakness = {
    id: "weakness",
    erc721id: generatePseudoRandomSalt(),
    image: {
        full: weaknessFull,
        min: weaknessMin,
    },
    name: {
        en: "Weakness",
        ru: "Слабость",
    },
    label: ECardLabel.CONJURATION,
    description: {
        en: "2 energy. The chosen opposing unit cannot attack this turn",
        ru: "2 энергии. Выбранный отряд соперника не может атаковать в этот ход",
    },
    force: 2,
    canTurn: false,
};

export const ronin = {
    id: "ronin",
    erc721id: generatePseudoRandomSalt(),
    image: {
        full: roninFull,
        min: roninMin,
    },
    name: {
        en: "Ronin",
        ru: "Ронин"
    },
    label: ECardLabel.EAST,
    description: {
        en: "3 energy",
        ru: "3 енергии"
    },
    isActive: false,
    force: 3,
    health: 3,
    canTurn: false,
};

export const herbalRemedies = {
    id: "herbalRemedies",
    erc721id: generatePseudoRandomSalt(),
    image: {
        full: herbalRemediesFull,
        min: herbalRemediesMin,
    },
    name: {
        en: "Herbal healing",
        ru: "Травяной сбор",
    },
    label: ECardLabel.CONJURATION,
    description: {
        en: "2 energy. Forever increases the health of all your troops by 1",
        ru: "2 энергии. Навсегда увеличивает здоровье всех ваших войск на 1"
    },
    force: 2,
    canTurn: false,
};

export const boomSound = {
    id: "boomSound",
    erc721id: generatePseudoRandomSalt(),
    image: {
        full: boomSoundFull,
        min: boomSoundMin,
    },
    name: {
        en: "Sound of horn",
        ru: "Звук горна"
    },
    label: ECardLabel.CONJURATION,
    description: {
        en: "1 energy. Brings 3 energy units.",
        ru: "1 энергии. Приносит 3 единицы энергии"
    },
    force: 1,
    canTurn: true,
};
export const peddler = {
    id: "peddler",
    erc721id: generatePseudoRandomSalt(),
    image: {
        full: peddlerFull,
        min: peddlerMin,
    },
    name: {
        en: "Plague host",
        ru: "Разносчик чумы"
    },
    label: ECardLabel.HERETICS,
    description: {
        en: "3 energy",
        ru: "3 энергии"
    },
    isActive: false,
    force: 3,
    health: 3,
    canTurn: false,
};


export const raiseFromTheDead = {
    id: "raiseFromTheDead",
    erc721id: generatePseudoRandomSalt(),
    image: {
        full: raiseFromTheDeadFull,
        min: raiseFromTheDeadMin,
    },
    name: {
        en: "Resurrection",
        ru: "Воскресить из мертвых"
    },
    label: ECardLabel.CONJURATION,
    description: {
        en: "4 energy. Selected card is returned from the back to the hand",
        ru: "4 энергии. Выбранная карта возвращается из отбоя обратно в руку",
    },
    force: 4,
    canTurn: false,
};

export const theEnemyOfFaith = {
    id: "theEnemyOfFaith",
    erc721id: generatePseudoRandomSalt(),
    image: {
        full: theEnemyOfFaithFull,
        min: theEnemyOfFaithMin,
    },
    name: {
        en: "Faith enemy",
        ru: "Враг веры"
    },
    label: ECardLabel.HERETICS,
    description: {
        en: "9 energy",
        ru: "9 енергии"
    },
    isActive: false,
    force: 9,
    health: 9,
    canTurn: false,
};

export const apostate = {
    id: "apostate",
    erc721id: generatePseudoRandomSalt(),
    image: {
        full: apostateFull,
        min: apostateMin,
    },
    name: {
        en: "Renegade",
        ru: "Отступник"
    },
    label: ECardLabel.HERETICS,
    description: {
        en: "4 energy",
        ru: "4 энергии"
    },
    isActive: false,
    force: 4,
    health: 4,
    canTurn: false,
};

export const yamabusi = {
    id: "yamabusi",
    erc721id: generatePseudoRandomSalt(),
    image: {
        full: yamabusiFull,
        min: yamabusiMin,
    },
    name: {
        en: "Yamabusi",
        ru: "Ямабуси"
    },
    label: ECardLabel.EAST,
    description: {
        en: "6 energy",
        ru: "6 энергии"
    },
    isActive: false,
    force: 6,
    health: 6,
    canTurn: false,
};

export const yerisiarh = {
    id: "yerisiarh",
    erc721id: generatePseudoRandomSalt(),
    image: {
        full: yerisiarhFull,
        min: yerisiarhMin,
    },
    name: {
        en: "Heresiarch",
        ru: "Ересиарх"
    },
    label: ECardLabel.HERETICS,
    description: {
        en: "10 energy",
        ru: "10 енергии"
    },
    isActive: false,
    force: 10,
    health: 10,
    canTurn: false,
};

export const mistress = {
    id: "mistress",
    erc721id: generatePseudoRandomSalt(),
    image: {
        full: mistressFull,
        min: mistressMin,
    },
    name: {
        en: "Tiger Mistress",
        ru: "Владычица"
    },
    label: ECardLabel.EAST,
    description: {
        en: "9 energy",
        ru: "9 енергии"
    },
    isActive: false,
    force: 9,
    health: 9,
    canTurn: false,
};

export const wrathOfHeaven = {
    id: "wrathOfHeaven",
    erc721id: generatePseudoRandomSalt(),
    image: {
        full: wrathOfHeavenFull,
        min: wrathOfHeavenMin,
    },
    name: {
        en: "Wrath of heaven",
        ru: "Гнев небес"
    },
    label: ECardLabel.CONJURATION,
    description: {
        en: "2 energy. Lightning strikes an opponent’s chosen squad, dealing 3 damage.",
        ru: "2 энергии. Молния поражает выбранный отряд соперника, нанося 3 единицы урона"
    },
    force: 2,
    canTurn: false,
};

export const instructorLesson = {
    id: "instructorLesson",
    erc721id: generatePseudoRandomSalt(),
    image: {
        full: instructorLessonFull,
        min: instructorLessonMin,
    },
    name: {
        en: "Trainer classes",
        ru: "Урок инструктора"
    },
    label: ECardLabel.CONJURATION,
    description: {
        en: "2 energy. Permanently increases the attack of all your troops by 1",
        ru: '2 энергии. Навсегда увеличивает атаку всех ваших войск на 1'
    },
    force: 2,
    canTurn: false,
};

export const guanDi = {
    id: "guanDi",
    erc721id: generatePseudoRandomSalt(),
    image: {
        full: guanDiFull,
        min: guanDiMin,
    },
    name: {
        en: "Guan Di",
        ru: "Гуань Ди"
    },
    label: ECardLabel.EAST,
    description: {
        en: "10 energy",
        ru: "10 энергии"
    },
    isActive: false,
    force: 10,
    health: 10,
    canTurn: false,
};

export const refinement = {
    id: "refinement",
    erc721id: generatePseudoRandomSalt(),
    image: {
        full: refinementFull,
        min: refinementMin,
    },
    name: {
        en: "Purging",
        ru: "Очищение"
    },
    label: ECardLabel.CONJURATION,
    description: {
        en: "2 energy. Remove all negative energies from the selected squad",
        ru: '2 энергии. Снять все негативные энергии с выбранного отряда'
    },
    force: 2,
    canTurn: false,
};

export const kumiho = {
    id: "kumiho",
    erc721id: generatePseudoRandomSalt(),
    image: {
        full: kumihoFull,
        min: kumihoMin,
    },
    name: {
        en: "Cumiho",
        ru: "Кумихо"
    },
    label: ECardLabel.EAST,
    description: {
        en: "5 energy. Tireless",
        ru: '5 энергии. Неутомимая'
    },
    isActive: false,
    force: 5,
    health: 5,
    canTurn: false,
};
