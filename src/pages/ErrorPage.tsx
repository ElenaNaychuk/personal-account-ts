import React from "react";
import {HeaderComponent} from "../components/Header";

const ErrorPage:React.FC = () => {
    return (
        <div className="error-page__container">
            <HeaderComponent />
            <p style={{margin: "2em", textAlign: "center", fontSize:"20px"}}>Oops... The page doesn't exist</p>
        </div>
    )
}
export {ErrorPage};