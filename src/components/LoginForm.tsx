import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {Button, Form, Divider, Input} from 'antd';

interface FormValues {
    email?: string;
    password?: string;
}

const LoginForm:React.FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm<FormValues>();
    const [submittable, setSubmittable] = useState(false);
    const values = Form.useWatch([], form);

    useEffect(() => {
        form.validateFields({ validateOnly: true }).then(
            () => { setSubmittable(true) },
            () => { setSubmittable(false) },
        );
    }, [values]);

    const handleSubmit = (values:FormValues) => {
        console.log(values);
        form.resetFields();
    }

    return(
        <div className="login-form_container">
            <Divider>Log In</Divider>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{
                        required: true,
                        type: 'email',
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/,
                        message: 'Некорректный email!'
                    }]}
                >
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{
                        required: true,
                        min: 8,
                        message: 'Минимальная длина 8 символов!'
                    }]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Button
                    style={{ marginTop: '20px', marginBottom: '20px'}}
                    type="primary"
                    htmlType="submit"
                    block
                    danger
                    disabled={!submittable}
                >
                    Log in
                </Button>
            </Form>
            <Button onClick={() => navigate("/")}  type="text" block>Go Back</Button>
        </div>
    )
}
export {LoginForm};