import * as React from 'react';
import { Sprite } from '@inlet/react-pixi';
import {IPositionProps} from "../models";

export interface ICardTemplateProps extends IPositionProps {
    cardTemplate: string;
    rotation?: number;
    children?: React.ReactNode;
}

const CardTemplate = ({
                          cardTemplate,
                          x,
                          y,
                          width,
                          height,
                          rotation,
                          children
}: ICardTemplateProps) => (
    <Sprite
        image={cardTemplate}
        x={x}
        y={y}
        width={width}
        height={height}
        rotation={rotation}
    >
        {children}
    </Sprite>
);

export default CardTemplate;
