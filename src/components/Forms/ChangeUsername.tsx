import React, { useState } from 'react';
import Form from './Form';
import {FormProp} from "@/types/FormProps";


const ChangeUsername: React.FC<FormProp> = ({ title, description }) => {
    const [username, setUsername] = useState('');

    const handleUsernameChange = (value: string) => {
        setUsername(value);
    };

    const handleUsernameSubmit = () => {
        console.log('Nouveau nom d\'utilisateur :', username);
        setUsername('');
    };

    return (
        <Form
            title={title}
            description={description}
            value={username}
            isEncrypted={false}
            onChange={handleUsernameChange}
            onSubmit={handleUsernameSubmit}
        />
    );
};

export default ChangeUsername;
