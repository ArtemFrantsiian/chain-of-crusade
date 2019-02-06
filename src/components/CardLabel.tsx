import * as React from 'react';
import { Sprite, Text } from '@inlet/react-pixi';

import * as healthImage from '../assets/cards/big/slot_hp.png';
import * as forceImage from '../assets/cards/big/slot_p.png';
import {ECardProperties, ECardSize, IPositionProps} from '../models';

const forceStyle = new PIXI.TextStyle({
    fontFamily: 'HolyChainFont',
    fill: '#B0DAB1',
    fontSize: 54,
});

const healthStyle = new PIXI.TextStyle({
    fontFamily: 'HolyChainFont',
    fill: '#FFF7B1',
    fontSize: 54,
});

export interface ICardLabelProps extends IPositionProps {
    properties: ECardProperties;
    text: string | number;
    cardSize?: ECardSize;
}

const CardLabel = ({ properties, text, y, x, cardSize = ECardSize.FULL }: ICardLabelProps) => {
    let image = forceImage;
    let style = forceStyle;
    let width = 70;
    let height = 70;

    if (cardSize === ECardSize.MIN) {
        width = 35;
        height = 35;
    }

    if (properties === ECardProperties.HEALTH) {
        image = healthImage;
        style = healthStyle;
        if (x) {
            x = x - Math.round(width / 2);
        }
    }

    return (
        <Sprite image={image} x={x} y={y || 0} width={width} height={height}>
            <Text
                text={text.toString()}
                style={style}
                x={48}
                y={45}
                anchor={[0.5, 0.5]}
            />
        </Sprite>
    )
};

export default CardLabel;