import React from 'react';
import { Option, Props } from '@/interfaces/GenericSelect.interface';

export const GenericSelect = <T extends Option>({ name, options }: Props<T>) => {
    return (
        <select name={name} id="">
        {options.map((option: T) => {
            return (
            <option key={option.value} value={option.value}>{option.label}</option>
            )
        }
        )}
        </select>
    )
}
