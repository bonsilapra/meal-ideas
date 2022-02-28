import React, { useState } from 'react';
import { MyButton } from "../../commons/MyButtons";
import MyAxios from '../../commons/MyAxios'
import Modal from 'react-modal';
import "./Add.css"
import "../../commons/Commons.css"

function AddFiller({addFiller, removeFiller, mealFillers}) {


    const [isOpen, setIsOpen] = useState(false);
    const [searchFiller, setSearchFiller] = useState("")

    
    function toggleModal() {
        setIsOpen(!isOpen);
        setNewFiller('');
        setSearchFiller('')
    }

    const [newFiller, setNewFiller] = useState('')



    const addFill = (fill) => {
        MyAxios.post(`filler`,
            {
                name: fill
            })
            .then((response) => {
                addFiller(response.data);
                setNewFiller("")
                setSearchFiller("")
                // setIsOpen(!isOpen);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            addFill(newFiller)
        }
    }

    const deleteFiller = (fillerName) => {
        MyAxios.delete(`filler/${fillerName}`)
            .then((response) => {
                removeFiller();
                setIsOpen(!isOpen);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className='add-meal-button'>
            <MyButton
                buttonStyle='btn--primary'
                buttonShape='btn--square'
                buttonSize='btn--medium'
                onClick={toggleModal}
                title='Dodaj dodatek'
            >
                <i className="fas fa-plus"></i>&nbsp;&nbsp;<i className="fas fa-bread-slice"></i>
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
                    <h2>Dodaj nowy dodatek</h2>
                    <div className='modal-inputs'>
                        <label>
                            Podaj nazwę dodatku:
                            <input 
                                type="text" 
                                placeholder="Nazwa"
                                onChange={event => (setNewFiller(event.target.value), setSearchFiller(event.target.value))}
                                onKeyDown={handleKeyDown}
                            >
                            </input>
                        </label>
                        <div className='ingr-buttons'>
                            {mealFillers &&
                            mealFillers
                            .filter((val) => {
                                if (searchFiller == "") {
                                    return val
                                } else if (val.toLowerCase().includes(searchFiller.toLowerCase())) {
                                    return val
                                }
                            })
                            .sort((a,b) => a.localeCompare(b))
                            .map((fillerName) => 
                                <MyButton
                                    key={fillerName}
                                    buttonStyle='btn--primary'
                                    buttonShape='btn--square'
                                    buttonSize='btn--small'
                                    onClick={()=>deleteFiller(fillerName)}
                                    aria-label='Dodatki'
                                >
                                    {fillerName}&nbsp;<i className="fas fa-times"></i>
                                </MyButton>
                            )}
                        </div>
                    </div>
                    <div className='modal-buttons'>
                        <MyButton
                            buttonStyle='btn--secondary'
                            buttonShape='btn--square'
                            buttonSize='btn--medium-smaller'
                            onClick={toggleModal}
                            title='Anuluj'
                        >
                            Wyjście
                        </MyButton>
                        <MyButton
                            buttonStyle='btn--primary'
                            buttonShape='btn--square'
                            buttonSize='btn--medium-smaller'
                            onClick={() => addFill(newFiller)}
                            title='Dodaj dodatek'
                            disabled={newFiller.length == 0}
                        >
                            Dodaj
                        </MyButton>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default AddFiller