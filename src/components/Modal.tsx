import * as React from 'react';
import {connect} from "react-redux";
import {closeModal} from "../actions";
import {AnyAction} from "redux";

interface IModalProps {
    modal: {
        address: string
        amount: number
    }
    closeModal: () => AnyAction
}

const Modal = ({
                   modal: {
                       address,
                       amount
                   },
                   closeModal,
}: IModalProps) => (
    <div
        style={{
            position: 'absolute',
            fontFamily: 'Arial',
            left: document.documentElement.clientWidth / 2 - 400,
            top: document.documentElement.clientHeight / 2 - 150,
            width: 800,
            height: 300,
            backgroundColor: '#000000',
            border: '1px solid #efefef',
            borderRadius: '10px',
            color: '#fff'
        }}
         onClick={closeModal}
    >
        <div>
            <p>NEM:$ transaction address_to="{address}" amount="{amount}"</p>
            <p>SUCCESS</p>
        </div>
    </div>
);

export default connect(null, { closeModal })(Modal)