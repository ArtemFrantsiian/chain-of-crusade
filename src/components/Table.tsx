import * as React from 'react';
import { Container } from '@inlet/react-pixi';

import { ECardSize, EOwner, ICard, IOwnerProps } from "../models";
import Card from "./Card";

export interface IHandProps extends IOwnerProps {
    cards: ICard[]
}

const positions = [
    {
        containerX: 1200,
        cardsPosition: [0]
    },
    {
        containerX: 1100,
        cardsPosition: [0, 200]
    },
    {
        containerX: 1000,
        cardsPosition: [0, 200, 400]
    },
    {
        containerX: 900,
        cardsPosition: [0, 200, 400, 600]
    },
    {
        containerX: 800,
        cardsPosition: [0, 200, 400, 600, 800]
    },
    {
        containerX: 750,
        cardsPosition: [0, 180, 360, 540, 720, 900]
    },
    {
        containerX: 650,
        cardsPosition: [0, 180, 360, 540, 720, 900, 1080]
    },
    {
        containerX: 680,
        cardsPosition: [0, 150, 300, 450, 600, 750, 900, 1050]
    },
];

const Table = ({ owner, cards }: IHandProps) => {
    let children: JSX.Element[] = [];
    let containerX: number = 0;
    if (cards.length) {
        const { containerX: conX, cardsPosition } = positions[cards.length - 1];
        containerX = conX;
        children = cards.map((card, index) => {
            const x = cardsPosition[index];
            return (
                <Card
                    key={card.id}
                    cardSize={ECardSize.MIN}
                    card={card}
                    x={x}
                />
            )
        })
    }
    return (
        <Container
            x={containerX}
            y={owner === EOwner.I ? 770 : 430}
        >
            {children}
        </Container>
    )
};

export default Table