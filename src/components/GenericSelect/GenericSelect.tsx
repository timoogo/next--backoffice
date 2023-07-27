import React from 'react';

interface Option {
  value: string | number;
  label: string;
}

interface Props<T> {
  name: string;
  options: T[];
 
}

const GenericSelect = <T extends Option>({ name, options }: Props<T>) => {
    return (
        <select name={name} id="">
        {options.map((option: T) => {
            return (
            <option value={option.value}>{option.label}</option>
            )
        }
        )}
        </select>
    )
    }
export default GenericSelect;
