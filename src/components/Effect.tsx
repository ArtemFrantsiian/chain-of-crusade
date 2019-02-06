import * as React from 'react';
import { Text } from '@inlet/react-pixi';
import { connect } from 'react-redux';

import { removeEffect } from '../actions';
import { AnyAction } from "redux";

interface IEffectProps {
    name: string;
    color: number
    pixiApp: any;
    removeEffect: () => AnyAction
}

interface IEffectState {
    scale: PIXI.Point
}

class Effect extends React.Component<IEffectProps, IEffectState> {
    public state = {
        scale: new PIXI.Point(1, 1)
    };

    public tick = (delta: number) => {
        const { scale } = this.state;
        scale.x += 0.05 * delta;
        scale.y += 0.05 * delta;
        if (scale.x > 4) {
            this.props.removeEffect();
            this.props.pixiApp.ticker.remove(this.tick);
        }
        this.setState({ scale })
    };

    public componentDidMount() {
        this.props.pixiApp.ticker.add(this.tick);
    }

    public componentWillUnmount() {
        this.props.pixiApp.ticker.remove(this.tick)
    }

    public render() {
        const { name, color } = this.props;
        const { scale } = this.state;
        return (
            <Text
                text={name}
                style={new PIXI.TextStyle({
                    fontFamily: 'HolyChainFont',
                    fontSize: 48,
                    fill: color,
                })}
                x={document.documentElement.clientWidth * 0.55}
                y={document.documentElement.clientHeight * 0.55}
                scale={new PIXI.Point(scale.x, scale.y)}
                anchor={[0.5, 0.5]}
            />
        )
    }
}

export default connect(null, { removeEffect })(Effect);