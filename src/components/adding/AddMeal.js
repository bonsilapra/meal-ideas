import React, { useState } from 'react';
import { MyButton } from "../../commons/MyButtons";
import MyAxios from '../../commons/MyAxios'
import "./Add.css"
import "../../commons/Commons.css"
import Modal from 'react-modal';
import MeatTypeButton from "../main/MeatTypeButton";



function AddMeal ({mealCategories, meatTypes, fillers, ingredients, addRecipe}) {

    const [isOpen, setIsOpen] = useState(false);
    
    function toggleModal() {
        setIsOpen(!isOpen);
        setNewMeal({
            mealName: "",
            mealSource: "",
            mealCategory: "",
            meatType: [],
            portions: "",
            fillers: [],
            ingredients: []
        })
    }

    const [newMeal, setNewMeal] = useState(
        {
            mealName: "",
            mealSource: "",
            mealCategory: "",
            meatType: [],
            portions: "",
            fillers: [],
            ingredients: []
        }
    )

    const mealNameHandler = (e) => {
        setNewMeal({...newMeal, mealName: e.target.value})
    }

    const sourceHandler = (e) => {
        setNewMeal({...newMeal, mealSource: e.target.value})
    }

    const portionsHandler = (e) => {
        setNewMeal({...newMeal, portions: e.target.value})
    }
    
    const mealCategoryHandler = (e) => {
        if (e.target.value != "obiad") {
            setNewMeal({...newMeal, mealCategory: e.target.value,  meatType: []})
        } else {
            setNewMeal({...newMeal, mealCategory: e.target.value})
        }
    }

    const meatHandler = (e) => {
        setNewMeal({...newMeal, meatType: [...newMeal.meatType, e.target.value]})
    }

    const fillerHandler = (e) => {
        setNewMeal({...newMeal, fillers: [...newMeal.fillers, e.target.value]})
    }

    const ingrHandler = (e) => {
        setNewMeal({...newMeal, ingredients: [...newMeal.ingredients, e.target.value]})
    }

    const removeMeatType = (meatName) => {
        setNewMeal({...newMeal, meatType: newMeal.meatType.filter((e) => e != meatName )})
    }

    const removeFillerType = (fillerName) => {
        setNewMeal({...newMeal, fillers: newMeal.fillers.filter((e) => e != fillerName )})
    }

    const removeIngr = (ingrName) => {
        setNewMeal({...newMeal, ingredients: newMeal.ingredients.filter((e) => e != ingrName )})
    }

    const addMeal = (mealName, mealSource, mealCategory, meatType, portions, fillers, ingredients) => 
        MyAxios.post(`recipe`,
            {
                name: mealName,
                source: mealSource,
                yield: portions,
                meats: meatType,
                ingredients: ingredients,
                fillers: fillers,
                category: mealCategory
            })
            .then((response) => {
                addRecipe(response.data);
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
                title='Dodaj posiłek'
            >
                <i className="fas fa-plus"></i>&nbsp;&nbsp;<i className="fas fa-utensils"></i>
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
                    <h2>Dodaj posiłek</h2>
                    <div className='modal-inputs'>
                        <label>
                            Podaj nazwę posiłku:
                            <input 
                                type="text" 
                                placeholder="Nazwa"
                                onChange={event => mealNameHandler(event)}
                            >
                            </input>
                        </label>
                        <label>
                            Podaj źródło do przepisu:
                            <input 
                                type="text" 
                                placeholder="Żródło"
                                onChange={event => sourceHandler(event)}
                            >
                            </input>
                        </label>
                        <label>
                            Podaj ilośc porcji:
                            <input 
                                type="text" 
                                placeholder="Porcje"
                                onChange={event => {portionsHandler(event)}}
                            >
                            </input>
                        </label>
                        <label>
                            Wybierz typ dania:
                            <select value="" onChange={mealCategoryHandler}> 
                                {mealCategories && mealCategories.map((mealCat) => {
                                    return <option key={mealCat.value} value={mealCat.value}>{mealCat.text}</option>
                                })}
                            </select>
                            {newMeal.mealCategory.length !=0 ?
                                <MyButton
                                    buttonStyle='btn--object'
                                    buttonShape='btn--square'
                                    buttonSize='btn--small'
                                    aria-label='Kategoria posiłku'
                                >
                                    <i className="fas fa-utensils"></i>&nbsp;{newMeal.mealCategory}
                                </MyButton>
                                :""
                            }
                        </label>
                            {newMeal.mealCategory=="obiad" ?
                                <label>
                                    Wybierz rodzaje mięsa:
                                    <select value="" onChange={meatHandler}>
                                        {meatTypes && meatTypes.map((meatType) => 
                                            <option 
                                                key={meatType.value} 
                                                value={meatType.value} 
                                                disabled={newMeal.meatType.includes(meatType.value)}
                                            >
                                                {meatType.text}
                                            </option>
                                        )}
                                    </select>
                                    <div className='modal-select-buttons'>
                                        {newMeal.meatType.map((meatButton) => {  
                                            return <MeatTypeButton key={meatButton} meatType={meatButton} removeMeatType={removeMeatType}/>
                                        })}
                                    </div>
                                </label>
                            : ""
                            }
                        <label>
                            Wybierz rodzaje dodatków:
                            <select value="" onChange={fillerHandler}>
                                {fillers && fillers.map((filler) => 
                                    <option 
                                        key={filler.value} 
                                        value={filler.value} 
                                        disabled={newMeal.fillers.includes(filler.value)}
                                    >
                                        {filler.text}
                                    </option>
                                )}
                            </select>
                            <div className='modal-select-buttons'>
                                {newMeal.fillers.map((fillerButton) => 
                                    <MyButton
                                        key={fillerButton}
                                        buttonStyle='btn--primary'
                                        buttonShape='btn--square'
                                        buttonSize='btn--small'
                                        onClick={()=>removeFillerType(fillerButton)}
                                        aria-label='Kategoria dodatku'
                                    >
                                        <i className="fas fa-bread-slice"></i>&nbsp;{fillerButton}&nbsp;<i className="fas fa-times"></i>
                                    </MyButton>
                                )}
                            </div>
                        </label>
                        <label>
                            Wybierz składniki:
                            <select value="" onChange={ingrHandler}>
                                {ingredients && ingredients.map((ingr) => 
                                    <option 
                                        key={ingr.value} 
                                        value={ingr.value} 
                                        disabled={newMeal.ingredients.includes(ingr.value)}
                                    >
                                        {ingr.text}
                                    </option>
                                )}
                            </select>
                            <div className='modal-select-buttons'>
                                {newMeal.ingredients.map((ingrButton) => 
                                    <MyButton
                                        key={ingrButton}
                                        buttonStyle='btn--primary'
                                        buttonShape='btn--square'
                                        buttonSize='btn--small'
                                        onClick={()=>removeIngr(ingrButton)}
                                        aria-label='Kategoria dodatku'
                                    >
                                        <i className="fas fa-carrot"></i>&nbsp;{ingrButton}&nbsp;<i className="fas fa-times"></i>
                                    </MyButton>
                                )}
                            </div>
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
                            onClick={() => addMeal(
                                {
                                    mealName: newMeal.mealName,
                                    mealSource: newMeal.mealSource,
                                    mealCategory: newMeal.mealCategory,
                                    meatType: newMeal.meatType,
                                    portions: newMeal.portions,
                                    fillers: newMeal.fillers,
                                    ingredients: newMeal.ingredients
                                }
                            )}
                            title='Dodaj posiłek'
                            disabled={newMeal.mealName.length == 0 || newMeal.mealCategory.length == 0 || (newMeal.mealCategory == "obiad" && newMeal.meatType.length == 0)}
                        >
                            Dodaj
                        </MyButton>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default AddMeal