import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./featured.css";
import useFetch from '../../hooks/useFetch';

function Featured() {
  // Fetch the number of properties in each city
  const { data, loading, error } = useFetch(
    "http://localhost:8800/api/hotels/countByCity?cities=Tampa,Clearwater,St. Petersburg"
  );
  
  // Hook to navigate to other routes
  const navigate = useNavigate();

  // Function to handle click and navigate to the List page with default search values
  const handleClick = (city) => {
    navigate("/list", {
      state: {
        destination: city,
        dates: [
          {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
          },
        ],
        options: {
          adult: 1,
          children: 0,
          room: 1,
        },
      },
    });
  };

  return (
    <div className="featured">
      {/* Display loading text while data is being fetched */}
      {loading ? (
        "Loading, please wait..."
      ) : (
        <>
          {/* Tampa featured item */}
          <div className="featuredItem" onClick={() => handleClick("Tampa")}>
            <img
              src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/01/16/13/tampa-view.jpg"
              alt="Tampa"
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Tampa</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          {/* Clearwater featured item */}
          <div className="featuredItem" onClick={() => handleClick("Clearwater")}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Florida-Clearwater-Beach.jpg"
              alt="Clearwater"
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Clearwater</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>

          {/* St. Petersburg featured item */}
          <div className="featuredItem" onClick={() => handleClick("St. Petersburg")}>
            <img
              src="https://149373637.v2.pressablecdn.com/wp-content/uploads/2022/07/shutterstock_473876671.jpg"
              alt="St. Petersburg"
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>St. Petersburg</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Featured;
