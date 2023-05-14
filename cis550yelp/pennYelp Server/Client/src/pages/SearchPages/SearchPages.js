import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './SearchPages.css'
import notFoundImage from './not_found.jpg'
import { useNavigate } from 'react-router-dom';
import star from './star.png';
import halfStar from './half-star.png';

const backgroundImages = [
    './s1.jpg',
    './s2.jpg',
    './s3.jpg',
    './s4.jpg'
  ];



const config = require('../../config.json');

const SearchPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get('name') || '';
    const address = queryParams.get('address') || '';
    const stars = queryParams.get('stars') || '';
    const city = queryParams.get('city') || '';
    const state = queryParams.get('state') || '';

    const [currentPage, setCurrentPage] = useState(parseInt(new URLSearchParams(location.search).get("page")) || 1);


    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handlePageChange = (page) => {
        navigate(`/search?name=${name}&city=${city}&state=${state}&page=${page}`);
    };


    const [backgroundImage, setBackgroundImage] = useState('');

    const selectRandomBackground = () => {
        const randomIndex = Math.floor(Math.random() * backgroundImages.length);
        setBackgroundImage(backgroundImages[randomIndex]);
    };


    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        selectRandomBackground();
        const fetchSearchResults = async () => {
            setIsLoading(true);

            const response = await fetch(`http://${config.server_host}:${config.server_port}/search?name=${name}&city=${city}&state=${state}&page=${currentPage}`);
            const data = await response.json();

            setResults(data);
            console.log(data);
            setIsLoading(false);
        };

        fetchSearchResults();
    }, [name, city, state, currentPage]);

    
    return (
  <div className="search-page">
    <h1>Search Results:{name}</h1>
    {isLoading ? (
      <p>Loading...</p>
    ) : (
      <div className="results-list">
        {results.length > 0 ? (
            results.map((result, index) => (
              <div key={index} className="result-item">
              <div className="result-name-stars">
              <Link to={`/merchant?business_id=${result.business_id}`}>
                                        <h3 className="result-name">{result.name}</h3>
                                    </Link>
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
                <img src={notFoundImage}/>
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




export default SearchPage;
