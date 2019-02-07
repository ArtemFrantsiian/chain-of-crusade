import * as card from '../assets/cards/big/r.png';
import * as lock from '../assets/icons/padlock.png';

export interface ICardCollection {
	name?: string,
	available?: boolean,
	cardsNumber?: number,
	image?: string
}

export const Church: ICardCollection = {
	name: 'Church',
	available: true,
	cardsNumber: 5,
	image: card
}

export const Unavailable: ICardCollection = {
	name: 'Unavailable',
	available: false,
	cardsNumber: 0,
	image: lock
}
