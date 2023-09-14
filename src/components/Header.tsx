import React from "react";
import {Layout, Menu, Space} from 'antd';
import {Link} from "react-router-dom";
import "./Header.css"
const { Header } = Layout;


const HeaderComponent:React.FC = () => {
    return(
        <>
            <Header className="header-container">
                <div className="logo" />
                    <Menu theme="dark" mode="horizontal" className="header__menu">
                        <Link to="/" className="ant-menu-item">
                            Home
                        </Link>
                        <div style={{ marginLeft: 'auto' }}>
                            <Space>
                                <Link to="/login" className="ant-menu-item">
                                    Log In
                                </Link>
                                <Link to="/contacts" className="ant-menu-item">
                                    Contacts
                                </Link>
                            </Space>
                       </div>
                    </Menu>
            </Header>
        </>
    )
}
export {HeaderComponent};