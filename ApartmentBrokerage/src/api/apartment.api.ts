import axios from "axios";
import { apartment } from "../interfaces/apartment.interface";
export const GetAllApartment = async (token: string) => {
    try {
        if (!token) {
            throw new Error("token is undefined");

        }
        const response = await axios.get('http://localhost:3000/apartment', {
            headers: {

                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }
    catch (error) {
        throw new Error('failed to get')
    }
};


export const addApartment = async (apartment: apartment, token: string) => {
    alert(JSON.stringify(apartment) + "      apartment" + token + "         token");
    try {
        if (!token) {
            throw new Error("Token is required");
        }
        alert("jhgfghjk")
        const response = await axios.post('http://localhost:3000/apartment', apartment, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        });
        alert("jhgfghjkghjikl;';lkjvm")

        return response.data;
    } catch (error) {
        console.error(error);  
        throw new Error('db');
    }
};
export const deleteApartment = async (id, token) => {
    alert('deleteApartment    '+id+"             token="+token);
    try {
        if (!token) {
            throw new Error("Token is required");
        }

        const response = await axios.delete(`http://localhost:3000/apartment/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to delete apartment');
    }
};
// פונקציה לעדכון דירה קיימת
export const updateApartment = async (id, updatedApartment, token) => {
    try {
        if (!token) {
            throw new Error("נדרש טוקן");
        }

        const response = await axios.put(`http://localhost:3000/apartment/${id}`, updatedApartment, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('נכשל בעדכון הדירה');
    }
};
export const SearchApartments = async (searchParams,token) => {
    try {
        
        const response = await axios.get(`http://localhost:3000/apartment/search`, {
            
            params: searchParams,
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        alert("Search")
        return response.data;
    } catch (error) {
        throw new Error('Failed to search apartments');
    }
};