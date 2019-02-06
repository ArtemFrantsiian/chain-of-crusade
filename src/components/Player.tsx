import * as React from 'react';

import EnergyBar from "./EnergyBar";
import {IOwnerProps, IPlayer} from "../models";
import Activity from "./Activity";
import Hand from "./Hand";
import Holder from "./Holder";
import Hero from "./Hero";
import Avatar from "./Avatar";
import Table from "./Table";

export interface IPlayerProps extends IOwnerProps {
    player: IPlayer;
}

const Player = ({ owner, player }: IPlayerProps) => (
    <React.Fragment>
        <EnergyBar
            energy={player.energy.count}
            full={player.energy.full}
            owner={owner}
        />
        <Activity
            count={player.activity}
            owner={owner}
        />
        <Table
            cards={player.table}
            owner={owner} />
        <Hand
            cards={player.arm}
            owner={owner}
        />
        <Holder
            pocketCount={player.pocket.length}
            hangUpCount={player.hangUp.length}
            owner={owner}
        />
        <Hero
            health={player.health}
            owner={owner}
        />
        <Avatar
            player={player}
            owner={owner}
        />
    </React.Fragment>
);


export default Player;