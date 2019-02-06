import * as React from 'react';
import { connect } from 'react-redux';
import { Sprite } from '@inlet/react-pixi';
import { AnyAction } from "redux";

import * as attack from '../assets/attack.png';
// import * as attackFragment from '../shaders/attack.frag';

import { removeAttack } from '../actions';

interface IEffectProps {
    x: number;
    y: number;
    pixiApp: any;
    removeAttack: () => AnyAction
}

interface IEffectState {
    scale: PIXI.Point
}

class Attack extends React.Component<IEffectProps, IEffectState> {
    public state = {
        scale: new PIXI.Point(0.8, 0.8)
    };

    public tick = (delta: number) => {
        const { scale } = this.state;
        scale.x -= 0.01 * delta;
        scale.y -= 0.01 * delta;
        if (scale.x < 0.2) {
            this.props.removeAttack();
            this.props.pixiApp.ticker.remove(this.tick);
        }
        this.setState({ scale: new PIXI.Point(scale.x, scale.y) })
    };

    public componentDidMount() {
        this.props.pixiApp.ticker.add(this.tick);
    }

    public componentWillUnmount() {
        this.props.pixiApp.ticker.remove(this.tick)
    }

    public render() {
        const { scale } = this.state;
        const { x, y } = this.props;
        return (
            <Sprite
                image={attack}
                scale={scale}
                x={x}
                y={y}
//                 filters={[
//                     new PIXI.Filter("", `uniform vec2 resolution;
// void main()
// {
//     vec2 pos = gl_FragCoord.xy / resolution.xy;
//     vec4 texColor = vec4(1.0, pos.x, pos.y, 1.0);
//     gl_FragColor = texColor;
// }`, {
//                         resolution: {
//                             type: 'v2',
//                             value:{ x: document.documentElement.clientWidth, y: document.documentElement.clientHeight}
//                         },
//                     })
//                 ]}
            />
        )
    }
}

export default connect(null, { removeAttack })(Attack);