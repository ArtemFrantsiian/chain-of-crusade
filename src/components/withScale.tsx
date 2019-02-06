import * as React from 'react';
import { connect } from 'react-redux';
import {Action, compose} from "redux";

import { removeEffect } from '../actions';
import * as types from '../types';

export interface IScaleProps {
    pixiApp: any;
    removeEffect?: () => Action<types.REMOVE_EFFECT>;
    scale?: PIXI.Point;
}

const withScale = <P extends object>(WrappedComponent: React.ComponentType<P & IScaleProps>) => {
    return class extends React.Component<P & IScaleProps, object> {
        public state = {
            scale: new PIXI.Point(1, 1)
        };

        public tick = (delta: number) => {
            const {scale} = this.state;
            scale.x += 0.1 * delta;
            scale.y += 0.1 * delta;
            if (scale.x > 4 && this.props.removeEffect) {
                this.props.removeEffect();
                this.props.pixiApp.ticker.remove(this.tick);
            }
            this.setState({scale})
        };

        public componentDidMount() {
            this.props.pixiApp.ticker.add(this.tick);
        }

        public componentWillUnmount() {
            this.props.pixiApp.ticker.remove(this.tick)
        }

        public render() {
            const {scale} = this.state;
            return <WrappedComponent scale={scale} {...this.props}/>
        }
    }
};

const Composed = compose(
    connect(null, { removeEffect }),
    withScale,
);

export default Composed;