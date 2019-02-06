import * as React from 'react';

import {ICard} from "../models";
import Card from "./Card";

export interface IPreviewProps {
    card: ICard;
}

const Preview = ({ card }: IPreviewProps) => {
    const x = 2080;
    const y = 400;
    const width = 400;
    const height = 650;
    return (
        <Card
            card={card}
            x={x}
            y={y}
            width={width}
            height={height}
        />
    );
};

export default Preview;
