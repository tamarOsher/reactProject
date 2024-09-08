import { useContext, useEffect, useState } from "react";
import { addMeeting, updateMeeting, deleteMeeting, GetAllmeeting } from '../api/meeting.api';
import { Meet } from '../interfaces/meet.interface';
import { UserContext } from "../context/user.context";
import './meeting.css'

export const Meeting = () => {
    const [meetings, setMeetings] = useState<Meet[]>([]);
    const { token } = useContext(UserContext);
    const [showForm, setShowForm] = useState(false);
    const [meeting, setMeeting] = useState({
        name: "",
        date: "",
        time: "",
        location: "",
        description: ""
    });
    const [editMeetingId, setEditMeetingId] = useState(null);


    useEffect(() => {
        fetchMeetings();
    }, []);


    const fetchMeetings = async () => {
        try {
            const response = await GetAllmeeting(token);
            setMeetings(response);
        } catch (error) {
            console.error("Failed to fetch meetings:", error);
        }
    };


    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const response = await GetAllmeeting(token);
                setMeetings(response);
            } catch (error) {
                console.error(error);
            }
        };


        if (token) {
            fetchMeetings();
        }
    }, [token]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setMeeting({ ...meeting, [name]: value });
    };


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


    const handleDeleteMeeting = async (id) => {
        try {
            await deleteMeeting(id, token);
            alert("meeting deleted successfully!");
            fetchMeetings();
        } catch (error) {
            console.error(error);
            alert("Failed to delete meetings");
        }
    };


    const handleEditClick = (meeting) => {
        setEditMeetingId(meeting._id);
        setMeeting(meeting);
        setShowForm(true);
    };


    const handleSubmit = () => {
        alert("Please enter")
        if (editMeetingId) {
            handleUpdateMeeting();
        } else {
            handleAddMeeting();
        }
    };


    return (
        <div className="managerr-home">
            <h1>Hi meeting</h1>
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
            <div className="apartments-list">
                <h2>Your meetings</h2>
                <ul>
                    {meetings.map((meeting, index) => (
                        <li key={index} className="apartment-item">
                            <h3 className="name">{meeting.name}</h3>
                            <p className="date">{meeting.date}</p>
                            <p className="time">{meeting.time}</p>
                            <p className="location">{meeting.location}</p>
                            <p className="description">{meeting.description}</p>
                            <button onClick={() => handleDeleteMeeting(meeting._id)}>Delete</button>
                            <button onClick={() => handleEditClick(meeting)}>Edit</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};


