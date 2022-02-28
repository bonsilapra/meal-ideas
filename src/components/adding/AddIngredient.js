import React, { useState } from 'react';
import { MyButton } from "../../commons/MyButtons";
import MyAxios from '../../commons/MyAxios'
import Modal from 'react-modal';
import "./Add.css"
import "../../commons/Commons.css"

function AddIngredient({addIngredient}) {

    const [isOpen, setIsOpen] = useState(false);
    
    function toggleModal() {
        setIsOpen(!isOpen);
        setNewIngr('')
    }

    const [newIngr, setNewIngr] = useState('')



    const addIngr = (ingredient) => 
    MyAxios.post(`ingredient`,
        {
            name: ingredient
        })
        .then((response) => {
            addIngredient(response.data);
            setIsOpen(!isOpen);
        })
        .catch((error) => {
            console.log(error);
        })


    return (
        <div className='add-meal-button'>
            <MyButton
                buttonStyle='btn--primary'
                buttonShape='btn--square'
                buttonSize='btn--medium'
                onClick={toggleModal}
                title='Dodaj składnik'
            >
                <i className="fas fa-plus"></i>&nbsp;&nbsp;<i className="fas fa-carrot"></i>
            </MyButton>
            <Modal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                contentLabel="My dialog"
                className="modal"
                overlayClassName="overlay"
                closeTimeoutMS={500}
                ariaHideApp={false}
            >
                <div className='modal-container'>
                    <h2>Dodaj nowy składnik</h2>
                    <div className='modal-inputs'>
                        <label>
                            Podaj nazwę składnika:
                            <input 
                                type="text" 
                                placeholder="Nazwa"
                                onChange={event => setNewIngr(event.target.value)}
                            >
                            </input>
                        </label>
                    </div>
                    <div className='modal-buttons'>
                        <MyButton
                            buttonStyle='btn--secondary'
                            buttonShape='btn--square'
                            buttonSize='btn--medium-smaller'
                            onClick={toggleModal}
                            title='Anuluj'
                        >
                            Anuluj
                        </MyButton>
                        <MyButton
                            buttonStyle='btn--primary'
                            buttonShape='btn--square'
                            buttonSize='btn--medium-smaller'
                            onClick={() => addIngr(newIngr)}
                            title='Dodaj składnik'
                            disabled={newIngr.length == 0}
                        >
                            Dodaj
                        </MyButton>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default AddIngredient