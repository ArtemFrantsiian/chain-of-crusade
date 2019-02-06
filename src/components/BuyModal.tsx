import * as React from 'react';
import {connect} from 'react-redux';
import { BuyCardType } from './BuyCardType';
import { CardCollection } from './CardCollection';
import { Church, Unavailable } from '../models/cardCollections';
import { addCards } from '../actions/buy';
import * as spinner from '../assets/icons/spinner.svg'

const state = [Church, Unavailable, Unavailable, Unavailable];

export interface IBuyModalProps {
	addCards: () => (dispatch: any) => Promise<void>;
	onBuy: () => void;
}

export interface IBuyModalState {
	loading: boolean;
	selected: boolean;
	selectedPrice: number;
}

class BuyModal extends React.Component<IBuyModalProps, IBuyModalState> {

	public state = {
		loading: false,
		selected: false,
		selectedPrice: 0
	}

	private _onSelect = () => {
		this.setState(state => ({
			selected: !state.selected,
		}))
	}

	private _payForCurds = async () => {
		this.setState({
			loading: true
		})
		await this.props.addCards();
		this.props.onBuy();
	}

	public render(): React.ReactNode {
		const { loading, selected } = this.state;
		return (
			<React.Fragment>
				<div className="buy-modal" style={{
					width: '400px',
					height: '400px',
					left: 'calc(50% - 200px)',
					top: 'calc(50% - 200px)',
					borderTopLeftRadius: '10px',
					borderTopRightRadius: '10px',
					position: 'absolute',
					background: 'beige',
					userSelect: 'none',
					display: 'flex',
					flexWrap: 'wrap'
				}}>
					{
						!loading
							? state.map((value, index) => {
								const { available, image, name } = value;
								return (
									<CardCollection key={index}
									                onSelect={this._onSelect}
													available={available}
								                    image={image}
								                    name={name}
									/>
								)
							})
							: (<img src={spinner} alt="spinner" style={{
								width: '100%',
								height: '100%'
							}}/>)
					}
					<BuyCardType disabled={!selected} price={selected ? 20 : 0} onBuy={this._payForCurds}/>
				</div>
			</React.Fragment>
		)
	}
}

export default connect(null, { addCards })(BuyModal)
