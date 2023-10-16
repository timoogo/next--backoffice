import React, { useState } from 'react';
import Form from './Form';
import {FormProp} from "@/interfaces/FormProps.interface";

const ChangeEmail: React.FC<FormProp> = ({title, description, isEncrypted}) => {
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
