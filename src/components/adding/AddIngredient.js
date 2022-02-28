import React, { useState } from 'react';
import { MyButton } from "../../commons/MyButtons";
import MyAxios from '../../commons/MyAxios'
import Modal from 'react-modal';
import "./Add.css"
import "../../commons/Commons.css"

function AddIngredient({addIngredient, removeIngredient, mealIngredients}) {

    const [isOpen, setIsOpen] = useState(false);
    const [searchIngr, setSearchIngr] = useState("")

    
    function toggleModal() {
        setIsOpen(!isOpen);
        setNewIngr('');
        setSearchIngr('')
    }

    const [newIngr, setNewIngr] = useState('')



    const addIngr = (ingredient) => 
    MyAxios.post(`ingredient`,
        {
            name: ingredient
        })
        .then((response) => {
            addIngredient(response.data);
            setNewIngr("")
            setSearchIngr("")
            setIsOpen(!isOpen);
        })
        .catch((error) => {
            console.log(error);
        })

    const deleteIngr = (ingrName) => 
    MyAxios.delete(`ingredient/${ingrName}`)
        .then((response) => {
            removeIngredient();
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
                                onChange={event => (setNewIngr(event.target.value), setSearchIngr(event.target.value))}
                            >
                            </input>
                        </label>
                        <div className='ingr-buttons'>
                            {mealIngredients &&
                            mealIngredients
                            .filter((val) => {
                                if (searchIngr == "") {
                                    return val
                                } else if (val.toLowerCase().includes(searchIngr.toLowerCase())) {
                                    return val
                                }
                            })
                            .sort((a,b) => a.localeCompare(b))
                            .map((ingrName) => 
                                <MyButton
                                    key={ingrName}
                                    buttonStyle='btn--primary'
                                    buttonShape='btn--square'
                                    buttonSize='btn--small'
                                    onClick={()=>deleteIngr(ingrName)}
                                    aria-label='Składniki'
                                >
                                    {ingrName}&nbsp;<i className="fas fa-times"></i>
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