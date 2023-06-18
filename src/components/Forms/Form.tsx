import React, { useState } from 'react';
import { FormProp } from "@/types/FormProps";

const Form: React.FC<FormProp> = ({ title, description, value, isEncrypted, onChange, onSubmit }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit();
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <p className="text-gray-600">{description}</p>
                    <p className="text-lg mt-4">
                        Nouvelle valeur :{' '}
                        {isEncrypted ? '*'.repeat(value!.length) : value}
                    </p>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="text-lg font-bold" htmlFor="newValue">
                                Nouvelle valeur
                            </label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                type="text"
                                id="newValue"
                                name="newValue"
                                value={value}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Soumettre
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Form;
