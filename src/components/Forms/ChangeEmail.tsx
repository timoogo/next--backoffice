import React, { useState } from 'react';
import Form from './Form';
import {FormProp} from "@/types/FormProps";

    const ChangeEmail: React.FC<FormProp> = ({title, description, onChange, value, isEncrypted, onSubmit}) => {
    const [email, setUsername] = useState('');

    const handleUsernameChange = (value: string) => {
        setUsername(value);
    };

    const handleUsernameSubmit = () => {
        console.log('Nouveau email :', email);
        setUsername('');
    };

    return (
        <Form
            title={title}
            description={description}
            value={email}
            isEncrypted={isEncrypted}
            onChange={handleUsernameChange}
            onSubmit={handleUsernameSubmit}
        />
    );
};

export default ChangeEmail;
