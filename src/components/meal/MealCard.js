import React, { useEffect, useState } from "react";
import { MyButton } from "../../commons/MyButtons"
import MyAxios from '../../commons/MyAxios'
import classNames from 'classnames';
import EditMeal from "./EditMeal";
import chicken from "../../images/chicken.png"
import cow from "../../images/cow.png"
import fish from "../../images/fish.png"
import leaf from "../../images/leaf.png"
import pig from "../../images/pig.png"
import "./MealCard.css"

function MealCard({
    mealId,
    mealCategory,
    mealName, 
    source,
    portions,
    meatType,
    fillers, 
    ingredients,
    isLogged,
    removeRecipe,
    mealCategoriesList, 
    meatTypesList,
    fillersList, 
    ingredientsList,
    editRecipe
}) {

    const [cardFull, setCardFull] = useState(false)
    const handleCard = () => {
        setCardFull(!cardFull)
    }

    const cardClass = classNames({
        'cardFull': cardFull,
        'cardFolded': !cardFull 
    });

    let img = ""

    const setImg = (meatType) => {
        switch (meatType[0]) {
            case "kurczak":
                img = chicken;
                break;
            case "wołowina":
                img = cow;
                break;
            case "ryba":
                img = fish;
                break;
            case "vege":
                img = leaf;
                break;
            case "wieprzowina":
                img = pig;
                break;
            default: 
            img = '';
        }
    }
    
    const ingrAll = [...fillers, ...ingredients]

    const mealData = [
        {label: "Źródło", content: source},
        {label: "Składniki", content: 
            (meatType && meatType.length > 0 ? (meatType[0]=="ryba" ? "" : (meatType[0]=="vege" ? "" : meatType[0] + ", ")) : "") + 
            (ingrAll && ingrAll.length > 0 ? ingrAll.join(", ") : "")
        },
        {label: "Porcje", content: portions}
    ]

    const deleteMeal = (mealId) => {
        MyAxios.delete(`recipe/${mealId}`)
            .then((response) => {
                removeRecipe(mealId);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div style={{margin:"10px"}}>
            <div 
                className="meal-card"
                aria-label={mealName}
            >
                <div className={
                    `${classNames(cardClass)}
                    ${mealCategory=="obiad" ? "cardDinner" : ""}
                    ${mealCategory=="śniadanie" ? "cardBreakfast" : ""}
                    ${mealCategory=="kolacja" ? "cardSupper" : ""}
                    ${mealCategory=="deser" ? "cardDessert" : ""}
                    ${mealCategory=="zupa" ? "cardSoup" : ""}`}
                > 
                    <div className={mealCategory=="obiad" ? "dinnerCard" : "restMealsCard"}>
                        {mealCategory=="obiad" ?
                            <div className="meat-type">
                                {setImg(meatType)}
                                <img src={img} alt="Meat type" className="meat-type-img" />
                            </div>:""
                        }
                        <div className="meal-name">
                            <div 
                                className="meal-name-title"
                                onClick={handleCard}
                            >
                                <h3>{mealName}</h3>
                            </div>
                            {isLogged ? 
                                <div className="meal-buttons">
                                    <EditMeal 
                                        mealId = {mealId}
                                        mealCategory = {mealCategory}
                                        mealName = {mealName} 
                                        source = {source}
                                        portions = {portions}
                                        meatType = {meatType}
                                        fillers = {fillers} 
                                        ingredients = {ingredients}
                                        mealCategoriesList = {mealCategoriesList}
                                        meatTypesList = {meatTypesList}
                                        fillersList = {fillersList} 
                                        ingredientsList = {ingredientsList}
                                        editRecipe = {editRecipe}
                                    />
                                    <MyButton
                                        buttonStyle='btn--primary--rev'
                                        buttonSize='btn--medium--rev'
                                        onClick={() => deleteMeal(mealId)}
                                        title="Usuń posiłek"
                                    >
                                        &nbsp;<i className="fas fa-trash"></i>
                                    </MyButton> 
                                </div> : ""
                            }                   
                        </div>
                    </div>
                    {cardFull ?
                        <div className="meal-details">
                            {mealData.map((pos) =>
                                <div className="detail-type" key={pos.label}>
                                    <div className="label">
                                        <h4>{pos.label}</h4>
                                    </div>
                                    <div className="content">
                                        {pos.content.includes('http') ?
                                            <a href={pos.content} target='_blank' rel='noreferrer'>{pos.content}</a>
                                            :
                                            <p>{pos.content}</p>
                                        }
                                    </div>
                                </div>
                            )}
                            <MyButton
                                buttonStyle='btn--primary--rev'
                                buttonSize='btn--medium--rev'
                                onClick={handleCard}
                                title="Zwiń"
                            >
                                <i className="fas fa-angle-up"></i>
                            </MyButton>
                        </div>: ""
                    }
                </div>
            </div>
        </div>
    )
}

export default MealCard