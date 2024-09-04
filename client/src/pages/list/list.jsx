import React, { useState,useContext } from 'react';
import "./list.css";
import Navbar from '../../components/navbar/navbar';
import Header from '../../components/header/Header';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { DateRange } from "react-date-range";
import SearchItem from '../../components/searchitem/searchItem';
import useFetch from '../../hooks/useFetch';
import { SearchContextProvider,SearchContext } from '../../context/SearchContext';

function List() {
  // Retrieving state from the location object (passed via navigation)
  const location = useLocation();
  const { dispatch } = useContext(SearchContext);
  
  // State for managing destination, dates, and options
  const [destination, setDestination] = useState(location.state?.destination || "Tampa");
  const [dates, setDates] = useState(location.state?.dates || [{
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  }]);
  const [openDate, setOpenDate] = useState(false); // Toggle for the date picker
  const [options, setOptions] = useState(location.state?.options || {
    adult: 1,
    children: 0,
    room: 1,
  });

  // State for managing minimum and maximum price filters
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  // Fetching data from the API based on the search parameters
  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8800/api/hotels?city=${destination}&min=${min || 0}&&max=${max || 999}`
  );

  // Function to handle search button click and refetch data
  const handleClick = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { destination, dates, options },
    });
    reFetch();
  };

  return (
    <SearchContextProvider>
      <div>
        <Navbar />
        <Header type="list" />
        <div className="listContainer">
          <div className="listWrapper">
            
            {/* Search filters */}
            <div className="listSearch">
              <h1 className="lsTitle">Search</h1>

              {/* Destination filter */}
              <div className="lsItem">
                <label>Destination</label>
                <input 
                  placeholder={destination} 
                  onChange={(e) => setDestination(e.target.value)} 
                  type="text" 
                />
              </div>

              {/* Date filter */}
              <div className="lsItem">
                <label>Date</label>
                <span onClick={() => setOpenDate(!openDate)}>
                  {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                </span>
                {openDate && (
                  <DateRange
                    onChange={(item) => setDates([item.selection])}
                    minDate={new Date()}
                    ranges={dates}
                  />
                )}
              </div>
              
              {/* Options filter (min price, max price, number of people) */}
              <div className="lsItem">
                <div className="lsOptions">
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Min price <small>per night</small></span>
                    <input 
                      type="number" 
                      onChange={(e) => setMin(e.target.value)} 
                      className="lsOptionInput" 
                    />
                  </div>

                  <div className="lsOptionItem">
                    <span className="lsOptionText">Max price <small>per night</small></span>
                    <input 
                      type="number" 
                      onChange={(e) => setMax(e.target.value)} 
                      className="lsOptionInput" 
                    />
                  </div>

                  <div className="lsOptionItem">
                    <span className="lsOptionText">People</span>
                    <input
                      type="number"
                      min={1}
                      className="lsOptionInput"
                      placeholder={options.adult}
                    />
                  </div>
                </div>
              </div>

              {/* Search button */}
              <button onClick={handleClick}>Search</button>
            </div>

            {/* Search results */}
            <div className="listResult">
              {loading ? "loading text" : (
                <>
                  {data.map(item => (
                    <SearchItem item={item} key={item._id} />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </SearchContextProvider>
  );
}

export default List;
