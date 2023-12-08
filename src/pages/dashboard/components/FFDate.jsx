import React from 'react';
import { DatePicker } from 'antd';
// import './FFDate.scss';
// import { DATE_FORMAT } from 'common/constant';

const Date = ({ onChange, defaultValue, clearIcon = false, placeholder = '' }) => {
    const handleDateChange = (value) => {
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <DatePicker
            defaultValue={defaultValue}
            // format={DATE_FORMAT}
            onChange={handleDateChange}
            clearIcon={clearIcon}
            placeholder={placeholder}
            className="date"
        />
    );
};

export default Date;
