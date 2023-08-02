import React, {FC} from 'react';
import {createPortal} from "react-dom";
import {Wrap, Window} from './styles/styles'

interface IModalWindow {
    children: React.ReactNode,
    hidden?: boolean,
}

const ModalWindow: FC<IModalWindow> = ({
                                           children,
                                           hidden=true
}) => {
    return (
        createPortal(
            <Wrap $hidden={hidden}>
                <Window>
                    {children}
                </Window>
            </Wrap>
            , document.body)
    );
};

export default ModalWindow;