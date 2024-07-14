import React from 'react'
import Sidebar from '../../componenents/sidebar/Sidebar'
import Navbar from '../../componenents/navbar/Navbar'
import './list.scss'
import Datatable from '../../componenents/datatable/Datatable'
const List = ({columns}) => {
  return (
    <div className='list'>
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable columns = {columns} />
      </div>
    </div>
  )
}

export default List
