import React, {useContext, useEffect, useRef, useState} from "react";
import {Form, FormInstance, Input, InputNumber, InputRef} from "antd";

interface Item { //todo убрать
    key: string;
    Name: string;
    Phone: string;
    Address: string;
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: Item;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
   editing,
   dataIndex,
   title,
   inputType,
   record,
   index,
   children,
   ...restProps
}) => {
    const [editingKey, setEditingKey] = useState('');
    const [form] = Form.useForm();

    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    const edit = (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue({ name: '', age: '', address: '', ...record });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[{
                            required: true,
                            message: `Please Input ${title}!`,
                        }]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export {EditableCell};