import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import config from '../../config';
import BusinessInfo from './BusinessInfo';
import ServiceBoxes from './ServiceBoxes';
import TipsBoxes from  './TipsBoxes'
import ReviewBox from './ReviewBox'
//import './MerchantDash.css';



export default function Merchants() {
    const [businessInfo, setBusinessInfo] = useState([]);
    const [tipsInfo, setTipsInfo] = useState([]);
    const [reviewInfo, setReviewInfo] = useState([]);

    const [page, setPage] = useState(1);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedBusinessId = new URLSearchParams(location.search).get('business_id');


    useEffect(() => {
        fetchData(page);
    }, [selectedBusinessId, page]);

    const fetchData = async () => {
        try {
            const businessInfoResponse = await fetch(
                `http://${config.server_host}:${config.server_port}/merchantDashboardBusinessInfo?business_id=${selectedBusinessId}`,
            );
            const jsonData = await businessInfoResponse.json();
            setBusinessInfo(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };




    console.log("bus", businessInfo);
    // console.log("ser", serviceInfo);
    // console.log("tip", tipsInfo);
    // console.log("rev", reviewInfo);

    // // Fetch tips info
    // const tipResponse =  fetch(`http://${config.server_host}:${config.server_port}/merchantDashboardBusinessInfo?business_id=${selectedBusinessId}`);
    // const tipData =  tipResponse.json();
    // console.log(tipData);
    // setTipsInfo(tipData);

    // // Fetch review info
    // const reviewResponse =  fetch(`http://${config.server_host}:${config.server_port}/merchantDashboardReviews?business_id=${selectedBusinessId}&page=${page}`);
    // const reviewData =  reviewResponse.json();
    // console.log(reviewData);
    // setReviewInfo(reviewData);

    // // Fetch service info
    // const serviceResponse =  fetch(`http://${config.server_host}:${config.server_port}/merchantDashboardServiceInfo?business_id=${selectedBusinessId}`);
    // const serviceData =  serviceResponse.json();
    // console.log(serviceData);
    // setServiceInfo(serviceData);



    return (
        <div>
            <BusinessInfo />
            <ServiceBoxes />
            <TipsBoxes />
            <ReviewBox/>
        </div>

    );
};

