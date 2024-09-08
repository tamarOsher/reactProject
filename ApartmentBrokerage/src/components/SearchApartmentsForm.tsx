// SearchApartmentsForm.jsx

import React, { useState } from 'react';
import './SearchApartmentForm.css';
const SearchApartmentsForm = ({ onSearch }) => {
    const [searchParams, setSearchParams] = useState({
        price: '',
        NumOfRooms: '',
        address: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams({ ...searchParams, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchParams);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="price" placeholder="Price" value={searchParams.price} onChange={handleChange} />
            <input type="text" name="NumOfRooms" placeholder="NumOfRooms" value={searchParams.NumOfRooms} onChange={handleChange} />
            <input type="text" name="address" placeholder="Address" value={searchParams.address} onChange={handleChange} />
            <input type="text" name="description" placeholder="Description" value={searchParams.description} onChange={handleChange} />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchApartmentsForm;
