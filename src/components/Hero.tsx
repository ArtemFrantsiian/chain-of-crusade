import * as React from 'react';
import { Container, Sprite } from '@inlet/react-pixi';

import {ECardProperties, EOwner, IOwnerProps} from "../models";
import * as myHero from '../assets/hero/ava_bot.png'
import * as enemyHero from '../assets/hero/ava_top.png'
import CardLabel from "./CardLabel";

export interface IHeroProps extends IOwnerProps {
    health: number;
}

const Hero = ({ owner, health }: IHeroProps) => {
    let y: number;
    let yLabel: number;
    let image: string;
    if (owner === EOwner.I) {
        y = 1007;
        image = myHero;
        yLabel = 110;
    } else {
        y = 227;
        image = enemyHero;
        yLabel = 25;
    }
    return (
        <Container
            x={1190}
            y={y}
        >
            <Sprite image={image}/>
            <CardLabel
                properties={ECardProperties.HEALTH}
                text={health}
                x={190}
                y={yLabel} />
        </Container>
    )
};

export default Hero