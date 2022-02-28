import React, {useState} from 'react';
import { MyButton } from "../../commons/MyButtons";
import MyAxios from '../../commons/MyAxios'
import "./Login.css"
import { Navigate } from "react-router-dom";
import "../../commons/Commons.css"

function Login() {

    const [log, setLog] = useState(
            {
                username: "",
                password: "",
                isLogged: false
            }
        
    )


    const login = () => {
        MyAxios.post(`login`, {
            username: log.username,
            password: log.password
        })
            .then((response) => {
                setLog({...log, isLogged: true})
                sessionStorage.setItem('isLogged', true);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            login()
        }
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
                            onChange={e => {setLog({...log, username: e.target.value})}}
                        >
                        </input>
                    </div>
                    <div>
                        <input 
                            type="password" 
                            placeholder="hasło"
                            onChange={e => {setLog({...log, password: e.target.value})}}
                            onKeyDown={handleKeyDown}
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