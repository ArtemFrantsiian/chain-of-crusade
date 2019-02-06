import * as React from 'react';
import { Container } from '@inlet/react-pixi';

import { EOwner, ICard, IOwnerProps } from "../models";
import Card from "./Card";

export interface IHandProps extends IOwnerProps {
    cards: ICard[]
}

const positions = [
    {
        containerX: 1200,
        cardsPosition: [{
            x: 0,
            y: 0,
            rotation: 0
        }]
    },
    {
        containerX: 1100,
        cardsPosition: [
            {
                x: 0,
                y: 7,
                rotation: -0.05
            },
            {
                x: 200,
                rotation: 0.05
            }
        ]
    },
    {
        containerX: 1000,
        cardsPosition: [
            {
                x: 0,
                y: 14,
                rotation: -0.1
            },
            {
                x: 200,
                rotation: 0
            },
            {
                x: 400,
                rotation: 0.1
            },
        ]
    },
    {
        containerX: 900,
        cardsPosition: [
            {
                x: 0,
                y: 21,
                rotation: -0.1
            },
            {
                x: 200,
                y: 7,
                rotation: -0.05
            },
            {
                x: 400,
                rotation: 0.05
            },
            {
                x: 600,
                y: 7,
                rotation: 0.1
            },
        ]
    },
    {
        containerX: 800,
        cardsPosition: [
            {
                x: 0,
                y: 21,
                rotation: -0.1
            },
            {
                x: 200,
                y: 7,
                rotation: -0.05
            },
            {
                x: 400,
                rotation: 0
            },
            {
                x: 600,
                y: 0,
                rotation: 0.05
            },
            {
                x: 800,
                y: 7,
                rotation: 0.1
            },
        ]
    },
    {
        containerX: 750,
        cardsPosition: [
            {
                x: 0,
                y: 50,
                rotation: -0.15
            },
            {
                x: 180,
                y: 21,
                rotation: -0.1
            },
            {
                x: 360,
                y: 7,
                rotation: -0.05
            },
            {
                x: 540,
                y: 0,
                rotation: 0.05
            },
            {
                x: 720,
                y: 7,
                rotation: 0.1
            },
            {
                x: 900,
                y: 28,
                rotation: 0.15
            },
        ]
    },
    {
        containerX: 650,
        cardsPosition: [
            {
                x: 0,
                y: 50,
                rotation: -0.15
            },
            {
                x: 180,
                y: 21,
                rotation: -0.1
            },
            {
                x: 360,
                y: 7,
                rotation: -0.05
            },
            {
                x: 540,
                rotation: 0
            },
            {
                x: 720,
                y: 0,
                rotation: 0.05
            },
            {
                x: 900,
                y: 7,
                rotation: 0.1
            },
            {
                x: 1080,
                y: 28,
                rotation: 0.15
            },
        ]
    },
    {
        containerX: 680,
        cardsPosition: [
            {
                x: 0,
                y: 70,
                rotation: -0.2
            },
            {
                x: 150,
                y: 42,
                rotation: -0.15
            },
            {
                x: 300,
                y: 21,
                rotation: -0.1
            },
            {
                x: 450,
                y: 7,
                rotation: -0.05
            },
            {
                x: 600,
                y: 0,
                rotation: 0.05
            },
            {
                x: 750,
                y: 7,
                rotation: 0.1
            },
            {
                x: 900,
                y: 21,
                rotation: 0.15
            },
            {
                x: 1050,
                y: 42,
                rotation: 0.2
            },
        ]
    },
];

const Hand = ({ owner, cards }: IHandProps) => {
    let children: JSX.Element[] = [];
    let containerX: number = 0;
    if (cards.length) {
        const { containerX: conX, cardsPosition } = positions[cards.length - 1];
        containerX = conX;
        children = cards.map((card, index) => {
            const { x, y, rotation } = cardsPosition[index];
            return (
                <Card
                    key={card.id}
                    card={owner === EOwner.I ? card : undefined}
                    x={x}
                    y={owner === EOwner.I ? y : y && -y}
                    rotation={owner === EOwner.I ? rotation : -rotation}
                />
            )
        })
    }
    return (
        <Container
            x={containerX}
            y={owner === EOwner.I ? 1190 : 0}
        >
            {children}
        </Container>
    )
}

export default Hand;