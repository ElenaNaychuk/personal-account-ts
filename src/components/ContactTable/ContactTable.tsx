import React, {useEffect, useState} from "react";
import {Button, Form, Popconfirm, Table, Typography} from "antd";
import {EditableCell} from "./EditableCell";
import {useStore} from "../../mobx/store";
import {IContactUpdate} from "../../domain/IContact";
import {observer} from "mobx-react";

const ContactTable: React.FC = observer(() => {
    const {contactStore} = useStore();
    const [form] = Form.useForm();
    const [newRow, setNewRow] = useState<IContactUpdate | null>(null);
    const [editingKey, setEditingKey] = useState<null | number>(null);

    useEffect(() => {
        const getUserContacts = async () => {
            await contactStore.loadUserContacts();
        }
        getUserContacts();
    }, [])

    const isEditing = (record: IContactUpdate) => record.id === editingKey;

    const edit = (record: IContactUpdate) => {
        form.setFieldsValue({firstName: '', phone: '', address: '', ...record});
        setEditingKey(record.id);
    };

    const finishEditing = () => {
        setEditingKey(null);
        setNewRow(null);
    };

    const cancel = () => {
        finishEditing();
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as IContactUpdate;
            const index = contactStore.getUserContacts().findIndex((item) => key === item.id);
            if (index >= 0) {
                const item = contactStore.getUserContacts()[index];
                await contactStore.updateContact({...item, ...row});
            } else {
                await contactStore.addContact({...row});
            }
            finishEditing();
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const handleAdd = () => {
        setNewRow({id: 0});
        setEditingKey(0);
        form.setFieldsValue({firstName: "", phone: "", address: ""});
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
            render: (_: any, record: IContactUpdate) => {
                const editable = isEditing(record);
                return editable
                    ? (
                        <span>
                            <Typography.Link
                                onClick={() => save(record.id)}
                                style={{marginRight: 8}}
                            >
                                Save
                            </Typography.Link>
                            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                                <a>Cancel</a>
                            </Popconfirm>
                        </span>
                    ) : (
                        <Typography.Link onClick={() => edit(record)}>
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
            onCell: (record: IContactUpdate) => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    if(contactStore.isLoading) {
        return <p>Loading...</p>
    }
    return (
        <Form form={form} component={false}>
            <Button onClick={handleAdd} type="primary" style={{marginBottom: 16}}>
                Add a contact
            </Button>
            <Table
                components={{body: {cell: EditableCell}}}
                bordered
                dataSource={newRow ? [...contactStore.getUserContacts(), newRow] : contactStore.getUserContacts()}
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