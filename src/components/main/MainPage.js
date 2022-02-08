import React from "react";
import { MyButton } from "../../commons/MyButtons";
import MealCard from "../meal/MealCard";
import "./MainPage.css"
import "../../commons/Commons.css"

function MainPage() {
    return (
        <div className="main-container">
            <div className="log-in-container">
                <MyButton
                    buttonStyle='btn--primary'
                    buttonShape='btn--square'
                    buttonSize='btn--medium'
                >
                    ZALOGUJ
                </MyButton>
            </div>
            <div className="title-container">
                <h1>Co dziś jemy?</h1>
            </div>
            {/* <MealCard /> */}
        </div>
    )
}

export default MainPage