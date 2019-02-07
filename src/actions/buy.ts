import * as types from '../types';
// import {
// 	taote,
// 	necessarySacrifice,
// 	weakness,
// 	ronin,
// 	herbalRemedies,
// } from "../models/cards";
// import { buyCard } from '../chain/buy';

export const addCards = () => async (dispatch: any) => {
	try {
		dispatch({
			type: types.ADD_CARDS
		});
		// await buyCard(taote.erc721id);
		// await buyCard(necessarySacrifice.erc721id);
		// await buyCard(weakness.erc721id);
		// await buyCard(ronin.erc721id);
		// await buyCard(herbalRemedies.erc721id);
	} catch (e) {
		throw new Error(e);
	}
};
