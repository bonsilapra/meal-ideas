import React, { useEffect, useState } from "react";
import { MyButton } from "../../commons/MyButtons"
import classNames from 'classnames';
import chicken from "../../images/chicken.png"
import cow from "../../images/cow.png"
import fish from "../../images/fish.png"
import leaf from "../../images/leaf.png"
import pig from "../../images/pig.png"
import "./MealCard.css"

function MealCard({
    mealCategory,
    mealName, 
    source,
    portions,
    meatType,
    fillers, 
    ingredients
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
        switch (meatType) {
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
    

    const mealData = [
        {label: "Źródło", content: source},
        {label: "Składniki", content: 
            (meatType ? (meatType=="ryba" ? "" : (meatType=="vege" ? "" : meatType + ", ")) : "") + 
            (fillers ? (fillers.length > 0 ? (fillers.join(", ")) + ", " : (fillers.join(", "))) : "") + 
            (ingredients ? ingredients.join(", ") : "")
        },
        {label: "Porcje", content: portions}
    ]

    return (
        <div style={{margin:"10px"}}>
            <MyButton
                buttonStyle='btn--meal-card'
                buttonSize='btn--meal-size'
                onClick={handleCard}
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
                            <h2>{mealName}</h2>
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
                        </div>: ""
                    }
                </div>
            </MyButton>
        </div>
    )
}

export default MealCard