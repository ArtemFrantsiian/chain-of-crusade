import * as React from 'react';
import {Sprite, Text} from '@inlet/react-pixi';

import * as progress from '../assets/progress_run.png';

const style = new PIXI.TextStyle({
    fontFamily: 'HolyChainFont',
    fill: '#B0DAB1',
    fontSize: 96,
});

export interface IStepProps {
    step: number;
}

const Step = ({ step }: IStepProps) => {
    return (
      <Sprite
          image={progress}
          x={310}
          y={622}
      >
          <Text
              text={step.toString()}
              style={style}
              anchor={[0.5, 0.5]}
              x={105}
              y={100}
          />
      </Sprite>
    );
};

export default Step;