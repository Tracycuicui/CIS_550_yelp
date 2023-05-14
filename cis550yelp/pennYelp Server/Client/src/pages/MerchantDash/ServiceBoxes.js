import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import config from '../../config';
import './ServiceBoxes.css';


const ServiceBoxes = () => {
    const [serviceInfo, setServiceInfo] = useState([]);
    const location = useLocation();
    const selectedBusinessId = new URLSearchParams(location.search).get('business_id');

    console.log(selectedBusinessId)

    useEffect(() => {
        fetchData();
    }, [selectedBusinessId]);

    const fetchData = async () => {
        try {
            const serviceResponse = await fetch(
                `http://${config.server_host}:${config.server_port}/merchantDashboardServiceInfo?business_id=${selectedBusinessId}`,
            );
            const jsonData = await serviceResponse.json();
            setServiceInfo(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    console.log(serviceInfo[0])

    const serviceArray = [
        { name: 'By Appointment Only', key: 'ByAppointmentOnly', default: false },
        { name: 'Bike Parking', key: 'BikeParking', default: true },
        { name: 'Credit Cards', key: 'BusinessAcceptsCreditCards', default: true },
        { name: 'Dogs Allowed', key: 'DogsAllowed', default: true },
        { name: 'Alcohol', key: 'Alcohol', default: false },
        { name: 'Drive-Thru', key: 'DriveThru', default: true },
      ];
    
      const renderServiceValue = (value, defaultValue) => {
        if (value !== null && value !== undefined && value !== "") {
          return value === 'True' || value === 1 || value ===  'u\'full_bar\'' || value ===  'full_bar' ? 'Yes' : 'No';
        } else {
          return defaultValue ? 'Yes' : 'No';
        }
      };


    const renderPriceValue = (value) => {
        if (value === null || value === 'True' || value === 1) {
            return '$';
        } else if (value === 0) {
            return '$';
        } else if (value === 2) {
            return '$$$';
        } else if (value === 1) {
            return '$$';
        } else {
            return '$';
        }
    };


    let priceRange = renderPriceValue(serviceInfo.length ? serviceInfo[0].RestaurantsPriceRange : '$');

    return (
        <div>
          <div className="container">
            {serviceArray.map((service) => (
              <div key={service.key} className="service-box">
                <div className="service-title">{service.name}</div>
                <div>{renderServiceValue(serviceInfo.length ? serviceInfo[0][service.key] : null, service.default)}</div>
              </div>
            ))}
          </div>
        </div>
      );



}


export default ServiceBoxes;