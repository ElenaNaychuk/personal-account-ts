import {IContactUpdate} from "../../domain/IContact";
import React from "react";
import {Popconfirm, Typography} from "antd";

interface IEditComponentProps {
    editable:boolean;
    record:IContactUpdate;
    onSave:(id: number) => void;
    onEdit:(record: IContactUpdate) => void;
    onCancel:() => void;
}
const EditButtonComponent:React.FC<IEditComponentProps> = ({editable, record, onSave, onEdit, onCancel}) => {
    return (
        editable
            ? (
                <span>
                <Typography.Link
                    onClick={() => onSave(record.id)}
                    style={{marginRight: 8}}
                >
                    Save
                </Typography.Link>
                <Popconfirm title="Sure to cancel?" onConfirm={onCancel}>
                    <a>Cancel</a>
                </Popconfirm>
            </span>
            ) : (
                <Typography.Link onClick={() => onEdit(record)}>
                    Edit
                </Typography.Link>
            )
    )
}
export {EditButtonComponent};