import React from "react";
import {HeaderComponent} from "../components/Header";
import {Divider} from "antd";

const ContactPage:React.FC = () => {
    return (
        <div className="contacts-page__container">
            <HeaderComponent />
            <div style={{padding: '3em'}}>
                <Divider style={{fontSize: '24px'}}>Your contacts</Divider>
            </div>
        </div>
    )
}
export {ContactPage};