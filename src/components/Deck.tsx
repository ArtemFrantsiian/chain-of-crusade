import * as React from 'react';
import * as PIXI from "pixi.js";
import { Container, Sprite, Text } from '@inlet/react-pixi';

import Card from './Card';
import {EDeckPurpose, EOwner, IOwnerProps} from '../models';
import * as armIco from '../assets/icons/couter_card_ico.png';
import * as hangupIco from '../assets/icons/couter_ret_ico.png';

const style = new PIXI.TextStyle({
    fontFamily: "HolyChainFont",
    fill: "#DAD49E",
    fontSize: 40,
});

export interface IDeckProps extends IOwnerProps {
    count: number
    deck: EDeckPurpose
}

const Deck = ({ count, deck, owner }: IDeckProps) => {
    let image: string;
    let xIco: number;
    let x: number;
    let y: number;
    if (owner === EOwner.I) {
        y = 1160;
    } else {
        y = 50;
    }
    if (deck === EDeckPurpose.ARM) {
        x = 2100;
        image = armIco;
        xIco = -50;
    } else {
        x = 2300;
        image = hangupIco;
        xIco = 183;
    }
    return (
        <Container x={x} y={y}>
            {count >= 1 && (
                <Card key="firstInDeck" />
            )}
            {count > 1 && (
                <Card key="secondInDeck" x={10} y={-10}/>
            )}
            <Sprite image={image} x={xIco} y={70} />
            <Text
                text={count.toString()}
                x={xIco + 15}
                y={130}
                anchor={[0.5, 0.5]}
                style={style}
            />
        </Container>
    );
};

export default Deck