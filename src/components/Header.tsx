import React from "react";
import {Layout, Menu, MenuProps} from 'antd';
import {Link} from "react-router-dom";
import {useStore} from "../mobx/store";
const { Header } = Layout;

const HeaderComponent:React.FC = () => {
    const {userStore} = useStore();

    const menuItems: MenuProps['items']  = [
        {
            label: <Link to="/">Home</Link>,
            key: "home",
        },
        {
            label: <Link to="/contacts">Contacts</Link>,
            key: "contacts",
        }

    ]

    if (!userStore.isLoggedUser()) {
        menuItems.push({
            label: <Link to="/login">Log In</Link>,
            key: "login",
            style: { marginLeft: 'auto' },
        });
    } else {
        menuItems.push({
            label: <Link to="/login" onClick={()=>{localStorage.removeItem("token")}}>Log Out</Link>,
            key: "user-icon",
            style: { marginLeft: 'auto'},
        });
    }
    
    return(
        <>
            <Header className="header-container">
                <Menu theme="dark" mode="horizontal" items={menuItems} />
            </Header>
        </>
    )
}
export {HeaderComponent};