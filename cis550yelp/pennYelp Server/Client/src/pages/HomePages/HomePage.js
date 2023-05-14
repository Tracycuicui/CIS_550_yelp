import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import "./HomePages.css"
import logo from "./logo2.png"
// import backgroundImage from './background.jpg';
import './CityFilter.css';
import StateFilter from './StateFilter';

import backgroundImage1 from './bg1.png';
import backgroundImage2 from './bg2.png';
import backgroundImage3 from './bg3.png';

const images = [
    backgroundImage1,
    backgroundImage2,
    backgroundImage3,
];

export default function HomePage() {
    // We use the setState hook to persist information across renders (such as the result of our API calls)
    const authors = "Ze Sheng, Zhiqi Cui, Yao Jiang, Yunhe Li"
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');


    const nameChangeHandler = (event) => {
        console.log(event.target.value);
        setName(event.target.value);
    }

    const filterChangeHandler = selectedState => {
        // console.log(selectedState);
        setState(selectedState);
    }

    const cityChangeHandler = (event) => {
        console.log(event.target.value);
        setCity(event.target.value)
    }



    const handleSearch = () => {
        if (name === '' && city === '' && state === '') {
            alert('Please enter at least one search criteria.');
          } else {
            navigate(`/search?name=${name}&city=${city}&state=${state}&page=${1}`);
          }
    };

    
    const advancedRouter = () => {
        navigate(`/advancedsearch`);
    }

    const [currentImage, setCurrentImage] = useState(images[0]);


    useEffect(() => {
        const intervalId = setInterval(() => { 
            setCurrentImage((currentImage) => {
                const imageIndex = images.indexOf(currentImage);
                const nextImageIndex = imageIndex === images.length - 1 ? 0 : imageIndex + 1;
                return images[nextImageIndex];
            });
        }, 10000); 
    
        return () => clearInterval(intervalId); 
    }, []);



    return (
        <div className="Hcontainer" style={{ backgroundImage: `url(${currentImage})` }}>

            <div className="Hlogo" >
                <img src={logo} alt="Logo" />
            </div>

            <div className="HsearchBar">
                <input type="text" placeholder="Restaurant Name..." value={name} onChange={nameChangeHandler}/>
            </div>

            <div className="HsearchBarCity">
                <input type="text" placeholder="city..." value={city} onChange={cityChangeHandler}/>
            </div>

            <StateFilter select={state} onChangeFilter={filterChangeHandler}/>

            <button className="HsearchButton" onClick={handleSearch}>Search!</button>

            
            <button className="HsearchButton" onClick={advancedRouter}>Want more? Try advanced search!</button> 
            
            
            <footer className="Hfooter">
                <span className="author">Created by {authors}</span>
            </footer>
        </div>
    );
};
