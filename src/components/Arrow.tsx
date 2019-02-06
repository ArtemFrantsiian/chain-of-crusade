import * as React from 'react';
import { Text, Sprite, Container } from '@inlet/react-pixi';
import * as PIXI from "pixi.js";

import * as ArrowImage from '../assets/arrow.png';

const style = new PIXI.TextStyle({
    fontFamily: 'HolyChainFont',
    fontSize: 100,
    fill: '#64F579'
});

interface IEffectProps {
    pixiApp: any;
}

interface IEffectState {
    isGoUp: boolean
    x: number
    y: number
}

class Arrow extends React.Component<IEffectProps, IEffectState> {
    public state = {
        x: 0,
        y: 0,
        isGoUp: true,
    };

    public tick = (delta: number) => {
        let { x, y, isGoUp } = this.state;
        if (isGoUp) {
            x += 1.3 * delta;
            y -= 1.3 * delta;
            if (x > 35) {
                isGoUp = false;
            }
        } else {
            x -= 1.3 * delta;
            y += 1.3 * delta;
            if (x < -10) {
                isGoUp = true;
            }
        }
        this.setState({ x, y, isGoUp });
    };

    public componentDidMount() {
        this.props.pixiApp.ticker.add(this.tick);
    }

    public componentWillUnmount() {
        this.props.pixiApp.ticker.remove(this.tick)
    }

    public render() {
        const { x, y } = this.state;
        return (
            <Container
                position={new PIXI.Point(200, 600)}
            >
                <Sprite
                    image={ArrowImage}
                    width={300}
                    height={150}
                    rotation={-0.7}
                    x={x}
                    y={y}
                />
                <Text
                    text="Press Button"
                    style={style}
                    x={300}
                    y={-290}
                />
            </Container>
        )
    }
}

export default Arrow;