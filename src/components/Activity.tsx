import * as React from 'react';
import { Container, Text } from '@inlet/react-pixi';
import {EOwner, IOwnerProps} from "../models";

const style = {
    count: new PIXI.TextStyle({
        fontFamily: 'HolyChainFont',
        fill: '#FFF7B1',
        fontSize: 54,
    }),
    text: new PIXI.TextStyle({
        fontFamily: 'HolyChainFont',
        fill: '#292F30',
        fontSize: 54,
    }),
};

export interface IActivityProps extends IOwnerProps {
    count: number;
}

const Activity = ({ count, owner }: IActivityProps) => {
    let y: number;
    if (owner === EOwner.I) {
        y = 1190;
    } else {
        y = 200;
    }
    return (
        <Container
            x={180}
            y={y}
        >
            <Text
                text="Activity"
                anchor={[1, 0]}
                x={240}
                style={style.text}
            />
            <Text
                text={count.toString()}
                style={style.count}
                x={255}
            />
        </Container>
    );
};

export default Activity