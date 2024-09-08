// UserHome.tsx

import React, { useContext, useEffect, useState } from 'react';
import { GetAllApartment, SearchApartments } from '../api/apartment.api';
import { UserContext } from '../context/user.context';
import SearchApartmentsForm from './SearchApartmentsForm';
import './userHome.css';
import { Meet } from '../interfaces/meet.interface';
import { GetAllmeeting, addMeeting, updateMeeting } from '../api/meeting.api';

export const UserHome: React.FC = () => {
    const { token } = useContext(UserContext);
    const [apartments, setApartments] = useState<any[]>([]); // כאן יש להגדיר את סוג המערך של apartments בהתאם לנתונים שמקבלים מהAPI

    useEffect(() => {
        fetchApartments();
    }, [token]);

    const fetchApartments = async () => {
        try {
            const response = await GetAllApartment(token);
            setApartments(response);
        } catch (error) {
            console.error('Failed to fetch apartments:', error);
        }
    };

    const handleSearch = async (searchParams: any) => { 
        try {
            const response = await SearchApartments(searchParams,token);
            alert("Search")
            setApartments(response);
        } catch (error) {
            console.error('Failed to search apartments:', error);
        }
    };
    const [editMeetingId, setEditMeetingId] = useState(null);

    const handleSubmit = () => {
        alert("Please enter")
        if (editMeetingId) {
            handleUpdateMeeting();
        } else {
            handleAddMeeting();
        }
    };
    const handleUpdateMeeting = async () => {
        try {
            await updateMeeting(editMeetingId, meeting, token);
            alert("meeting updated successfully!");
            setShowForm(false);
            setEditMeetingId(null);
            setMeeting({
                name: "",
                date: "",
                time: "",
                location: "",
                description: ""
            });
            fetchMeetings();
        } catch (error) {
            console.error("Failed to update meetings:", error);
            alert("Failed to update meetings");
        }
    };
    const [showForm, setShowForm] = useState(false);
    const [meetings, setMeetings] = useState<Meet[]>([]);
    const [meeting, setMeeting] = useState({
        name: "",
        date: "",
        time: "",
        location: "",
        description: ""
    });
    const handleAddMeeting = async () => {
        try {
            await addMeeting(meeting, token);
            alert("meeting added successfully!");
            setShowForm(false);
            setMeeting({
                name: "",
                date: "",
                time: "",
                location: "",
                description: ""
            });
            fetchMeetings();
        } catch (error) {
            console.error(error);
            alert("Failed to add meeting");
        }
    };

    const fetchMeetings = async () => {
        try {
            const response = await GetAllmeeting(token);
            setMeetings(response);
        } catch (error) {
            console.error("Failed to fetch meetings:", error);
        }
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMeeting({ ...meeting, [name]: value });
    };



    return (
        <div className="container">
            <h1>Welcome, User!</h1>
            <SearchApartmentsForm onSearch={handleSearch} />
            <ul className="apartments-list">
                {apartments.map((apartment, index) => (
                    <li key={index} className="apartment-item">
                        <h3 className="price">${apartment.price}</h3>
                        <p className="description">{apartment.description}</p>
                        <p className="address">{apartment.address}</p>
                        <p className="rooms">Rooms: {apartment.numOfRooms}</p>
                    </li>
                ))}
            </ul>
              <button onClick={() => { setShowForm(!showForm); setEditMeetingId(null); }}>
                {showForm ? "Cancel" : "Add meeting"}
            </button>
            {showForm && (
                <div className="meetings-form">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={meeting.name}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        name="date"
                        placeholder="Date"
                        value={meeting.date}
                        onChange={handleChange}
                    />
                    <input
                        type="time"
                        name="time"
                        placeholder="Time"
                        value={meeting.time}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={meeting.location}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={meeting.description}
                        onChange={handleChange}
                    />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
                )}
        </div>
    );
};

export default UserHome;
