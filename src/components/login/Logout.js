import React, { useState } from 'react';
import { MyButton } from "../../commons/MyButtons";
import MyAxios from '../../commons/MyAxios'
import { Navigate } from "react-router-dom";
import "./Login.css"
import "../../commons/Commons.css"

function Logout() {

    const [islogged, setLog] = useState(true)

    const logout = () => 
    MyAxios.get(`logout`)
        .then((response) => {
            sessionStorage.clear();
            setLog(false)
        })
        .catch((error) => {
            console.log(error);
        })

    return (
        <>
            {islogged == true ? 
                <div className="login-container">
                    <div>
                        <h1>Zalogowany</h1>
                    </div>
                    <div className='login-button'>
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
                </div>
                :
                <Navigate to="/" />
            }
        </>
    )
}

export default Logout