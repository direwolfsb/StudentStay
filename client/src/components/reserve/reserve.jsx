import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Reserve({ setOpen, hotelId }) {
    const [selectedRooms, setSelectedRooms] = useState([]);
    const { data, loading, error } = useFetch(`http://localhost:8800/api/hotels/room/${hotelId}`);
    const { dates } = useContext(SearchContext);
    const { user } = useContext(AuthContext); // Get the user from AuthContext

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const date = new Date(start.getTime());
        let list = [];
        while (date <= end) {
            list.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }
        return list;
    };

    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
            alldates.includes(new Date(date).getTime())
        );
        return !isFound;
    };

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(checked
            ? [...selectedRooms, value]
            : selectedRooms.filter(item => item !== value));
    };

    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            await Promise.all(selectedRooms.map(roomId => {
                const res = axios.put(`http://localhost:8800/api/rooms/availability/${roomId}`, { dates: alldates });
                return res.data;
            }));
            setOpen(false);
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='reserve'>
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)} />
                <span>Select your rooms:</span>
                {data.map(item => (
                    <div className="rItem" key={item._id}>
                        <div className="rItemInfo">
                            <div className="rTitle">{item.title}</div>
                            <div className="rMax">Max people: <b>{item.maxPeople}</b></div>
                            <div className="rPrice"><b>Price: {item.price}</b></div>
                        </div>
                        {item.roomNumbers.map(roomNumber => (
                            <div className="room" key={roomNumber._id}>
                                <label>{roomNumber.number}</label>
                                <input
                                    type="checkbox"
                                    value={roomNumber._id}
                                    disabled={!isAvailable(roomNumber)}
                                    onChange={handleSelect}
                                />
                            </div>
                        ))}
                    </div>
                ))}
                {user ? (
                    <button className="rButton" onClick={handleClick}>Reserve Now!</button>
                ) : (
                    <span className="rMessage">Please log in to reserve.</span>
                )}
            </div>
        </div>
    )
}

export default Reserve;
