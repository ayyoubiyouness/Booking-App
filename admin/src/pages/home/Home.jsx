import React from 'react'
import Sidebar from '../../componenents/sidebar/Sidebar'
import Widget from '../../componenents/widget/Widget'
import Feautured from '../../componenents/feautured/Feautured'
import Chart from '../../componenents/chart/Chart'
import Navbar from '../../componenents/navbar/Navbar'
import List from '../../componenents/table/Table'
import './home.scss'
const Home = () => {
  return (
    <div className='home'>
      <Sidebar />
      <div className="homeContainer">
        <Navbar />

        <div className="widgets">
          <Widget type={"user"}/>
          <Widget type={"order"}/>
          <Widget type={"earning"}/>
          <Widget type={"balance"}/>
        </div>
        <div className="charts">
          <Feautured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <List />
        </div>
      </div>
    </div>
  )
}

export default Home
