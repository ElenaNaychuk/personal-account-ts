import React, {ChangeEvent, useEffect, useState} from "react";
import {Button, Form, Modal, Table, Typography} from "antd";
import {EditableCell} from "./EditableCell";
import {useStore} from "../../mobx/store";
import {observer} from "mobx-react";
import {EditButtonComponent} from "./EditButtonComponent";
import Search from "antd/es/input/Search";
import {IContact, IContactUpdate} from "../../domain/IContact";
import {Spinner} from "../Spinner";

const ContactTable: React.FC = observer(() => {
    const {contactStore} = useStore();
    const [form] = Form.useForm();
    const [newRow, setNewRow] = useState<Partial<IContact> & { id: number } | null>(null);
    const [editingKey, setEditingKey] = useState<null | number>(null);
    const [contacts, setContacts] = useState<IContact[]>([]);

    useEffect(() => {
        setContacts(contactStore.contacts);
    }, [contactStore.contacts])

    useEffect(() => {
        contactStore.loadContacts();
    }, [])

    const isEditing = (record: Partial<IContact> & { id: number }) => record.id === editingKey;

    const showErrorMessage = (text: string): void => {
        Modal.error({
            title: "Error",
            content: `Не удалось ${text} контакт! Попробуйте ещё раз.`,
        })
    }

    const edit = (record: Partial<IContact> & { id: number }): void => {
        form.setFieldsValue({name: '', phone: '', address: '', ...record});
        setEditingKey(record.id);
    };

    const finishEditing = (): void => {
        setEditingKey(null);
        setNewRow(null);
    };

    const cancel = (): void => {
        finishEditing();
    };

    const handleAdd = (): void => {
        setNewRow({id: 0});
        setEditingKey(0);
        form.setFieldsValue({name: "", phone: "", address: ""});
    };

    const save = async (key: React.Key): Promise<void> => {
        const row = (await form.validateFields()) as Partial<IContact> & { id: number };
        const index = contacts.findIndex((item) => key === item.id);
        if (index >= 0) {
            const item = contacts[index];
            const success = await contactStore.updateContact({...item, ...row});
            if (!success) {
                showErrorMessage("обновить");
            }
        } else {
            const success = await contactStore.addContact({...row});
            if (!success) {
                showErrorMessage("сохранить");
            }
        }
        finishEditing();
        setContacts(contactStore.contacts);
    };

    const handleDelete = async (record: Partial<IContact> & { id: number }): Promise<void> => {
        const success = await contactStore.deleteContact(record);
        if (!success) {
            showErrorMessage("удалить");
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
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
            title: 'Action',
            dataIndex: 'action',
            render: (_: React.HTMLAttributes<HTMLElement>, record: IContactUpdate) => {
                const editable = isEditing(record);
                return (
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <EditButtonComponent
                            editable={editable}
                            record={record}
                            onSave={save}
                            onEdit={edit}
                            onCancel={cancel}
                        />
                        <Typography.Link onClick={() => handleDelete(record)}>
                            Delete
                        </Typography.Link>
                    </div>
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
            onCell: (record: Partial<IContact> & { id: number }) => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const findContact = (inputValue: string) => {
        setContacts(contactStore.contacts.filter(contact => {
            inputValue = inputValue.toLowerCase();
            return [contact.name, contact.phone, contact.address]
                .some(contactProp => contactProp.toLowerCase().includes(inputValue));
        }));
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        if (inputValue !== '') {
            findContact(inputValue);
        } else {
            setContacts(contactStore.contacts)
        }
    };

    if (!contactStore.contacts.length) {
        return <Spinner/>
    }

    return (
        <Form form={form} component={false}>
            <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                <Button onClick={handleAdd} type="primary" style={{marginBottom: 16, marginRight: 5}}>
                    Add a contact
                </Button>
                <Search
                    placeholder="Search..."
                    style={{maxWidth: "50%"}}
                    enterButton
                    onChange={handleInputChange}
                />
            </div>
            <Table
                components={{body: {cell: EditableCell}}}
                bordered
                dataSource={newRow ? [...contacts, newRow] : contacts}
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