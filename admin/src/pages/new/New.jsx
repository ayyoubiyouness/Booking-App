import React, { useState } from 'react';
import './new.scss';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from 'axios';
import Sidebar from '../../componenents/sidebar/Sidebar';
import Navbar from '../../componenents/navbar/Navbar';

const New = ({ inputs, title }) => {
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState({})

  const handleClick = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file first");
      return;
    }
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'upload'); // Ensure this is your actual upload preset

    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/ds9embh9b/image/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }

      });
      const { url } = res.data
      const newUser = {
        ...info,
        img: url,
      };
      console.log(newUser)
      await axios.post("http://localhost:8800/api/auth/register", newUser)
    } catch (error) {
      console.log(error);
    }

  }

  const handleChange = (event, label) => {
    setInfo((prev) => ({ ...prev, [label]: event.target.value }))
    
  }

  return (
    <div className='new'>
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className='bottom'>
          <div className="left">
            <img
              src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
              alt=''
            />
          </div>
          <div className='right'>
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image : <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type='file'
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              {inputs.map((input) => (
                <div className='formInput' key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} onChange={(e) => handleChange(e, input.dblabel)} />
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
