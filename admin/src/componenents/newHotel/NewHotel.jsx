import React, { useEffect, useState } from 'react'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from 'axios';
import { hotelInputs } from '../../formSource';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
const NewHotel = () => {
    const [files, setFiles] = useState("");
    const [info, setInfo] = useState({});
    const [rooms, setRooms] = useState([]);
    const [data, setData] = useState([])

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:8800/api/room/")
                setData(res.data)
            } catch (error) {
                console.log(error)

            }
        }
        fetchData()
    }, [])
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const list = await Promise.all(
                Object.values(files).map(async (file) => {
                    const data = new FormData();
                    data.append("file", file);
                    data.append("upload_preset", "upload");
                    const uploadRes = await axios.post('https://api.cloudinary.com/v1_1/ds9embh9b/image/upload', data, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }

                    });

                    const { url } = uploadRes.data;
                    return url;
                })
            );
            console.log(list)

            const newhotel = {
                ...info,
                rooms,
                photos: list,
            };
            console.log(newhotel)

            await axios.post("http://localhost:8800/api/hotels", newhotel);
            console.log(newhotel)
        } catch (err) { console.log(err) }
    };
    const handleSelect = (e) => {
        const value = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setRooms(value);
    };
    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Add New Hotel</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={
                                files
                                    ? URL.createObjectURL(files[0])
                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                        />
                    </div>
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    multiple
                                    onChange={(e) => setFiles(e.target.files)}
                                    style={{ display: "none" }}
                                />
                            </div>

                            {hotelInputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input
                                        id={input.id}
                                        onChange={handleChange}
                                        type={input.type}
                                        placeholder={input.placeholder}
                                    />
                                </div>
                            ))}
                            <div className="formInput">
                                <label>Featured</label>
                                <select id="featured" onChange={handleChange}>
                                    <option value={false}>No</option>
                                    <option value={true}>Yes</option>
                                </select>
                            </div>
                            <div className="selectRooms">
                                <label>Rooms</label>
                                <select id="rooms" multiple onChange={handleSelect}>
                                    {data &&
                                        data.map((room) => (
                                            <option key={room._id} value={room._id}>
                                                {room.title}
                                            </option>
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

export default NewHotel

