import {EditButtonComponent} from "./EditButtonComponent";
import {Typography} from "antd";
import React from "react";
import {IContact} from "../../domain/IContact";

type ReturnValue = { dataIndex: string; editable: boolean; width: string; title: string }

type AcceptedArguments = {
    save: (id: number) => void;
    edit: (record: Partial<IContact> & { id: number }) => void;
    cancel: () => void;
    handleDelete: (record: Partial<IContact> & { id: number }) => void;
    isEditing: (record: Partial<IContact> & { id: number }) => boolean;
};

const getTableOptions: ({save, edit, cancel, handleDelete, isEditing}: AcceptedArguments) => [ReturnValue, ReturnValue, ReturnValue, {
    dataIndex: string;
    title: string;
    editable?: boolean,
    render: (_: React.HTMLAttributes<HTMLElement>, record: (Partial<IContact> & { id: number })) => React.JSX.Element
}] = (
    {save, edit, cancel, handleDelete, isEditing}) => {

    return [
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
            render: (_: React.HTMLAttributes<HTMLElement>, record: Partial<IContact> & { id: number }) => {
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
        }
    ];
}
export {getTableOptions};