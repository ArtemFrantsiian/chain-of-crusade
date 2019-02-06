import * as React from 'react';
import {Container, Sprite, Text} from '@inlet/react-pixi';

import * as progressBar from '../assets/player/progressbar.png';
import * as levelSlot from '../assets/player/slot_level.png';
import * as progressSlot from '../assets/player/progressbar_fill.png';
import {EOwner, IOwnerProps, IPlayer} from "../models";
import * as PIXI from "pixi.js";

export interface IAvatarProps extends IOwnerProps {
    player: IPlayer;
}

const Avatar = ({ owner, player }: IAvatarProps) => {
    const progress: JSX.Element[] = [];
    const fullProgress = 300;
    const progressBarWidth = 326;
    if (player.progress > 0) {
        const width = progressBarWidth / fullProgress;
        for (let i = 1, x = 0; i <= player.progress; i++, x += width) {
            progress.push(
                <Sprite
                    image={progressSlot}
                    width={width}
                    x={x}
                    y={2}
                />
            );
        }
    }
    return (
        <Container
            x={30}
            y={owner === EOwner.I ? 1250 : 50}
        >
            <Sprite image={player.avatar} />
            <Sprite
                image={progressBar}
                width={progressBarWidth}
                x={110}
                y={90}
            >
                {progress}
                <Text
                    width={50}
                    anchor={[0.5, 0]}
                    x={progressBarWidth / 2}
                    y={3}
                    style={new PIXI.TextStyle({
                        fill: '#ffffff',
                    })}
                    text={`${player.progress}/${fullProgress}`}
                />
            </Sprite>
            <Text
                x={200}
                y={20}
                text={player.name}
                style={new PIXI.TextStyle({
                    fill: '#ffffff',
                    fontSize: 48
                })}
            />
            <Sprite
                image={levelSlot}
                x={90}
                y={80}
            >
                <Text
                    text={player.level.toString()}
                    x={27}
                    y={27}
                    anchor={[0.5, 0.5]}
                    style={new PIXI.TextStyle({
                        fill: '#ffffff'
                    })}
                />
            </Sprite>
        </Container>
    );
};

export default Avatar;