import React, { useEffect, useState } from 'react'
import Sidebar from '../../componenents/sidebar/Sidebar'
import Navbar from '../../componenents/navbar/Navbar'
import Chart from "../../componenents/chart/Chart";
import './single.scss'
import List from "../../componenents/table/Table";
import {userRows} from "../../datatablesource"
import { useLocation } from 'react-router-dom';
import axios from 'axios';
const Single = () => {
  const location = useLocation().pathname.split("/")[2]; 
  const path = useLocation().pathname.split("/")[1]; 
  const [data, setData] = useState([])
  console.log(location)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/${path}/${location}`)
        setData(res.data)       
      } catch (error) {
        console.log(error)
        
      }
    }
    fetchData()
  }, [path, location])
  return (
    <div className='single'>
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <button className="editButton">Edit</button>
            <div className="InfoSect">Informations</div>
            <div className="details">
              <div className="leftDetails">
                <img src={data.img ? data.img : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt='' />
              </div>
              <div className="rightDetails">
                <h1 className='titleProfil'> {data.username}</h1>
                <div className='detailInfo'>
                  <span className='first'>Email : </span>
                  <span className='second'>{data.email} </span>
                </div>
                <div className='detailInfo'>
                  <span className='first'>Phone : </span>
                  <span className='second'>0628906026 </span>
                </div>
                <div className='detailInfo'>
                  <span className='first'>Adresse :  </span>
                  <span className='second'>39 rue pierre curie Saint remy les chevreuese </span>
                </div>
                <div className='detailInfo'>
                  <span className='first'>Country : </span>
                  <span className='second'>USA </span>
                </div>
              </div>
            </div>
          </div>
          <div className='right'>
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">

          <h1 className='titlle'>Last Transactions </h1>
          <List />


        </div>

      </div>
    </div>
  )
}

export default Single
