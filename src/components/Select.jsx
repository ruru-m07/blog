import { useId } from "react";
import React from 'react';

function Select({
    options,
    label,
    className = "",
    /*
    here className can also be written but we choose to declare it with empty string cause if someone didnt passed
    anything then its value will be null which we dont want, we want it to be in string format.
    */
    ...props
}, ref) {
    const Id = useId();
    return (
    <div className="w-full">
        {label && <label htmlFor={Id} className=""> </label>}
        <select
        {...props}
        id={Id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full
        ${className}`}     
        >
            {/* if the value in option array exist ,i.e, length > 0  then only map it 
            else it will crash cuz it will excess index out of memory*/ }
            
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  );
}

export default React.forwardRef(Select);