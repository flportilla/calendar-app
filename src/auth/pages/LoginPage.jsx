import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useForm } from '../../../../journal-app/src/hooks/useForm';
import { useAuthStore } from '../../hooks/useAuthStore';
import './loginPage.css';

const loginFormFields = {
    loginEmail: '',
    loginPassword: ''
}

const registerFormFields = {
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
    registerName: '',
}

export const LoginPage = () => {

    const { startLogin, errorMessage, startRegister } = useAuthStore()


    const {
        loginEmail, loginPassword, onInputChange: onLoginInputChange,
    } = useForm(loginFormFields)

    const {
        registerEmail, registerPassword, registerPassword2, registerName, onInputChange: onRegisterInputChange, onResetForm
    } = useForm(registerFormFields)


    const loginSubmit = (event) => {
        event.preventDefault()
        startLogin({ email: loginEmail, password: loginPassword })

    }

    const registerSubmit = (event) => {
        event.preventDefault()

        if (registerPassword !== registerPassword2) {
            onResetForm()
            return Swal.fire("Error in registry", "Passwords don't match", 'error')
        }

        startRegister({
            name: registerName,
            email: registerEmail,
            password: registerPassword,
        })
    }

    useEffect((() => {
        if (errorMessage !== undefined) {
            Swal.fire('Authentication error', errorMessage, 'error')
        }
    }), [errorMessage])

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Login</h3>
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="email"
                                name="loginEmail"
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="password"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="d-grid mb-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Register</h3>
                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="name"
                                name="registerName"
                                value={registerName}
                                onChange={onRegisterInputChange}

                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="email"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="password"
                                name="registerPassword"
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repeat password"
                                name="registerPassword2"
                                value={registerPassword2}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="create account" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}