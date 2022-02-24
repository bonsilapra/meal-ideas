import React, { useState } from 'react';
import { MyButton } from "../../commons/MyButtons";
import MyAxios from '../../commons/MyAxios'
import "./Login.css"
import "../../commons/Commons.css"

function Logout() {


    const logout = () => 
    MyAxios.get(`logout`)
        .then((response) => {
            sessionStorage.clear();
        })
        .catch((error) => {
            console.log(error);
        })

    return (
        <div className='logout-button'>
            <MyButton
                buttonStyle='btn--primary'
                buttonShape='btn--square'
                buttonSize='btn--medium'
                onClick={logout}
                aria-label='Wyloguj'
            >
                WYLOGUJ
            </MyButton>
        </div>
    )
}

export default Logout