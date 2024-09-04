import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCalendarDays, faPerson, faSearch, faInfoCircle, faHome } from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import "react-date-range/dist/styles.css"; // Main CSS for date range picker
import "react-date-range/dist/theme/default.css"; // Theme CSS for date range picker
import { SearchContext } from '../../context/SearchContext.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
import "./header.css";

function Header({ type }) {
    const [destination, setDestination] = useState("");
    const [openDate, setOpenDates] = useState(false);
    const [dates, setDates] = useState([{ startDate: new Date(), endDate: new Date(), key: "selection" }]);
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 });
    const [highlightDates, setHighlightDates] = useState(false); // State to highlight date picker

    const { dispatch } = useContext(SearchContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleOption = (name, operation) => {
        setOptions(prev => ({ ...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1 }));
    };

    const calculateDayDifference = (startDate, endDate) => {
        const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
        return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    };

    const handleSearch = () => {
        const dayDifference = calculateDayDifference(dates[0].startDate, dates[0].endDate);
        if (dayDifference > 2) { // Ensure the date range is more than 2 days
            dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
            navigate("/hotels", { state: { destination, dates, options } });
        } else {
            setHighlightDates(true); // Highlight date picker
            alert("Please select a date range that spans more than two days."); // Show alert
        }
    };

    return (
        <div className='header'>
            <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
                <div className="headerList">
                    <Link to="/" className="headerLink">
                        <div className="headerListitem">
                            <FontAwesomeIcon icon={faHome} />
                            <span>Home</span>
                        </div>
                    </Link>
                    <Link to="/list" className="headerLink">
                        <div className="headerListitem">
                            <FontAwesomeIcon icon={faSearch} />
                            <span>Search</span>
                        </div>
                    </Link>
                    <Link to="/aboutus" className="headerLink">
                        <div className="headerListitem">
                            <FontAwesomeIcon icon={faInfoCircle} />
                            <span>About us</span>
                        </div>
                    </Link>
                </div>

                {type !== "list" && (
                    <>
                        <h1 className="headerTitle">Welcome to StudentStay!</h1>
                        <p className="headerDesc">
                            Helping you find the perfect accommodation for your academic journey with ease and confidence.
                        </p>
                        

                        <div className="headerSearch">
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                                <input
                                    type="text"
                                    placeholder="Where are you going?"
                                    className="headerSearchInput"
                                    onChange={(e) => setDestination(e.target.value)}
                                />
                            </div>

                            <div className={`headerSearchItem ${highlightDates ? 'highlight' : ''}`}>
                                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                                <span onClick={() => setOpenDates(!openDate)} className="headerSearchText">
                                    {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                                </span>
                                {openDate && (
                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={(item) => {
                                            setDates([item.selection]);
                                            setHighlightDates(false); // Remove highlight when a valid date range is selected
                                        }}
                                        moveRangeOnFirstSelection={false}
                                        ranges={dates}
                                        className="date"
                                        minDate={new Date()}
                                    />
                                )}
                            </div>

                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                                <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText">
                                    {`${options.adult} Adult  ${options.room} room`}
                                </span>
                                {openOptions && (
                                    <div className="options">
                                        <div className="optionitem">
                                            <span className="optionText">Adult</span>
                                            <div className="optionCounter">
                                                <button disabled={options.adult < 1} className="optionCounterButton" onClick={() => handleOption("adult", "d")}>-</button>
                                                <span className="optionCounterNumber">{options.adult}</span>
                                                <button className="optionCounterButton" onClick={() => handleOption("adult", "i")}>+</button>
                                            </div>
                                        </div>
                                        <div className="optionitem">
                                            <span className="optionText">Room</span>
                                            <div className="optionCounter">
                                                <button disabled={options.room < 1} className="optionCounterButton" onClick={() => handleOption("room", "d")}>-</button>
                                                <span className="optionCounterNumber">{options.room}</span>
                                                <button className="optionCounterButton" onClick={() => handleOption("room", "i")}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="headerSearchItem">
                                <button className="headerBtn" onClick={handleSearch}>Search</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;
