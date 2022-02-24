import React, { useState } from 'react';
import { MyButton } from "../../commons/MyButtons";
import MyAxios from '../../commons/MyAxios'
import "./Add.css"
import "../../commons/Commons.css"

function AddFiller() {


    // const addMeal = () => 
    // MyAxios.get(`logout`)
    //     .then((response) => {
    //         sessionStorage.clear();
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })

    return (
        <div className='add-meal-button'>
            <MyButton
                buttonStyle='btn--primary'
                buttonShape='btn--square'
                buttonSize='btn--medium'
                // onClick={addMeal}
                title='Dodaj dodatek'
            >
                <i className="fas fa-plus"></i>&nbsp;&nbsp;<i className="fas fa-bread-slice"></i>
            </MyButton>
        </div>
    )
}

export default AddFiller