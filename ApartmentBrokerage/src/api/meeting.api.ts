import axios from "axios";
import { Meet } from "../interfaces/meet.interface";
export const GetAllmeeting = async (token: string) => {
    try {
        if (!token) {
            throw new Error("token is undefined");


        }
        const response = await axios.get('http://localhost:3000/meetings', {
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




export const addMeeting = async (meeting: Meet, token: string) => {
    alert(JSON.stringify(meeting) + "      meeting" + token + "         token");
    try {
        if (!token) {
            throw new Error("Token is required");
        }
        alert("jhgfghjk")
        const response = await axios.post('http://localhost:3000/meetings', meeting, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        });
        alert(JSON.stringify(response))
        return response.data;
    } catch (error) {
        console.error(error);  
        throw new Error('db');
    }
};
export const deleteMeeting = async (id, token) => {
    alert('deleteMeeting    '+id+"             token="+token);
    try {
        if (!token) {
            throw new Error("Token is required");
        }


        const response = await axios.delete(`http://localhost:3000/meetings/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        });


        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to delete meeting');
    }
};
// פונקציה לעדכון דירה קיימת
export const updateMeeting = async (id, updatedMeeting, token) => {
    try {
        if (!token) {
            throw new Error("נדרש טוקן");
        }


        const response = await axios.put(`http://localhost:3000/meetings/${id}`, updatedMeeting, {
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
