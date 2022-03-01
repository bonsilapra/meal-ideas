import React, { useState } from "react";
import { MyButton } from "../../commons/MyButtons"
import MyAxios from '../../commons/MyAxios'
import Modal from 'react-modal';
import MeatTypeButton from "../main/MeatTypeButton";
import "./MealCard.css"
import "../adding/Add.css"
import "../../commons/Commons.css"

function EditMeal({
    mealId,
    mealCategory,
    mealName, 
    source,
    portions,
    meatType,
    fillers, 
    ingredients,
    mealCategoriesList, 
    meatTypesList,
    fillersList, 
    ingredientsList,
    editRecipe
}) {

    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen(!isOpen)
    }

    const [editMeal, setEditMeal] = useState(
        {
            mealId: mealId,
            mealName: mealName,
            mealSource: source,
            mealCategory: mealCategory,
            meatType: meatType,
            portions: portions,
            fillers: fillers,
            ingredients: ingredients
        }
    )

    const mealNameHandler = (e) => {
        setEditMeal({...editMeal, mealName: e.target.value})
    }

    const sourceHandler = (e) => {
        setEditMeal({...editMeal, mealSource: e.target.value})
    }

    const portionsHandler = (e) => {
        setEditMeal({...editMeal, portions: e.target.value})
    }
    
    const mealCategoryHandler = (e) => {
        if (e.target.value != "obiad") {
            setEditMeal({...editMeal, mealCategory: e.target.value,  meatType: []})
        } else {
            setEditMeal({...editMeal, mealCategory: e.target.value})
        }
    }

    const meatHandler = (e) => {
        setEditMeal({...editMeal, meatType: [...editMeal.meatType, e.target.value]})
    }

    const fillerHandler = (e) => {
        setEditMeal({...editMeal, fillers: [...editMeal.fillers, e.target.value]})
    }

    const ingrHandler = (e) => {
        setEditMeal({...editMeal, ingredients: [...editMeal.ingredients, e.target.value]})
    }

    const removeMeatType = (meatName) => {
        setEditMeal({...editMeal, meatType: editMeal.meatType.filter((e) => e != meatName )})
    }

    const removeFillerType = (fillerName) => {
        setEditMeal({...editMeal, fillers: editMeal.fillers.filter((e) => e != fillerName )})
    }

    const removeIngr = (ingrName) => {
        setEditMeal({...editMeal, ingredients: editMeal.ingredients.filter((e) => e != ingrName )})
    }

    const editMealPost = ({mealId, mealName, mealSource, mealCategory, meatType, portions, fillers, ingredients}) => {
        MyAxios.put(`recipe/${mealId}`,
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
                editRecipe(mealId, response.data);
                setIsOpen(!isOpen);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <MyButton
                buttonStyle='btn--primary--rev'
                buttonSize='btn--medium--rev'
                onClick={toggleModal}
                title="Edytuj posiłek"
            >
                &nbsp;<i className="fas fa-edit"></i>
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
                    <h2>Edytuj posiłek</h2>
                    <div className='modal-inputs'>
                        <label>
                            Zmień nazwę posiłku:
                            <input 
                                type="text" 
                                placeholder="Nazwa"
                                value={editMeal.mealName}
                                onChange={event => mealNameHandler(event)}
                            >
                            </input>
                        </label>
                        <label>
                            Edytuj źródło do przepisu:
                            <textarea 
                                type="text" 
                                placeholder="Żródło"
                                rows={3}
                                value={editMeal.mealSource}
                                onChange={event => sourceHandler(event)}
                            >
                            </textarea>
                        </label>
                        <label>
                            Edytuj ilośc porcji:
                            <input 
                                type="text" 
                                placeholder="Porcje"
                                value={editMeal.portions}
                                onChange={event => {portionsHandler(event)}}
                            >
                            </input>
                        </label>
                        <label>
                            Edytuj typ dania:
                            <select 
                                value={editMeal.mealCategory}
                                onChange={mealCategoryHandler}
                                multiple={false}
                            > 
                                {mealCategoriesList && mealCategoriesList.map((mealCat) => {
                                    return <option key={mealCat.value} value={mealCat.value}>{mealCat.text}</option>
                                })}
                            </select>
                            {editMeal.mealCategory &&
                            editMeal.mealCategory.length !=0 ?
                                <MyButton
                                    buttonStyle='btn--object'
                                    buttonShape='btn--square'
                                    buttonSize='btn--small'
                                    aria-label='Kategoria posiłku'
                                >
                                    <i className="fas fa-utensils"></i>&nbsp;{editMeal.mealCategory}
                                </MyButton>
                                :""
                            }
                        </label>
                            {editMeal.mealCategory=="obiad" ?
                                <label>
                                    Edytuj rodzaje mięsa:
                                    <select 
                                        value=""
                                        onChange={meatHandler}
                                        multiple={false}
                                    >
                                        {meatTypesList && meatTypesList.map((meatType) => 
                                            <option 
                                                key={meatType.value} 
                                                value={meatType.value} 
                                                disabled={editMeal.meatType && editMeal.meatType.includes(meatType.value)}
                                            >
                                                {meatType.text}
                                            </option>
                                        )}
                                    </select>
                                    <div className='modal-select-buttons'>
                                        {editMeal.meatType ? editMeal.meatType.map((meatButton) => {  
                                            return <MeatTypeButton key={meatButton} meatType={meatButton} removeMeatType={removeMeatType}/>
                                        }) : ""}
                                    </div>
                                </label>
                            : ""
                            }
                        <label>
                            Edytuj rodzaje dodatków:
                            <select 
                                value=""
                                onChange={fillerHandler}
                                multiple={false}
                            >
                                <option 
                                    key="dodatki" 
                                    value="Dodatki"
                                >
                                    Dodatki
                                </option>
                                {fillersList && fillersList
                                .sort((a,b) => 
                                    a.text.localeCompare(b.text))
                                .map((filler) => 
                                    <option 
                                        key={filler.value} 
                                        value={filler.value} 
                                        disabled={editMeal.fillers.includes(filler.value)}
                                    >
                                        {filler.text}
                                    </option>
                                )}
                            </select>
                            <div className='modal-select-buttons'>
                                {editMeal.fillers && editMeal.fillers.map((fillerButton) => 
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
                            Edytuj składniki:
                            <select 
                                value=""
                                onChange={ingrHandler}
                                multiple={false}
                            >
                                    <option 
                                        key="składniki" 
                                        value="Składniki"
                                    >
                                        Składniki
                                    </option>
                                {ingredientsList && ingredientsList
                                .sort((a,b) => 
                                    a.text.localeCompare(b.text))
                                .map((ingr) => 
                                    <option 
                                        key={ingr.value} 
                                        value={ingr.value} 
                                        disabled={editMeal.ingredients.includes(ingr.value)}
                                    >
                                        {ingr.text}
                                    </option>
                                )}
                            </select>
                            <div className='modal-select-buttons'>
                                {editMeal.ingredients && editMeal.ingredients.map((ingrButton) => 
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
                            onClick={() => editMealPost(
                                {
                                    mealId: mealId,
                                    mealName: editMeal.mealName,
                                    mealSource: editMeal.mealSource,
                                    mealCategory: editMeal.mealCategory,
                                    meatType: editMeal.meatType,
                                    portions: editMeal.portions,
                                    fillers: editMeal.fillers,
                                    ingredients: editMeal.ingredients
                                }
                            )}
                            title='Dodaj posiłek'
                            disabled={editMeal.mealName.length == 0 || editMeal.mealCategory.length == 0 || (editMeal.mealCategory == "obiad" && editMeal.meatType.length == 0)}
                        >
                            Dodaj
                        </MyButton>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default EditMeal