import * as React from 'react';

import {EDeckPurpose, IOwnerProps} from '../models';
import Deck from "./Deck";

export interface IHolderProps extends IOwnerProps {
    pocketCount: number;
    hangUpCount: number;
}

const Holder = ({ owner, pocketCount, hangUpCount }: IHolderProps) => (
    <React.Fragment>
        <Deck count={pocketCount} deck={EDeckPurpose.ARM} owner={owner} />
        <Deck count={hangUpCount} deck={EDeckPurpose.HANGUP} owner={owner} />
    </React.Fragment>
);

export default Holder;