export interface ISize {
    full: string;
    min: string;
}

export enum ECardLabel {
    EAST = "East", // "Восток",
    CONJURATION = "Conjuration", // "Заклинание",
    HERETICS = "Heretics", // "Еретики",
}

export interface ICard {
    id: number | string;
    image: ISize;
    name: ITranslate;
    description: ITranslate;
    label: ECardLabel;
    isActive?: boolean;
    force?: number;
    health?: number;
    canTurn?: boolean;
}

export enum ECardPlace {
    TABLE,
    HAND,
    PREVIEW
}

export enum ECardProperties {
    HEALTH,
    FORCE,
    ENERGY,
}

export enum EOwner {
    I,
    Enemy
}

export interface IPositionProps {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}

export interface IOwnerProps {
    owner: EOwner;
}

export enum EDeckPurpose {
    HANGUP,
    ARM
}

export enum ECardSize {
    FULL,
    MIN
}

export interface ITranslate {
    en: string
    ru: string
}

export interface IEnergy {
    full: number;
    count: number;
}

export interface IPlayer {
    avatar: string;
    level: number;
    name: string;
    progress: number;
    arm: ICard[];
    hangUp: ICard[];
    pocket: ICard[];
    table: ICard[];
    health: number;
    activity: number;
    energy: IEnergy;
}

export interface IPlayers {
    [EOwner.Enemy]: IPlayer;
    [EOwner.I]: IPlayer;
}

export interface IAttack {
    x: number
    y: number
}

export interface IStore {
    players: IPlayers;
    step: EOwner;
    preview: ICard;
    effect: IEffect | string;
    attack: IAttack | string;
    modal: IModal | string;
}

export interface IModal {
    address: string
    amount: number
}

export interface IEffect {
    name: string
    color?: number
}