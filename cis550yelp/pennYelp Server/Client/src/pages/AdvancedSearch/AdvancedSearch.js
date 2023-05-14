import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './AdvancedSearch.css'
import notFoundImage from './not_found.jpg'
import { useNavigate } from 'react-router-dom';
import AdvancedPage from '../AdvancePages/AdvancedPages';
import star from './star.png';
import halfStar from './half-star.png';



const config = require('../../config.json');

const AdvancedSearch = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get('name') || '';
    const address = queryParams.get('address') || '';
    const stars = queryParams.get('stars') || '';
    const city = queryParams.get('city') || '';
    const state = queryParams.get('state') || '';
    const priceRange = queryParams.get('priceRange') || 0;
    const options = queryParams.get('options') || {};

    const [currentPage, setCurrentPage] = useState(parseInt(new URLSearchParams(location.search).get("page")) || 1);


    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handlePageChange = (page) => {
        navigate(`http://${config.server_host}:${config.server_port}/Asearch?city=${city}&state=${state}&priceRange=${priceRange}&options=${JSON.stringify(options)}&page=${page}`);
    };



    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const fetchSearchResults = async () => {
            setIsLoading(true);

            const response = await fetch(`http://${config.server_host}:${config.server_port}/Asearch?city=${city}&state=${state}&priceRange=${priceRange}&options=${JSON.stringify(options)}&page=${currentPage}`);
            const data = await response.json();
            console.log(data);
            setResults(data);
            setIsLoading(false);
        };

        fetchSearchResults();
    }, [city, state, currentPage]);


    return (
        <div className="search-page">
            <h1>Search Results:{name}</h1>
            <div className="result-item-options">
                {city && <span>City: {city}</span>}
                {state && <span>State: {state}</span>}
                {priceRange && priceRange !== '0' && <span>Price Range: {priceRange}</span>}
                {JSON.parse(options).dogsAllowed === 1 && <span>Dogs Allowed</span>}
                {JSON.parse(options).driveThru === 1 && <span>Drive Thru</span>}
                {JSON.parse(options).alcohol === 1 && <span>Alcohol</span>}
                {JSON.parse(options).tableService === 1 && <span>Table Service</span>}
                {JSON.parse(options).reservationNeeded === 1 && <span>Reservation Needed</span>}
                {JSON.parse(options).happyHour === 1 && <span>Happy Hour</span>}
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="results-list">
                    {results.length > 0 ? (
                        results.map((result, index) => (
                            <div key={index} className="result-item">
                                <div className="result-name-stars">
              <h3 className="result-name">{result.name}</h3>
              <span className="result-stars">
             {[...Array(Math.floor(result.stars))].map((_, i) => (
             <img key={`star-${i}`} src={star} alt="star" width="16" height="16" />
               ))}
             {result.stars % 1 !== 0 && (
             <img src={halfStar} alt="half-star" width="16" height="16" />
    )}
              </span>
              </div>
              <span className="result-address">{result.address}, </span>
              <span className="result-city">{result.city}, </span>
              <span className="result-state">{result.state}</span>
            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <img src={notFoundImage} />
                            <p>Result Not Found</p>
                            <Link to="/">Back to Home</Link>
                        </div>
                    )}
                    <div className="pagination">
                        <button className="pageButton" onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                        <button className="pageButton" onClick={handleNextPage} disabled={results.length < 10}>Next</button>
                    </div>
                </div>
            )}
        </div>
    );
}




export default AdvancedSearch;
