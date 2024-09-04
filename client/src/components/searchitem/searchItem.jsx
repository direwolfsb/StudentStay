import React from 'react';
import "./searchItem.css";
import { Link } from "react-router-dom";

function SearchItem({ item }) {
  return (
    <div className="searchItem">
      {/* Displaying the first photo of the item */}
      <img src={item.photos[0]} alt={item.name} className="siImg" />

      {/* Description section */}
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">
          <b style={{ color: "green" }}>{item.distance}</b> miles from USF
        </span>
        <span className="siSubtitle">{item.type}</span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Free cancellation</span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>

      {/* Details section */}
      <div className="siDetails">
        {/* Displaying rating if available */}
        {item.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}

        {/* Price and availability section */}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          {/* Link to the hotel's detailed page */}
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SearchItem;
