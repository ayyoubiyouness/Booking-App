import React, { useEffect, useState } from 'react'
import './newroom.scss'
import Sidebar from '../sidebar/Sidebar'
import Navbar from '../navbar/Navbar'
import { roomInputs } from '../../formSource'
import axios from 'axios'
const NewRoom = () => {
    const [info, setInfo] = useState({});
    const [rooms, setRooms] = useState([]);
    const [hotelId, setHotelId] = useState(undefined);
    const [data, setData] = useState([])
    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:8800/api/hotels")
                setData(res.data)
            } catch (error) {
                console.log(error)

            }

        }
        fetchData()

    }, [])

    const handleClick = async (e) => {
        
        const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
        const test =  { ...info, roomNumbers }
        console.log(test)
        try {
            await axios.post(`http://localhost:8800/api/room/${hotelId}`, { ...info, roomNumbers });
            alert("room added succesfuly")
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Add New Room</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form>
                            {roomInputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input
                                        id={input.id}
                                        type={input.type}
                                        placeholder={input.placeholder}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}
                            <div className="formInput">
                                <label>Rooms</label>
                                <textarea
                                    onChange={(e) => setRooms(e.target.value)}
                                    placeholder="give comma between room numbers."
                                />
                            </div>
                            <div className="formInput">
                                <label>Choose a hotel</label>
                                <select
                                    id="hotelId"
                                    onChange={(e) => setHotelId(e.target.value)}
                                >
                                    {data &&
                                        data.map((hotel) => (
                                            <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                                        ))}
                                </select>
                            </div>
                            <button onClick={handleClick}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewRoom
