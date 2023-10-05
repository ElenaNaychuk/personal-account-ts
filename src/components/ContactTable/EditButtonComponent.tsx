import {IContact} from "../../domain/IContact";
import React, {useEffect, useState} from "react";
import {Popconfirm, Typography} from "antd";

interface IEditComponentProps {
    editable: boolean;
    record: Partial<IContact> & { id: number };
    onSave: (id: number) => void;
    onEdit: (record: Partial<IContact> & { id: number }) => void;
    onCancel: () => void;
    formFields: Partial<IContact>
}

const EditButtonComponent: React.FC<IEditComponentProps> = ({
    editable,
    record,
    onSave,
    onEdit,
    onCancel,
    formFields
}) => {
    const [isValidForm, setIsValidForm] = useState(false);

    useEffect(()=> {
        const { name, phone, address } = formFields;
        setIsValidForm(name !== '' && phone !== '' && address !== '');
    },[formFields])

    return (
        editable
            ? (
                <span>
                <Typography.Link
                    onClick={() => onSave(record.id)}
                    style={{marginRight: 8}}
                    disabled={!isValidForm}
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