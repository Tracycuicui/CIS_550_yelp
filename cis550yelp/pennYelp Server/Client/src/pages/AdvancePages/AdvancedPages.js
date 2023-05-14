import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StateFilter from '../HomePages/StateFilter';
import './AdvancedPages.css';
import logo from './logo.jpg';


const AdvancedPage = () => {
    const navigate = useNavigate();
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [priceRange, setPriceRange] = useState(0);
    const [dogsAllowed, setDogsAllowed] = useState(0);
    const [driveThru, setDriveThru] = useState(0);
    const [alcohol, setAlcohol] = useState(0);
    const [tableService, setTableService] = useState(0);
    const [reservationNeeded, setReservationNeeded] = useState(0);
    const [happyHour, setHappyHour] = useState(0);

    useEffect(() => {
        const priceRangeLabel = document.getElementById('priceRangeLabel');
        if (priceRangeLabel) {
          priceRangeLabel.textContent = priceRange < 1 ? "I don't care" : `Price Range: ${priceRange}`;
        }
      }, [priceRange]);


    const filterChangeHandler = selectedState => {
        setState(selectedState);
    };

    const cityChangeHandler = event => {
        setCity(event.target.value);
    };

    const handlePriceRangeChange = event => {
        setPriceRange(event.target.value);
    };


    const handleDogsAllowedChange = event => {
        setDogsAllowed(event.target.checked ? 1 : 0);
        // console.log(event.target.checked)
    };

    const handleDriveThruChange = event => {
        setDriveThru(event.target.checked ? 1 : 0);
    };

    const handleAlcoholChange = event => {
        setAlcohol(event.target.checked ? 1 : 0);
    };

    const handleTableServiceChange = event => {
        setTableService(event.target.checked ? 1 : 0);
    };

    const handleReservationNeededChange = event => {
        setReservationNeeded(event.target.checked ? 1 : 0);
    };

    const handleHappyHourChange = event => {
        setHappyHour(event.target.checked ? 1 : 0);
    };


    const handleAdvancedSearch = () => {
        const options = {
            dogsAllowed,
            driveThru,
            alcohol,
            tableService,
            reservationNeeded,
            happyHour
        };
        console.log(`/Asearch?city=${city}&state=${state}&priceRange=${priceRange}&options=${JSON.stringify(options)}&page=${1}`)
        navigate(`/Asearch?city=${city}&state=${state}&priceRange=${priceRange}&options=${JSON.stringify(options)}&page=${1}`);
    };




    return (
        <div className="advanced-page">
            <div className="advanced-search-logo">
                <img src={logo} alt="Advanced Search" />
            </div>
            <button type="button" onClick={handleAdvancedSearch}>Search!</button>
            <form className="advanced-search-form">
                <div className="form-group">
                    <StateFilter select={state} onChangeFilter={filterChangeHandler} />
                </div>
                <div className="search-section">
                    <div className="searchBarCity">
                        <input type="text" id="city" placeholder="City..." value={city} onChange={cityChangeHandler} />
                    </div>
                </div>
            </form>

            <div className="options-container">
                <label htmlFor="priceRange" className="priceRangeLabel">
                    {priceRange === 0 ? "0 (I don't care)" : `Price Range: ${priceRange}`}
                </label>
                <input
                    type="range"
                    id="priceRange"
                    name="priceRange"
                    min="0"
                    max="2"
                    value={priceRange}
                    onChange={handlePriceRangeChange}
                    className="priceRangeSlider"
                />
                <table className="options-table">
                    <tr>
                        <td><input type="checkbox" id="dogsAllowed" name="dogsAllowed" onChange={handleDogsAllowedChange} /></td>
                        <td><label htmlFor="dogsAllowed">Dogs Allowed</label></td>
                        <td><input type="checkbox" id="driveThru" name="driveThru" onChange={handleDriveThruChange} /></td>
                        <td><label htmlFor="driveThru">Drive Thru</label></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" id="alcohol" name="alcohol" onChange={handleAlcoholChange} /></td>
                        <td><label htmlFor="alcohol">Alcohol</label></td>
                        <td><input type="checkbox" id="tableService" name="tableService" onChange={handleTableServiceChange} /></td>
                        <td><label htmlFor="tableService">Table Service</label></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" id="reservationNeeded" name="reservationNeeded" onChange={handleReservationNeededChange} /></td>
                        <td><label htmlFor="reservationNeeded">Reservation Needed</label></td>
                        <td><input type="checkbox" id="happyHour" name="happyHour" onChange={handleHappyHourChange} /></td>
                        <td><label htmlFor="happyHour">Happy Hour</label></td>
                    </tr>
                </table>
            </div>

        </div>
    );
};

export default AdvancedPage;