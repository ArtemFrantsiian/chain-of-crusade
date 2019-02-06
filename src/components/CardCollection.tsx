import * as React from 'react';
import { ICardCollection } from '../models/cardCollections';

interface CardCollectionProps extends ICardCollection {
	onSelect: () => void;
}

interface CardCollectionState {
	active: boolean;
}

export class CardCollection extends React.Component<CardCollectionProps, CardCollectionState>{
	public state = {
		active: false
	}

	private _select = () => {
		this.props.onSelect();
		this.setState( (state) => ({
			active: !state.active
		}))
	}

	public render(): React.ReactNode {
		const { active } = this.state;
		const { image, name, available } = this.props;
		return (
			<React.Fragment>
				<div style={{
					width: 'calc(50% - 2px)',
					height: 'calc(50% - 2px)',
					padding: 0,
					margin: 0,
					display: 'flex',
					justifyContent: 'center',
					flexDirection: 'column',
					alignItems: 'center',
					border: '1px solid black',
					cursor: available && 'pointer',
					background: available && active && 'rgba(0,0,0,0.5)'
				}} onClick={this._select}>
					<div style={{
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
						<img src={image} alt="card" style={{
							position: 'absolute',
							width: '80px',
						}}/>
						{available && (<img alt="card" src={image} style={{
							width: '80px',
							position: 'absolute',
							transform: 'translate(5px, -5px)'
						}}/>)}
					</div>
					<p style={{
						display: 'flex',
						justifySelf: 'flex-end'
					}}>{name}</p>
				</div>
			</React.Fragment>
		)
	}
}
