import { useContext, useEffect, useState } from "react";
import { GetAllApartment, addApartment, deleteApartment, updateApartment } from "../api/apartment.api";
import { UserContext } from "../context/user.context";
import "./ManagerrHome.css";
import { useNavigate } from "react-router-dom";
import { apartment } from "../interfaces/apartment.interface";


export const ManagerrHome = () => {
    const { token } = useContext(UserContext);
    const navigate = useNavigate();
    const [apartments, setApartments] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [apartment, setApartment] = useState({
        price: "",
        NumOfRooms: "",
        description: "",
        address: "",
        Image: ""
    });
    const [editApartmentId, setEditApartmentId] = useState(null);


    useEffect(() => {
        fetchApartments();
    }, []);


    const fetchApartments = async () => {
        try {
            const response = await GetAllApartment(token);
            setApartments(response);
        } catch (error) {
            console.error("Failed to fetch apartments:", error);
        }
    };


    useEffect(() => {
        const fetchApartments = async () => {
            try {
                const response = await GetAllApartment(token);
                setApartments(response);
            } catch (error) {
                console.error(error);
            }
        };


        if (token) {
            fetchApartments();
        }
    }, [token]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setApartment({ ...apartment, [name]: value });
    };


    const handleAddApartment = async () => {
        try {
            await addApartment(apartment, token);
            alert("Apartment added successfully!");
            setShowForm(false);
            setApartment({
                price: "",
                NumOfRooms: "",
                description: "",
                address: "",
                Image: ""
            });
            fetchApartments();
        } catch (error) {
            console.error(error);
            alert("Failed to add apartment");
        }
    };


    const handleUpdateApartment = async () => {
        try {
            await updateApartment(editApartmentId, apartment, token);
            alert("Apartment updated successfully!");
            setShowForm(false);
            setEditApartmentId(null);
            setApartment({
                price: "",
                NumOfRooms: "",
                description: "",
                address: "",
                Image: ""
            });
            fetchApartments();
        } catch (error) {
            console.error("Failed to update apartment:", error);
            alert("Failed to update apartment");
        }
    };


    const handleDeleteApartment = async (id) => {
        try {
            await deleteApartment(id, token);
            alert("Apartment deleted successfully!");
            fetchApartments();
        } catch (error) {
            console.error(error);
            alert("Failed to delete apartment");
        }
    };


    const handleEditClick = (apartment) => {
        setEditApartmentId(apartment._id);
        setApartment(apartment);
        setShowForm(true);
    };


    const handleSubmit = () => {
        if (editApartmentId) {
            handleUpdateApartment();
        } else {
            handleAddApartment();
        }
    };
    const meet = ()=>{
        navigate('/meeting')
    }

    return (
        <div className="managerr-home">
            <h1>Hi Manager</h1>
            <button onClick={() => { setShowForm(!showForm); setEditApartmentId(null); }}>
                {showForm ? "Cancel" : "Add Apartment"}
            </button>
            {showForm && (
                <div className="apartment-form">
                    <input
                        type="text"
                        name="price"
                        placeholder="Price"
                        value={apartment.price}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={apartment.description}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={apartment.address}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="NumOfRooms"
                        placeholder="Number of Rooms"
                        value={apartment.NumOfRooms}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="Image"
                        placeholder="Image URL"
                        value={apartment.Image}
                        onChange={handleChange}
                    />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            )}
            <div className="apartments-list">
                <h2>Your Apartments</h2>
                <ul>
                    {apartments.map((apartment:apartment, index) => (
                        <li key={index} className="apartment-item">
                            <h3 className="price">${apartment.price}</h3>
                            <p className="description">{apartment.description}</p>
                            <p className="address">{apartment.address}</p>
                            <p className="rooms">Rooms: {apartment.NumOfRooms}</p>
                            <button onClick={() => handleDeleteApartment(apartment._id)}>Delete</button>
                            <button onClick={() => handleEditClick(apartment)}>Edit</button>
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={() => meet()}>פגישות</button>

            {/* <button onClick={() => navigate("/meeting")}>פגישות</button> */}
        </div>
    );
};




