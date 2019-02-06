import * as React from 'react'
import { Sprite, Text } from '@inlet/react-pixi'
import playButton from '../assets/button_play.png'

const style = new PIXI.TextStyle({
	fontFamily: 'HolyChainFont',
	fontSize: 56,
	fill: '#64F579'
});

interface IBuyButtonProps {
	buyCards: () => void;
}

export class BuyButton extends React.Component<IBuyButtonProps, any>  {
	public render(): React.ReactNode {
		const baseTexture = PIXI.BaseTexture.from(playButton);
		const texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle( 0, 0, 200, 104));

		return (
			<Sprite
				texture={texture}
				x={1920 / 2 + 200}
				y={980 / 2 + 104}
				interactive={true}
				pointerdown={this.props.buyCards}
				cursor="pointer"
			>
				<Text
					text="BUY"
					style={style}
					anchor={[0.5, 0.5]}
					x={100}
					y={50}
				/>
			</Sprite>
		)
	}
}
