import React, { useEffect, useState } from "react";
import { MyButton } from "../../commons/MyButtons"
import classNames from 'classnames';
import chicken from "../../images/chicken.png"
import cow from "../../images/cow.png"
import fish from "../../images/fish.png"
import leaf from "../../images/leaf.png"
import pig from "../../images/pig.png"
import "./MealCard.css"

function MealCardMultiMeat({
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

    const kurczak = chicken
    const wołowina = cow
    const ryba = fish
    const vege = leaf
    const wieprzowina = pig

    const mealData = [
        {label: "Źródło", content: source},
        {label: "Składniki", content: 
            (meatType ? 
                (meatType.filter((meat) => meat.includes("ryba")).length != 0  ? 
                "" : (meatType.filter((meat) => meat.includes("vege")).length != 0  ? 
                    "" : meatType.join(", ") )+ ", ") 
            : "") + 
            (fillers ? (fillers.length > 0 ? (fillers.join(", ")) + ", " : (fillers.join(", "))) : "") + 
            (ingredients ? ingredients.join(", ") : "")},
        {label: "Porcje", content: portions}
    ]

    return (
        <div style={{margin:"10px"}}>
            <MyButton
                buttonStyle='btn--meal-card'
                buttonSize='btn--meal-size'
                onClick={handleCard}
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
                            <div className="meat-type-multi">
                                {meatType.map((meatImg) =>
                                    <img key={meatImg} src={eval(meatImg)} alt="Meat type" className="meat-type-img-multi" />
                                )}
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
                                            <a href={pos.content} target="blank">{pos.content}</a>
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

export default MealCardMultiMeat





    // const mealSetup = () => {
    //     if (meatType && meatType.length == 1) {
    //         const mealData = [
    //             {label: "Źródło", content: source},
    //             {label: "Składniki", content: (meatType ? (meatType[0]=="ryba" ? "" : meatType[0] + ", ") : "") + (fillers ? (fillers + ", ") : "") + (ingredients ? ingredients.join(", ") : "")},
    //             {label: "Porcje", content: portions}
    //         ];
    //         let meatTypeImg = meatType[0];
    //         return (mealData, meatTypeImg)
    //     } else if (meatType && meatType.length > 1){
    //         const mealData = [
    //             {label: "Źródło", content: source},
    //             {label: "Składniki", content: (meatType ? (meatType.filter((meat) => meat.includes("ryba")).length == 0  ? "" : "ryba, ") : "") + (fillers ? (fillers + ", ") : "") + (ingredients ? ingredients.join(", ") : "")},
    //             {label: "Porcje", content: portions}
    //         ];
    //         let meatTypeImg = meatType[0];
    //         return (mealData, meatTypeImg)
    //     }
    // }