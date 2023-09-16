import React from 'react';

interface Option {
  value: string | number;
  label: string;
}

interface Props<T> {
  name: string;
  options: T[];
}

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
