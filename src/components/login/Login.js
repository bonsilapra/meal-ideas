import React, {useState} from 'react';
import { MyButton } from "../../commons/MyButtons";
import MyAxios from '../../commons/MyAxios'
import "./Login.css"
import { Navigate } from "react-router-dom";
import "../../commons/Commons.css"

function Login() {

    const [log, setLog] = useState(
            {
                login: "",
                password: "",
                isLogged: false
            }
        
    )

    const login = () => {
        MyAxios.post(`login`, {
            username: log.login,
            password: log.password,
        })
            .then((response) => {
                setLog({...log, isLogged: true})
                sessionStorage.setItem('isLogged', true);
            })
            .catch((error) => {
                console.log(error);
            })
    }


    return (
        <>
            {log.isLogged == false ?
                <div className="login-container">
                    <div>
                        <h1>Logowanie</h1>
                    </div>
                    <div>
                        <input 
                            type="text" 
                            placeholder="login"
                            onChange={e => {setLog({...log, login: e.target.value})}}
                        >
                        </input>
                    </div>
                    <div>
                        <input 
                            type="password" 
                            placeholder="hasło"
                            onChange={e => {setLog({...log, password: e.target.value})}}
                        >
                        </input>
                    </div>
                    <div className='login-button'>
                        <MyButton
                            buttonStyle='btn--primary'
                            buttonShape='btn--square'
                            buttonSize='btn--medium'
                            onClick={login}
                            aria-label='Zaloguj'
                        >
                            ZALOGUJ
                        </MyButton>
                    </div>
                </div> 
                :
                <Navigate to="/" />
            }
        </>
    )
}

export default Login