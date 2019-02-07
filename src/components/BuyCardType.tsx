import * as React from 'react';
import * as coin from '../assets/icons/coins.png'

interface IBuyCardTypeProps {
	onBuy: () => void;
	price: number;
	error: string;
	disabled: boolean;
}

export class BuyCardType extends React.Component<IBuyCardTypeProps> {
	public render(): React.ReactNode {
		const {price, error, disabled} = this.props;
		return (
			<React.Fragment>
				<div style={{
					background: 'beige',
					width: '100%',
					height: '30px',
					border: '1px solid black',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '0 20px',
					borderBottomLeftRadius: '10px',
					borderBottomRightRadius: '10px'
				}}>
					<div>
						<span>PRICE: {price}</span>
						<img style={{padding: '0 4px'}} src={coin} alt="coins" />
					</div>
					<p style={{color: 'red'}}>{error}</p>
					<button style={{
						background: disabled ? 'gray' : 'green',
						color: '#fff',
						outline: 'none',
						border: 'none',
						fontWeight: 'bold',
						cursor: 'pointer'
					}} onClick={this.props.onBuy} disabled={disabled}>BUY</button>
				</div>
			</React.Fragment>
		)
	}
}
