import * as React from 'react';
import { Sprite, Text, Graphics } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import { connect } from 'react-redux';

import CardTemplate from './CardTemplate';
import CardLabel from './CardLabel';
import {ICard, ECardProperties, IPositionProps, ECardSize, ECardLabel} from '../models';
import { previewCard } from '../actions';
import * as closedCard from '../assets/cards/big/r.png';
import * as templateHereticsFull from '../assets/cards/big/l_e.png';
import * as templateEastFull from '../assets/cards/big/l_k.png';
import * as templateConjurationFull from '../assets/cards/big/l_m.png';
import * as templateMin from '../assets/cards/min/card.png';

const style = {
    heading: new PIXI.TextStyle({
        fontFamily: "HolyChainFont",
        fill: "#DAD49E",
        fontSize: 36,
    }),
    description: new PIXI.TextStyle({
        fontFamily: 'HolyChainFont',
        align: 'center',
        wordWrap: true,
        wordWrapWidth: 300
    })
};



const fullTemplates = {
    [ECardLabel.CONJURATION]: templateConjurationFull,
    [ECardLabel.EAST]: templateEastFull,
    [ECardLabel.HERETICS]: templateHereticsFull,
};

export interface ICardProps extends IPositionProps {
    card?: ICard;
    cardSize?: ECardSize;
    rotation?: number;
    previewCard: (card: ICard) => void;
}

class Card extends React.Component<ICardProps, object> {
    public toPreview = (card: ICard) => {
        this.props.previewCard(card);
    };

    public render () {
        const {
            card,
            cardSize = ECardSize.FULL,
            rotation,
            x,
            y,
            width = 150,
            height = 250
        } = this.props;
        let template = closedCard;
        const children: JSX.Element[] = [];
        if (card && width) {
            let image: string;
            let imageWidth: number;
            let imageHeight: number;
            const cardText = [];
            if (cardSize === ECardSize.FULL) {
                template = fullTemplates[card.label];
                image = card.image.full;
                imageWidth = 425;
                imageHeight = 614;
                cardText.push(
                    <React.Fragment>
                        <Text text={card.name.en} style={style.heading} x={imageWidth / 2} y={353} anchor={[0.5, 0]} />
                        <Text text={card.label} style={style.description} x={imageWidth / 2} y={400} anchor={[0.5, 0]} />
                        <Text text={card.description.en} style={style.description} x={imageWidth / 2} y={450} anchor={[0.5, 0]} />
                        {card.canTurn && <Graphics
                            draw={g => {
                                g.lineStyle(10,  0x04B431, 1);
                                g.moveTo(3, 25);
                                g.bezierCurveTo(3, 25, 10, 10, 25, 3);
                                g.lineTo(390, 3);
                                g.bezierCurveTo(390, 3, 410, 10, 420, 25);
                                g.lineTo(420, 580);
                                g.bezierCurveTo(420, 580, 410, 600, 395, 605);
                                // g.moveTo(9, 605);
                                g.lineTo(25, 605);
                                g.bezierCurveTo(25, 605, 10, 600, 3, 580);
                                g.lineTo(3, 25);
                                g.endFill();
                            }}
                        />}
                    </React.Fragment>
                )
            } else {
                template = templateMin;
                image = card.image.min;
                imageWidth = 178;
                imageHeight = 228;
                if (card.isActive !== undefined) {
                    children.push(
                        <Graphics
                            draw={g => {
                                g.lineStyle(5, card.isActive ? 0x0000ff : 0xff0000, 1);
                                g.moveTo(8, 5);
                                g.lineTo(155, 5);
                                g.bezierCurveTo(155, 5, 165, 10, 170, 20);
                                g.lineTo(170, 190);
                                g.bezierCurveTo(170, 195, 100, 245, 6, 195);
                                g.moveTo(8, 194);
                                g.lineTo(8, 5);
                                g.endFill();
                            }}
                        />
                    )
                }
            }
            children.push(
                <React.Fragment>
                    <Sprite
                        image={image}
                        interactive={true}
                        width={imageWidth}
                        height={imageHeight}
                        mouseover={() => this.toPreview(card)}
                    />
                    {card.health !== undefined && <CardLabel
                        properties={ECardProperties.HEALTH}
                        text={card.health.toString()}
                        cardSize={cardSize}
                        x={width === 150 && cardSize !== ECardSize.MIN ? 400 : width}
                    />}
                    {card.force !== undefined && <CardLabel
                        properties={ECardProperties.FORCE}
                        cardSize={cardSize}
                        text={card.force.toString()}
                    />}
                    {cardText}
                </React.Fragment>
            )
        }

        return (
            <CardTemplate
                x={x}
                y={y}
                width={width}
                height={height}
                rotation={rotation}
                cardTemplate={template}
            >
                {children}
            </CardTemplate>
        );
    };
}

export default connect(null, { previewCard })(Card);