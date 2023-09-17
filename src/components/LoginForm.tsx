import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Form, Divider, Input} from 'antd';
import {useStore} from "../mobx/store";
import Credentials from "../domain/Credentials";

interface FormValues {
    email?: string;
    password?: string;
}

const LoginForm:React.FC = () => {
    const navigate = useNavigate();
    const { userStore } = useStore();
    const [form] = Form.useForm<FormValues>();
    const [submittable, setSubmittable] = useState(false);
    const [error, setError] = useState('');
    const values = Form.useWatch([], form);

    useEffect(() => {
        form.validateFields({ validateOnly: true }).then(
            () => { setSubmittable(true) },
            () => { setSubmittable(false) },
        );
    }, [values]);

    const handleSubmit = async (values:FormValues) => {
        const success = await userStore.loginUser(new Credentials(values.email as string, values.password as string));
        if(!success) {
            setError("Неверный email или пароль.");
            return;
        }else {
            form.resetFields();
            navigate(-1);
        }
    }

    return(
        <div className="login-form_container">
            <Divider>Log In</Divider>
            <p>{error}</p>
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
                    <Input placeholder="Email" size="large"/>
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
                    <Input.Password placeholder="Password"  size="large"/>
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