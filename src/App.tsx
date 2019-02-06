import * as React from 'react';
import {Sprite, Stage, Container, Provider as PIXIProvider} from '@inlet/react-pixi';
import { connect } from 'react-redux';

import * as BACKGROUND from './assets/main.png';
import Step from "./components/Step";
import {EOwner, IStore} from "./models";
import PlayButton from "./components/PlayButton";
import Preview from "./components/Preview";
import Player from "./components/Player";
import Effect from "./components/Effect";
import Attack from "./components/Attack";
import Modal from "./components/Modal";
import Arrow from "./components/Arrow";
import { BuyButton } from './components/BuyButton'
import BuyModal from './components/BuyModal'

const OPTIONS = {
    antialias: false
};

export interface IAppProps {
    [key: string]: any
    step: EOwner;
}

export interface IAppState {
    width: number;
    height: number;
    cardBought: boolean;
    wasFirstStep: boolean;
    showModal: boolean;
}

class App extends React.Component<IAppProps, IAppState> {
    public state = {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        cardBought: false,
        showModal: false,
        wasFirstStep: false,
    };

    private _onWindowResize = () => {
        this.setState({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        })
    };

    private _doFirstStep = () => {
        if (!this.state.wasFirstStep && this.state.cardBought) {
            this.setState({
                wasFirstStep: true,
            });
        }
    };

    private _buyCards = () => {
        if (!this.state.cardBought) {
            this.setState({
                showModal: true
            })
        }
    }

    private _cardsBought = () => {
        this.setState({
            showModal: false,
            cardBought: true
        })
    }

    public componentDidMount() {
        window.addEventListener('resize', this._onWindowResize, false);
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this._onWindowResize, false);
    }

    public render() {
        const { width, height, wasFirstStep, cardBought, showModal } = this.state;
        const { step, preview, players, effect, attack, modal } = this.props;
        return (
            <React.Fragment>
                <Stage width={width} height={height} options={OPTIONS}>
                    <PIXIProvider>
                        {
                            pixiApp => (
                                <Sprite image={BACKGROUND} width={width} height={height}>
                                    <Step step={60}/>
                                    <Player player={players[EOwner.I]} owner={EOwner.I} />
                                    <Player player={players[EOwner.Enemy]} owner={EOwner.Enemy} />
                                    {
                                        Object.getOwnPropertyNames(preview).length ? (
                                            <Preview card={preview} />
                                        ) : <Container />
                                    }
                                    {
                                        effect ? (
                                            <Effect name={effect.name} pixiApp={pixiApp} color={effect.color} />
                                        ) : <Container />
                                    }
                                    {
                                        attack ? (
                                            <Attack pixiApp={pixiApp} x={attack.x} y={attack.y} />
                                        ) : <Container />
                                    }
                                    {
                                        wasFirstStep === false && cardBought && (
                                            <React.Fragment>
                                                <Sprite
                                                    texture={PIXI.Texture.WHITE}
                                                    tint={0x000000}
                                                    alpha={0.7}
                                                    width={Math.pow(width, 2)}
                                                    height={Math.pow(height, 2)}
                                                />
                                                <Arrow pixiApp={pixiApp} />
                                            </React.Fragment>
                                        )
                                    }
                                    <PlayButton owner={step} doFirstStep={this._doFirstStep} />
                                    {
                                        !cardBought && (
                                            <React.Fragment>
                                                <Sprite
                                                    texture={PIXI.Texture.WHITE}
                                                    tint={0x000000}
                                                    alpha={0.9}
                                                    width={Math.pow(width, 2)}
                                                    height={Math.pow(height, 2)}
                                                />
                                                <BuyButton buyCards={this._buyCards}/>
                                            </React.Fragment>
                                        )
                                    }
                                </Sprite>
                            )
                        }
                    </PIXIProvider>
                </Stage>
                {modal && <Modal modal={modal}/>}
                {showModal && <BuyModal onBuy={this._cardsBought}/>}
            </React.Fragment>
        );
    }
}


export default connect(({
                            step,
                            preview,
                            players,
                            effect,
                            attack,
                            modal,
                        }: IStore) => ({ step, preview, players, effect, attack, modal }))(App);
