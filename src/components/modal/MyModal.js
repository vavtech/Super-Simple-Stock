import React, { useState } from 'react'
import Modal from 'react-modal'
import CalcInputForm from '../CalcInputForm/CalcInputForm';
import TradeForm from '../TradeForm/TradeForm';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

Modal.setAppElement('body');

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function MyModal(props) {
    const classes = useStyles();
    const [modalIsOpen, setModelIsOpen] = useState(false);

    let modalToShow = <TradeForm />;
    if (props.showSelectionAndInput) {
        modalToShow = <CalcInputForm id={props.id} />;
    }

    return (
        <div data-testid="mymodal" className={classes.root}>
            <Button variant="contained" color="primary" onClick={() => setModelIsOpen(true)}>{props.buttonName}</Button>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModelIsOpen(false)}
                style={
                    {
                        overlay: {
                            backgroundColor: 'gray'
                        },
                        content: {
                            color: 'orange'
                        }
                    }
                }
            >
                <h2>{props.title}</h2>
                <p>{props.description}</p>
                {modalToShow}
            </Modal>
        </div>
    );
}

export default MyModal;