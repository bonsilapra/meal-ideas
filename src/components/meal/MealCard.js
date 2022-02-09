import React, { useState } from "react";
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
    const handleCard = () => setCardFull(!cardFull)

    const cardClass = classNames({
        'cardFull': cardFull,
        'cardFolded': !cardFull 
    });

    const [isDinner, setidDinner] = useState(true)

    const mealClass = classNames({
        'dinnerCard': isDinner,
        'restMealsCard': !isDinner,
    });

    let img = cow

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


    // switch (cardMealType) {
    //     case "dinner":
    //         setDinner(true);
    //         break;
    //     case "breakfast":
    //         setBreakfast(true);
    //         break;
    //     case "supper":
    //         setSupper(true);
    //         break;
    //     case "dessert":
    //         setDessert(true);
    //         break;
    //     case "other":
    //         setOther(true);
    //         break;
    //     default: 
    //         setDinner(false)
    //         setBreakfast(false)
    //         setSupper(false)
    //         setDessert(false)
    //         setOther(false)
    // }

    const mealType = classNames({
        "cardDinner": true,
        "cardBreakfast": false,
        "cardSupper": false,
        "cardDessert": false,
        "cardOther": false,
    });


    return (
        <div>
            <MyButton
                buttonStyle='btn--meal-card'
                buttonShape='btn--square'
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
                            <h2>Nazwa dania</h2>
                        </div>
                    </div>
                </div>
            </MyButton>
        </div>
    )
}

export default MealCard