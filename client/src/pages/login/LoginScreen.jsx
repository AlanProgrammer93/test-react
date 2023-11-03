import React, { useState } from 'react'
import './LoginScreen.css'
import clientAxios from '../../utils/axios';
import MessageError from '../../components/messageError/MessageError';

const loginData = {
    username: "",
    password: "",
};

const LoginScreen = () => {
    const [showMessageError, setShowMessageError] = useState("")
    const [login, setLogin] = useState(loginData);
    const { username, password } = login;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
    };

    const loginSubmit = async () => {
        try {
            if (!username || !password) {
                setShowMessageError("Debe completar todos los campos")
                setInterval(() => {
                    setShowMessageError("")
                }, 2500)
                return
            }

            await clientAxios.post('/auth/login',
                {
                    username,
                    password
                }
            )
                .then(res => {

                    localStorage.setItem('token', res.data.token)
                    console.log(res.data);
                    // TODO: logica para guardar en local storage y en redux y redirigir al home
                })
                .catch(err => {
                    setShowMessageError(err.response.data.msg)
                    setInterval(() => {
                        setShowMessageError("")
                    }, 2500)
                });
        } catch (error) {
            setShowMessageError("Ocurrio un error!. Intentelo otra ves.")
            setInterval(() => {
                setShowMessageError("")
            }, 2500)
        }
    };

    return (
        <div className='container'>
            <div className='form_container'>
                <div className='form'>
                    <h2>Iniciar Sesion</h2>
                    <div className='inputBox'>
                        <input
                            type='text'
                            placeholder='Usuario'
                            name='username'
                            onChange={handleChange}
                            value={username}
                        />
                    </div>
                    <div className='inputBox'>
                        <input
                            type='password'
                            placeholder='Contraseña'
                            name='password'
                            onChange={handleChange}
                            value={password}
                        />
                    </div>
                    <div className='inputBox group'>
                        <a href='#'>Recuperar Contraseña</a>
                        <a href='#'>Registrarse</a>
                    </div>
                    <div className='inputBox'>
                        <button onClick={loginSubmit}>Iniciar Sesion</button>
                    </div>
                </div>
            </div>
            {
                showMessageError && <MessageError text={showMessageError} />
            }
        </div>
    )
}

export default LoginScreen