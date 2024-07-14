import { useLocation } from 'react-router-dom'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import './list.css'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns";
import { DateRange } from 'react-date-range';
import { useState } from 'react';
import SearchItem from '../../components/searchItem/SearchItem';
import useFetch from '../../components/hooks/useFetch';

const List = () => {
    const [openDate, setOpenDate] = useState(false)
    const location = useLocation()
    const [date, setDate] = useState(location.state.date)
    const [destination, setDestination] = useState(location.state.destination)
    const [options, setOptions] = useState(location.state.options)
    const [min, setMin] = useState(undefined)
    const [max, setMax] = useState(undefined)
    console.log(destination)
    const { data, loading, error, reFetch } = useFetch(`http://localhost:8800/api/hotels?city=${destination}&min=${min || 0}&max=${max || 9999}`)
    

    const handleClick =() =>{
        reFetch()
    }


    console.log("Hello")
    console.log(destination)
    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle">Search</h1>
                        <div className="lsItem">
                            <label >Destination</label>
                            <input type="text" placeholder={destination} onChange={(event)=> setDestination(event.target.value)} />
                        </div>
                        <div className="lsItem">
                            <label >Check in date</label>
                            <span onClick={() => setOpenDate(!openDate)}>{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")} `}</span>
                            {openDate && (
                                <DateRange
                                    className='dateRange'
                                    onChange={(item) => setDate([item.selection])}
                                    minDate={new Date()}
                                    ranges={date}
                                />
                            )}

                        </div>
                        <div className="lsItem">
                            <label >Options</label>
                            <div className="lsOptions">
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Min price <small>per night</small>
                                    </span>
                                    <input type="number" className="lsOptionInput" min={0} onChange={(e)=>setMin(e.target.value)} />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Max price <small>per night</small>
                                    </span>
                                    <input type="number" className="lsOptionInput" onChange={(e)=>setMax(e.target.value)}/>
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Adult</span>
                                    <input type="number" className="lsOptionInput" placeholder={options.adult} min={1} />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Children</span>
                                    <input type="number" className="lsOptionInput" placeholder={options.children} min={0} />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Room</span>
                                    <input type="number" className="lsOptionInput" placeholder={options.room} min={1} />
                                </div>
                            </div>

                        </div>
                        <button onClick={handleClick}>Search</button>

                    </div>
                    <div className="listResult">
                        {loading ? (
                            "loading"
                        ) : (
                            <>
                                {data.map((item) => (
                                    <SearchItem item={item} key={item._id} />
                                ))}
                            </>
                        )}




                    </div>
                </div>
            </div>


        </div>
    )
}

export default List
