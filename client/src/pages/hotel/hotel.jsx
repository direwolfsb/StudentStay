import React, { useContext, useState } from 'react';
import "./hotel.css";
import Navbar from '../../components/navbar/navbar';
import Header from '../../components/header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../../hooks/useFetch';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext.jsx';
import { AuthContext } from '../../context/AuthContext';
import Reserve from '../../components/reserve/reserve';

function Hotel() {
  // Getting the hotel ID from the URL
  const location = useLocation();
  const id = location.pathname.split('/')[2];

  // Fetching hotel data based on the ID
  const { data, loading, error, reFetch } = useFetch(`http://localhost:8800/api/hotels/find/${id}`);

  // State for managing image slider
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // Getting dates from the search context
  const { dates } = useContext(SearchContext);
  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  // Getting user data from the auth context
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Function to calculate the difference in days between two dates
  function dayDifference(date1, date2) {
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
  }

  // Handling the image slider open event
  function handleOpen(i) {
    setSlideNumber(i);
    setOpen(true);
  }

  // Handling the booking or reservation button click
  function handleClick() {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />

      {loading ? (
        "Loading..."
      ) : (
        <div className="hotelContainer">
          {/* Image slider */}
          {open && (
            <div className='slider'>
              <FontAwesomeIcon icon={faCircleXmark} className='close' onClick={() => setOpen(false)} />
              <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={() => setSlideNumber((prev) => (prev === 0 ? data.photos.length - 1 : prev - 1))} />
              <div className="sliderWrapper">
                <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
              </div>
              <FontAwesomeIcon icon={faCircleArrowRight} className='arrow' onClick={() => setSlideNumber((prev) => (prev === data.photos.length - 1 ? 0 : prev + 1))} />
            </div>
          )}

          {/* Hotel details */}
          <div className="hotelWrapper">
          <button className="bookNow" onClick={handleClick}>Reserve or Book Now!</button>
            
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">{data.distance}m from USF</span>
            <span className="hotelPriceHighlight">Price ${data.cheapestPrice}</span>

            {/* Hotel images */}
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className='hotelImgWrapper' key={i}>
                  <img onClick={() => handleOpen(i)} className="hotelImg" src={photo} alt="" />
                </div>
              ))}
            </div>

            {/* Hotel description and booking details */}
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">Stay in the heart of the city</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>Located in the real heart of {data.city}, this property has an excellent location score of 9.8!</span>
                <h2>
                  <b>${days * data.cheapestPrice}</b> ({days} nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reservation modal */}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
}

export default Hotel;
