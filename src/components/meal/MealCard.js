import React, { useEffect, useState } from "react";
import { MyButton } from "../../commons/MyButtons"
import classNames from 'classnames';
import chicken from "../../images/chicken.png"
import cow from "../../images/cow.png"
import fish from "../../images/fish.png"
import leaf from "../../images/leaf.png"
import pig from "../../images/pig.png"
import "./MealCard.css"

function MealCard() {

    const [cardFull, setCardFull] = useState(false)
    const handleCard = () => {
        setCardFull(!cardFull)
    }

    const cardClass = classNames({
        'cardFull': cardFull,
        'cardFolded': !cardFull 
    });

    const [isDinner, setDinner] = useState(false)

    const mealClass = classNames({
        'dinnerCard': isDinner,
        'restMealsCard': !isDinner,
    });

    let img = chicken

    const setImg = (meat) => {
        switch (meat) {
            case "chicken":
                img = chicken;
                break;
            case "cow":
                img = cow;
                break;
            case "fish":
                img = fish;
                break;
            case "leaf":
                img = leaf;
                break;
            case "pig":
                img = pig;
                break;
            default: 
            img = '';
        }
    }


    const mealType = classNames({
        "cardDinner": false,
        "cardBreakfast": false,
        "cardSupper": false,
        "cardDessert": true,
        "cardOther": false,
    });

    const mockData = [
        {label: "Źródło", content: "https://aniagotuje.pl/przepis/kruche-ciastka-z-cukrem"},
        {label: "Składniki", content: "masło, śmietana 18%, jajka, cukier, mąka"},
        {label: "Porcje", content: "78"}
    ]

    // useEffect(() => {
    //     sourceCheck(mockData[0])
    // })


    return (
        <div>
            <MyButton
                buttonStyle='btn--meal-card'
                buttonSize='btn--meal-size'
                onClick={handleCard}
            >
                <div className={classNames(cardClass, mealType)}> 
                    <div className={classNames(mealClass)}>
                        {isDinner ?
                            <div className="meat-type">
                                <img src={img} alt="Meat type" className="meat-type-img" />
                            </div>:""
                        }
                        <div className="meal-name">
                            <h2>Kruche ciastka z cukrem</h2>
                        </div>
                    </div>
                    {cardFull ?
                        <div className="meal-details">
                            {mockData.map((pos) =>
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

export default MealCard