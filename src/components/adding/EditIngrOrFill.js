import React, { useState } from 'react';
import { MyButton } from "../../commons/MyButtons";
import MyAxios from '../../commons/MyAxios'
import Modal from 'react-modal';
import "./Add.css"
import "../../commons/Commons.css"

function EditIngrOrFill({mealIngredients, mealFillers, editIngredient, editFillerMain}) {

    const [isOpen, setIsOpen] = useState(false);
    const [searchIngr, setSearchIngr] = useState("")
    const [searchFiller, setSearchFiller] = useState("")

    
    function toggleModal() {
        setIsOpen(!isOpen);
        setEditIngr({
            editInput: false,
            editIngrName: ""
        });
        setSearchIngr('')
        setEditFiller({
            editFillerInput: false,
            editFillerName: ""
        });
        setSearchFiller('')
    }

    const [editedIngrName, setEditedIngr] = useState("")
    const [editedFillerName, setEditedFiller] = useState("")


    const [editIngr, setEditIngr] = useState({
        editInput: false,
        editIngrName: ""
    })
    const [editFiller, setEditFiller] = useState({
        editFillerInput: false,
        editFillerName: ""
    })

    const editIngredientName = (ingrOldName, ingrNewName) => {
        MyAxios.put(`ingredient/${ingrOldName}`, {
            name: ingrNewName
        })
            .then((response) => {
                editIngredient(ingrOldName, response.data)
                // setIsOpen(!isOpen);
                setEditIngr({
                    editInput: false,
                    editIngrName: ""
                });
                setEditedIngr("");
                setSearchIngr("")
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const editFillerName = (fillerOldName, fillerNewName) => {
        MyAxios.put(`filler/${fillerOldName}`, {
            name: fillerNewName
        })
            .then((response) => {
                editFillerMain(fillerOldName, response.data)
                // setIsOpen(!isOpen);
                setEditIngr({
                    editFillerInput: false,
                    editFillerName: ""
                });
                setEditedFiller("");
                setSearchFiller("")
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleKeyDownIngr = (event) => {
        if (event.key === 'Enter') {
            editIngredientName(editedIngrName, editIngr.editIngrName);
        }
    }

    const handleKeyDownFiller = (event) => {
        if (event.key === 'Enter') {
            editFillerName(editedFillerName, editFiller.editFillerName);
        }
    }

    return (
        <div className='add-meal-button'>
            <MyButton
                buttonStyle='btn--primary'
                buttonShape='btn--square'
                buttonSize='btn--medium'
                onClick={toggleModal}
                title='Edytuj dodatki i składniki'
            >
                <i className="fas fa-edit"></i>&nbsp;&nbsp;<i className="fas fa-bread-slice"></i>&nbsp;&nbsp;<i className="fas fa-carrot"></i>
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
                    <h2>Edytuj dodatki i składniki</h2>
                    <div className='modal-inputs'>
                        <div>
                            <h3>Dodatki:</h3>
                            {editFiller.editFillerInput == true ?
                                <div className='modal-inputs'>
                                    <div className='modal-input'>
                                        <div className='modal-input-text'>
                                            <input
                                                type="text" 
                                                value={editFiller.editFillerName}
                                                placeholder="Nowa nazwa"
                                                onKeyDown={handleKeyDownFiller}
                                                onChange={event => (setEditFiller({...editFiller, editFillerName: event.target.value}), setSearchFiller(event.target.value))}
                                            >
                                            </input>
                                        </div>
                                        <MyButton
                                            buttonStyle='btn--primary--rev'
                                            buttonShape='btn--square'
                                            buttonSize='btn--medium-smaller'
                                            onClick={() => setEditFiller({...editFiller, editFillerInput: false})}
                                            title='Anuluj'
                                        >
                                            <i className="fas fa-times"></i>
                                        </MyButton>
                                        <MyButton
                                            buttonStyle='btn--primary--rev'
                                            buttonShape='btn--square'
                                            buttonSize='btn--medium-smaller'
                                            onClick={() => (editFillerName(editedFillerName, editFiller.editFillerName), setEditFiller({...editFiller, editFillerInput: false}))}
                                            title='Zapisz'
                                        >
                                            <i className="fas fa-check"></i>
                                        </MyButton>
                                    </div>
                                </div>
                                : ""
                            }
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
                                            onClick={()=>(setEditFiller({editFillerInput: true, editFillerName: fillerName}), setEditedFiller(fillerName))}
                                            aria-label='Składniki'
                                        >
                                            {fillerName}&nbsp;<i className="fas fa-edit"></i>
                                        </MyButton>
                                )}
                            </div>
                        </div>
                        <div>
                            <h3>Składniki:</h3>
                            {editIngr.editInput == true ?
                                <div className='modal-inputs'>
                                    <div className='modal-input'>
                                        <div className='modal-input-text'>
                                            <input
                                                type="text" 
                                                value={editIngr.editIngrName}
                                                placeholder="Nowa nazwa"
                                                onKeyDown={handleKeyDownIngr}
                                                onChange={event => (setEditIngr({...editIngr, editIngrName: event.target.value}), setSearchIngr(event.target.value))}
                                            >
                                            </input>
                                        </div>
                                        <MyButton
                                            buttonStyle='btn--primary--rev'
                                            buttonShape='btn--square'
                                            buttonSize='btn--medium-smaller'
                                            onClick={() => setEditIngr({...editIngr, editInput: false})}
                                            title='Anuluj'
                                        >
                                            <i className="fas fa-times"></i>
                                        </MyButton>
                                        <MyButton
                                            buttonStyle='btn--primary--rev'
                                            buttonShape='btn--square'
                                            buttonSize='btn--medium-smaller'
                                            onClick={() => (editIngredientName(editedIngrName, editIngr.editIngrName), setEditIngr({...editIngr, editInput: false}))}
                                            title='Zapisz'
                                        >
                                            <i className="fas fa-check"></i>
                                        </MyButton>
                                    </div>
                                </div>
                                : ""
                            }
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
                                            onClick={()=>(setEditIngr({editInput: true, editIngrName: ingrName}), setEditedIngr(ingrName))}
                                            aria-label='Składniki'
                                        >
                                            {ingrName}&nbsp;<i className="fas fa-edit"></i>
                                        </MyButton>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='modal-buttons'>
                        <MyButton
                            buttonStyle='btn--secondary'
                            buttonShape='btn--square'
                            buttonSize='btn--medium-smaller'
                            onClick={toggleModal}
                            title='Wyjście'
                        >
                            Wyjście
                        </MyButton>
                        {/* <MyButton
                            buttonStyle='btn--primary'
                            buttonShape='btn--square'
                            buttonSize='btn--medium-smaller'
                            onClick={() => addIngr(newIngr)}
                            title='Dodaj składnik'
                            disabled={newIngr.length == 0}
                        >
                            Dodaj
                        </MyButton> */}
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default EditIngrOrFill