import React from "react";
import {LoginForm} from "../components/LoginForm";

const LoginPage: React.FC = () => {
    return (
        <div className="login-page__container">
            <LoginForm/>
        </div>
    )
}
export {LoginPage};