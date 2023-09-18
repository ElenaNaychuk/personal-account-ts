import React, {useEffect, useState} from "react";
import {Button, Form, Table, Typography, Modal } from "antd";
import {EditableCell} from "./EditableCell";
import {useStore} from "../../mobx/store";
import {IContactUpdate} from "../../domain/IContact";
import {observer} from "mobx-react";
import {EditButtonComponent} from "./EditButtonComponent";
import Search from "antd/es/input/Search";
import {SearchProps} from "antd/lib/input";

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

    const showErrorMessage = ( text:string):void => {
        Modal.error({
            title: "Error",
            content: `Не удалось ${text} контакт! Попробуйте ещё раз.`,
        })
    }

    const edit = (record: IContactUpdate):void => {
        form.setFieldsValue({name: '', phone: '', address: '', ...record});
        setEditingKey(record.id);
    };

    const finishEditing = ():void => {
        setEditingKey(null);
        setNewRow(null);
    };

    const cancel = ():void => {
        finishEditing();
    };

    const handleAdd = ():void => {
        setNewRow({id: 0});
        setEditingKey(0);
        form.setFieldsValue({name: "", phone: "", address: ""});
    };

    const save = async (key: React.Key):Promise<void> => {
        const row = (await form.validateFields()) as IContactUpdate;
        const index = contactStore.contacts.findIndex((item) => key === item.id);
        if (index >= 0) {
            const item = contactStore.contacts[index];
            const success = await contactStore.updateContact({...item, ...row});
            if(!success) {
                showErrorMessage("обновить");
            }
        } else {
            const success = await contactStore.addContact({...row});
            if(!success) {
                showErrorMessage("сохранить");
            }
        }
        finishEditing();
    };

    const handleDelete = async (record: IContactUpdate):Promise<void> => {
        const success = await contactStore.deleteContact(record);
        if(!success) {
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
                    <div style={{display: "flex", justifyContent:"space-between"}}>
                        <EditButtonComponent editable={editable} record={record} onSave={save} onEdit={edit} onCancel={cancel}/>
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
            onCell: (record: IContactUpdate) => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

    const findContact = (inputValue:string) => {


    }
    return (
        <Form form={form} component={false}>
            <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                <Button onClick={handleAdd} type="primary" style={{marginBottom: 16}}>
                    Add a contact
                </Button>
                <Search
                    placeholder="Search..."
                    onSearch={onSearch}
                    style={{maxWidth: "50%"}}
                    enterButton
                />
            </div>
            <Table
                components={{body: {cell: EditableCell}}}
                bordered
                dataSource={newRow ? [...contactStore.contacts, newRow] : contactStore.contacts}
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