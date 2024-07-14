import './header.css'
import {
    faBed,
    faCalendarDays,
    faCar,
    faPerson,
    faPlane,
    faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from 'react';
import { DateRange } from 'react-date-range';
import { format } from "date-fns";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Link, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/authContext';
const Header = ({ type }) => {
    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: "selection"

    }])
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 0
    })
    const [openOptions, setOpenOptions] = useState(false)
    const [destination, setDestination] = useState("")
    const navigate = useNavigate()

    const { dispatch } = useContext(SearchContext)
    const { user } = useContext(AuthContext)

    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
            };
        });

    }
    const handleClick = () => {
        dispatch({ type: "NEW_SEARCH", payload: { destination, date, options } })
        navigate("/hotels", { state: { destination, options, date } })


    }

    const handleDestination = (e) => {
        if (e.target.value) {
            const dest = e.target.value
            const destin = dest[0].toUpperCase() + dest.substring(1);
            setDestination(dest)
            console.log(destin)
        }
    }

    return (
        <div className='header'>
            <div className="heqderContainer">
                <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>

                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>

                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car rentals</span>

                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Attractions</span>

                    </div>


                </div>
                {type !== "list" && <>

                    <h1 className="headerTitle">Find your next stay</h1>
                    <p className="headerDesc">Get rewarded for your travels - unlock instant saving of 10% or more with a free yuoness Ayyoubi account</p>
                    {!user &&
                        <Link to='/login'>
                            <button className="headerBtn">Sign in / Register </button>
                        </Link>
                    }
                    <div className="headerSearch">

                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faBed} className='headerIcon' />
                            <input type='text' placeholder='Where are you going ?' className='headerSearchInput' onChange={(e) => handleDestination(e)} />

                        </div>
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
                            <span className="headerSearchText" onClick={() => setOpenDate(!openDate)} >
                                {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")} `}
                            </span>
                            {openDate && <DateRange
                                editableDateInputs={true}
                                onChange={item => setDate([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={date}
                                className='date'
                            />}



                        </div>
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faPerson} className='headerIcon' />
                            <span className="headerSearchtextt" onClick={() => setOpenOptions(!openOptions)}> {`${options.adult} adult . ${options.children} children . ${options.room} room`} </span>
                            {openOptions && <div className="options">
                                <div className="optionItem">
                                    <span className="optionText">Adult</span>
                                    <div className="optionCounter">
                                        <button className="optionCounterButton" onClick={() => handleOption("adult", "i")}>+</button>
                                        <span className="optionCounterNumber">{options.adult}</span>
                                        <button className="optionCounterButton" onClick={() => handleOption("adult", "d")} disabled={options.adult <= 1}>-</button>
                                    </div>
                                </div>

                                <div className="optionItem">
                                    <span className="optionText">Children</span>
                                    <div className="optionCounter">
                                        <button className="optionCounterButton" onClick={() => handleOption("children", "i")}>+</button>
                                        <span className="optionCounterNumber">{options.children}</span>
                                        <button className="optionCounterButton" onClick={() => handleOption("children", "d")} disabled={options.children <= 0}>-</button>
                                    </div>
                                </div>

                                <div className="optionItem">
                                    <span className="optionText">room</span>
                                    <div className="optionCounter">
                                        <button className="optionCounterButton" onClick={() => handleOption("room", "i")}>+</button>
                                        <span className="optionCounterNumber">{options.room}</span>
                                        <button className="optionCounterButton" onClick={() => handleOption("room", "d")} disabled={options.room <= 1} >-</button>
                                    </div>
                                </div>



                            </div>}

                        </div>
                        <button className="searchButton" onClick={handleClick}>Search</button>

                    </div>
                </>}



            </div>

        </div>
    )
}

export default Header
