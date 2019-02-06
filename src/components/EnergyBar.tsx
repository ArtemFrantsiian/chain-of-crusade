import * as React from 'react';
import { Sprite, Text } from '@inlet/react-pixi';

import * as first from '../assets/progressbar_energy/l.png';
import * as custom from '../assets/progressbar_energy/c.png';
import { EOwner, IOwnerProps } from "../models";
import * as last from '../assets/progressbar_energy/p.png';

const style = {
    text: new PIXI.TextStyle({
        fontFamily: 'HolyChainFont',
        fill: '#FFF7B1',
        fontSize: 32,
    }),
};

export interface IEnergyBarProps extends IOwnerProps {
    energy: number;
    full: number;
}

// TODO refactor
const EnergyBar = ({ energy, full, owner }: IEnergyBarProps) => {
    const children: JSX.Element[] = [];
    const width = 20;
    const height = 1;
    const texture = new PIXI.Texture(new PIXI.BaseTexture());
    const x = 30;
    let y: number;
    if (owner === EOwner.I) {
        y = 1141;
    } else {
        y = 273;
    }
    if (energy > 0) {
        let xEnergy = 0;
        for (let i = 1; i <= energy; i++) {
            let textureEnergy;
            let widthEnergy;
            if (i === 1) {
                textureEnergy = first;
                widthEnergy = 1;
            } else {
                textureEnergy = custom;
                widthEnergy = (width / (full - 1)) - (2 / (full - 1));
            }
            children.push(
                <Sprite
                    image={textureEnergy}
                    width={widthEnergy}
                    x={xEnergy}
                />
            );
            if (i === 1 && full === 1) {
                textureEnergy = custom;
                widthEnergy = width - 1;
            }
            children.push(
                <Sprite
                    image={textureEnergy}
                    width={widthEnergy - 1}
                    x={xEnergy + 1}
                />
            );
            xEnergy += widthEnergy;
            if (i === energy) {
                widthEnergy = 1;
                children.push(
                    <Sprite
                        image={last}
                        width={widthEnergy}
                        x={xEnergy - widthEnergy}
                    />
                );
            }
        }
    }
    return (
      <Sprite
          width={width}
          height={height}
          texture={texture}
          x={x}
          y={y}
      >
          {children}
          <Text
              text={`${energy}/${full}`}
              width={2.5}
              style={style.text}
              x={width}
          />
      </Sprite>
    )
};

export default EnergyBar;