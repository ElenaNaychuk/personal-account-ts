import React from 'react';
import { Spin } from 'antd';

const Spinner: React.FC = () => {
    return (
        <Spin tip="Loading" size="large" style={{marginTop: 50}}>
            <div className="content"/>
        </Spin>
    )
};

export {Spinner};