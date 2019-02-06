import * as React from 'react';
import { Sprite, Text } from '@inlet/react-pixi';
import { connect } from "react-redux";
import { Action, AnyAction } from "redux";

import { EOwner, IAttack, IEffect, IModal, IOwnerProps, IStore, IPlayers } from '../models';
import * as playButton from '../assets/button_play.png';
import {
    toogleStep,
    stepOne,
    stepTwo,
    stepThree,
    stepFour,
    stepFive,
    stepSix,
    stepSeven,
    stepEight,
    stepNine,
    stepTen,
    stepEleven,
    stepTwelve,
    stepThirteen,
    stepFourteen,
    stepFifteen,
    stepSixteen,
    stepSeventeen,
    stepEighteen,
    stepNineteen,
    stepTwenty,
    stepTwentyOne,
    stepTwentyTwo,
    stepTwentyThree,
    stepTwentyFour,
    stepTwentyFive,
    stepTwentySix,
    stepTwentySeven,
    stepTwentyEigth,
    stepTwentyNine,
    stepThirty,
    stepThirtyOne,
    stepThirtyTwo,
    stepThirtyThree,
    stepThirtyFour,
    stepThirtyFive,
    stepThirtySix,
    stepThirtySeven,
    stepThirtyEigth,
    stepThirtyNine,
    stepFourty,
    stepFourtyOne,
    stepFourtyTwo,
    stepFourtyThree,
    stepFourtyFour,
    addEffect,
    attack,
    openModal,
} from "../actions";
import { createLink } from './../functions/saver';
import * as types from "../types";
import { createAndSendTransaction } from "../chain";

const style = new PIXI.TextStyle({
    fontFamily: 'HolyChainFont',
    fontSize: 56,
    fill: '#64F579'
});

export interface IPlayButtonProps extends IOwnerProps {
    players: IPlayers
    toogleStep: () => Action<types.TOOGLE_STEP>
    stepOne: () => Action<types.STEP_ONE>
    stepTwo: () => Action<types.STEP_TWO>
    stepThree: () => Action<types.STEP_THREE>
    stepFour: () => Action<types.STEP_FOUR>
    stepFive: () => Action<types.STEP_FIVE>
    stepSix: () => Action<types.STEP_SIX>
    stepSeven: () => Action<types.STEP_SEVEN>,
    stepEight: () => Action<types.STEP_EIGHT>,
    stepNine: () => Action<types.STEP_NINE>,
    stepTen: () => Action<types.STEP_TEN>,
    stepEleven: () => Action<types.STEP_ELEVEN>,
    stepTwelve: () => Action<types.STEP_TWELVE>,
    stepThirteen: () => Action<types.STEP_THIRTEEN>,
    stepFourteen: () => Action<types.STEP_FOURTEEN>,
    stepFifteen: () => Action<types.STEP_FIFTEEN>,
    stepSixteen: () => Action<types.STEP_SIXTEEN>,
    stepSeventeen: () => Action<types.STEP_SEVENTEEN>,
    stepEighteen: () => Action<types.STEP_EIGHTEEN>,
    stepNineteen: () => Action<types.STEP_NINETEEN>,
    stepTwenty: () => Action<types.STEP_TWENTY>,
    stepTwentyOne: () => Action<types.STEP_TWENTY_ONE>,
    stepTwentyTwo: () => Action<types.STEP_TWENTY_TWO>,
    stepTwentyThree: () => Action<types.STEP_TWENTY_THREE>,
    stepTwentyFour: () => Action<types.STEP_TWENTY_FOUR>,
    stepTwentyFive: () => Action<types.STEP_TWENTY_FIVE>,
    stepTwentySix: () => Action<types.STEP_TWENTY_SIX>,
    stepTwentySeven: () => Action<types.STEP_TWENTY_SEVEN>,
    stepTwentyEigth: () => Action<types.STEP_TWENTY_EIGHT>,
    stepTwentyNine: () => Action<types.STEP_TWENTY_NINE>,
    stepThirty: () => Action<types.STEP_THIRTY>,
    stepThirtyOne: () => Action<types.STEP_THIRTY_ONE>,
    stepThirtyTwo: () => Action<types.STEP_THIRTY_TWO>,
    stepThirtyThree: () => Action<types.STEP_THIRTY_THREE>,
    stepThirtyFour: () => Action<types.STEP_THIRTY_FOUR>,
    stepThirtyFive: () => Action<types.STEP_THIRTY_FIVE>,
    stepThirtySix: () => Action<types.STEP_THIRTY_SIX>,
    stepThirtySeven: () => Action<types.STEP_THIRTY_SEVEN>,
    stepThirtyEigth: () => Action<types.STEP_THIRTY_EIGHT>,
    stepThirtyNine: () => Action<types.STEP_THIRTY_NINE>,
    stepFourty: () => Action<types.STEP_FOURTY>,
    stepFourtyOne: () => Action<types.STEP_FOURTY_ONE>,
    stepFourtyTwo: () => Action<types.STEP_FOURTY_TWO>,
    stepFourtyThree: () => Action<types.STEP_FOURTY_THREE>,
    stepFourtyFour: () => Action<types.STEP_FOURTY_FOUR>,
    addEffect: (effect: IEffect) => AnyAction,
    attack: (payload: IAttack) => AnyAction,
    openModal: (payload: IModal) => AnyAction,
    doFirstStep: () => void,
}

export interface IPlayButtonState {
    count: number;
    disable: boolean;
}
const json: { game: any } = {
    game: []
};
class PlayButton extends React.Component<IPlayButtonProps, IPlayButtonState> {
    public state = {
        count: 0,
        disable: false,
    };

    public makeSteps = (steps: Array<() => AnyAction | void>) => {
        if (steps.length) {
            setTimeout(() => {
                steps[0]();
                this.makeSteps(steps.filter((item, index) => index !== 0));
            }, 1500);
        }
        return;
    };

    public finishSteps = () => {
        const { toogleStep } = this.props;
        toogleStep();
        this.setState(prevState => ({
            count: prevState.count + 1,
            disable: false,
        }))
    };

    public onClick = () => {
        const { count, disable } = this.state;
        if (!disable) {
            this.setState({
                disable: true
            });
            const {
                toogleStep,
                addEffect,
                attack,
            } = this.props;
            toogleStep();
            switch (count) {
                case 0: {
                    const {
                        doFirstStep,
                        stepOne,
                        stepTwo,
                        stepThree,
                        stepFour,
                        stepFive,
                        stepSix,
                    } = this.props;
                    doFirstStep();
                    stepOne();
                    this.makeSteps([
                        stepTwo,
                        () => addEffect({
                            name: "Звук Горна"
                        }),
                        stepThree,
                        stepFour,
                        stepFive,
                        stepSix,
                        () => {
                            json.game.push(this.props.players);
                            this.finishSteps()
                        }
                    ]);
                    break;
                }
                case 1: {
                    const {
                        stepSeven,
                        stepEight,
                        stepNine,
                        stepTen,
                        stepEleven,
                    } = this.props;
                    // console.log(json)
                    stepSeven();
                    this.makeSteps([
                        () => addEffect({
                            name: "Травяной сбор"
                        }),
                        stepEight,
                        () => attack({ x: 1190, y: 1007 }),
                        stepNine,
                        stepTen,
                        stepEleven,
                        () => {
                            json.game.push(this.props.players);
                            this.finishSteps()
                        }
                    ]);
                    break;
                }
                case 2: {
                    const {
                        stepTwelve,
                        stepThirteen,
                        stepFourteen,
                        stepFifteen,
                        stepSixteen,
                        stepSeventeen,
                        stepEighteen,
                    } = this.props;
                    stepTwelve();
                    this.makeSteps([
                        () => attack({ x: 1190, y: 227 }),
                        stepThirteen,
                        stepFourteen,
                        () => addEffect({
                            name: "Гнев небес"
                        }),
                        () => attack({ x: 1300, y: 770 }),
                        stepFifteen,
                        () => attack({ x: 1190, y: 1007 }),
                        stepSixteen,
                        stepSeventeen,
                        stepEighteen,
                        () => {
                            json.game.push(this.props.players);
                            this.finishSteps()
                        }
                    ]);
                    break;
                }
                case 3: {
                    const {
                        stepNineteen,
                        stepTwenty,
                        stepTwentyOne,
                        stepTwentyTwo,
                        stepTwentyThree,
                        stepTwentyFour,
                        stepTwentyFive,
                        stepTwentySix,
                        stepTwentySeven,
                        stepTwentyEigth,
                        stepTwentyNine,
                    } = this.props;
                    stepNineteen();
                    this.makeSteps([
                        () => addEffect({
                            name: "Звук горна"
                        }),
                        stepTwenty,
                        stepTwentyOne,
                        () => attack({ x: 1190, y: 227 }),
                        stepTwentyTwo,
                        () => attack({ x: 1190, y: 227 }),
                        stepTwentyThree,
                        stepTwentyFour,
                        () => attack({ x: 1400, y: 770 }),
                        stepTwentyFive,
                        () => attack({ x: 1100, y: 430 }),
                        stepTwentySix,
                        stepTwentySeven,
                        stepTwentyEigth,
                        stepTwentyNine,
                        () => {
                            json.game.push(this.props.players);
                            this.finishSteps()
                        }
                    ]);
                    break;
                }
                case 4: {
                    const {
                        stepThirty,
                        stepThirtyOne,
                        stepThirtyTwo,
                        stepThirtyThree,
                        stepThirtyFour,
                        stepThirtyFive,
                        stepThirtySix,
                        stepThirtySeven,
                        stepThirtyEigth,
                        stepThirtyNine,
                        stepFourty,
                    } = this.props;
                    addEffect({
                        name: "Необходимая жертва"
                    });
                    stepThirty();
                    this.makeSteps([
                        () => attack({ x: 1190, y: 227 }),
                        stepThirtyOne,
                        () => attack({ x: 1190, y: 227 }),
                        stepThirtyTwo,
                        () => attack({ x: 1100, y: 430 }),
                        stepThirtyThree,
                        () => attack({ x: 1300, y: 770 }),
                        stepThirtyFour,
                        stepThirtyFive,
                        stepThirtySix,
                        () => addEffect({
                            name: "Воскрешение из мертвых"
                        }),
                        stepThirtySeven,
                        () => attack({ x: 1190, y: 1007 }),
                        stepThirtyEigth,
                        stepThirtyNine,
                        stepFourty,
                        () => {
                            json.game.push(this.props.players);
                            this.finishSteps()
                        }
                    ]);
                    break;
                }
                case 5: {
                    const {
                        stepFourtyOne,
                        stepFourtyTwo,
                        addEffect,
                        stepFourtyThree,
                        stepFourtyFour,
                        openModal,
                    } = this.props;
                    stepFourtyOne();
                    this.makeSteps([
                        () => addEffect({
                            name: "Неутомимая"
                        }),
                        stepFourtyTwo,
                        () => attack({ x: 1190, y: 227 }),
                        stepFourtyThree,
                        () => attack({ x: 1190, y: 227 }),
                        stepFourtyFour,
                        () => {
                            json.game.push(this.props.players);
                            this.finishSteps()
                        },
                        (async () => {
                            await createAndSendTransaction(json);
                            createLink(json);
                            // const addressFrom = "TAFNHOF54VTOJY3OM3BTDWZHDL6NJEBEX4XAV2DW";
                            const addressTo = "TD75D6U43FMCRV4I4V3PSMEZHJEBI7VK5TFULAHG";
                            const amount = 5;
                            openModal({
                                address: addressTo,
                                amount,
                            });
                        })
                    ]);
                    break;
                }
            }
        }
    };

    public render() {
        const { owner } = this.props;
        let y;
        if (owner === EOwner.I) {
            y = 0;
        } else {
            y = 104;
        }
        const baseTexture = PIXI.BaseTexture.from(playButton);
        const texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, y, 200, 104));
        return (
            <Sprite
                texture={texture}
                x={25}
                y={680}
                interactive={true}
                pointerdown={this.onClick}
                cursor="pointer"
            >
                <Text
                    text="TURN"
                    style={style}
                    anchor={[0.5, 0.5]}
                    x={100}
                    y={50}
                />
            </Sprite>
        );
    }
}

export default connect(({ players }: IStore) => ({ players }), {
    toogleStep,
    stepOne,
    stepTwo,
    stepThree,
    stepFour,
    stepFive,
    stepSix,
    stepSeven,
    stepEight,
    stepNine,
    stepTen,
    stepEleven,
    stepTwelve,
    stepThirteen,
    stepFourteen,
    stepFifteen,
    stepSixteen,
    stepSeventeen,
    stepEighteen,
    stepNineteen,
    stepTwenty,
    stepTwentyOne,
    stepTwentyTwo,
    stepTwentyThree,
    stepTwentyFour,
    stepTwentyFive,
    stepTwentySix,
    stepTwentySeven,
    stepTwentyEigth,
    stepTwentyNine,
    stepThirty,
    stepThirtyOne,
    stepThirtyTwo,
    stepThirtyThree,
    stepThirtyFour,
    stepThirtyFive,
    stepThirtySix,
    stepThirtySeven,
    stepThirtyEigth,
    stepThirtyNine,
    stepFourty,
    stepFourtyOne,
    stepFourtyTwo,
    stepFourtyThree,
    stepFourtyFour,
    addEffect,
    attack,
    openModal,
})(PlayButton);
