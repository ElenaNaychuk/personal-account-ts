import React, {useState} from "react";
import {Layout, Menu, MenuProps, Avatar} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";
const { Header } = Layout;

const HeaderComponent:React.FC = () => {
    const [isUserLoggedIn, setUserLoggedIn] = useState(false);

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

    if (!isUserLoggedIn) {
        menuItems.push({
            label: <Link to="/login">Log In</Link>,
            key: "login",
            style: { marginLeft: 'auto' },
        });
    } else {
        menuItems.push({
            label: <Avatar style={{ backgroundColor: '#c5c4c4' }} size={32} icon={<UserOutlined />} />,
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