import React from "react";
import {observer} from "mobx-react"
import {HeaderComponent} from "../components/Header";
import {Divider} from "antd";
import {useStore} from "../mobx/store";
import {ContactTable} from "../components/ContactTable/ContactTable";
import {Navigate} from "react-router-dom";
import {loginPagePath} from "../App";

const ContactPage: React.FC = observer(() => {
    const {authStore} = useStore();

    if (!authStore.isLoggedIn()) {
        return <Navigate to={loginPagePath} replace={true}/>;
    }
    return (
        <div className="contacts-page__container">
            <HeaderComponent/>
            <div style={{padding:'3em', paddingTop: '1em'}}>
                <Divider style={{fontSize: '24px'}}>Your contacts</Divider>
                <ContactTable/>
            </div>
        </div>
    )
})

export {ContactPage};