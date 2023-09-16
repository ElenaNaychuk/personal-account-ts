import React, {useEffect, useState} from "react";
import {Form, Popconfirm, Table, Typography} from "antd";
import {EditableCell} from "./EditableCell";
import {useStore} from "../../mobx/store";
import {IContact} from "../../domain/IContact";
import {observer} from "mobx-react";

const ContactTable:React.FC = observer(() => {
    const {userStore} = useStore();
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState<null | number>(null);

    useEffect(()=>{
        const getUserContacts = async () => {
            await userStore.loadUserContacts();
        }
        getUserContacts();
    }, [])

    const isEditing = (record: IContact) => record.id === editingKey;

    const edit = (record: Partial<IContact> & { id: React.Key }) => {
        form.setFieldsValue({ name: '', age: '', address: '', ...record });
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey(null);
    };

    const save = async (key: React.Key) => {
        try {
            // const row = (await form.validateFields()) as IContact;
            // const newData = [...contacts];
            // const index = newData.findIndex((item) => key === item.id);
            // if (index > -1) {
            //     const item = newData[index];
            //     newData.splice(index, 1, {
            //         ...item,
            //         ...row,
            //     });
            //     setContacts(newData);
            //     setEditingKey(null);
            // } else {
            //     newData.push(row);
            //     setContacts(newData);
            //     setEditingKey(null);
            // }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'firstName',
            width: '25%',
            editable: true,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            width: '25%',
            editable: true,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            width: '25%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: IContact) => {
                const editable = isEditing(record);
                return editable
                    ? (
                        <span>
                            <Typography.Link onClick={() => save(record.id)} style={{ marginRight: 8 }}>
                                Save
                            </Typography.Link>
                            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                                <a>Cancel</a>
                            </Popconfirm>
                        </span>
                    ) : (
                        <Typography.Link
                            // disabled={editingKey !== 0}
                            onClick={() => edit(record)}
                        >
                            Edit
                        </Typography.Link>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: IContact) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <Form form={form} component={false}>
            <Table
                components={{body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={userStore.getUserContacts()}
                rowKey="id"
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
})
export {ContactTable}