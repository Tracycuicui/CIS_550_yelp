import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import config from '../../config';
import './BusinessInfo.css';


const BusinessInfo = () => {

    const [businessInfo, setBusinessInfo] = useState([]);

    const location = useLocation();
    const selectedBusinessId = new URLSearchParams(location.search).get('business_id');


    useEffect(() => {
        fetchData();
    }, [selectedBusinessId]);

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


    return (
        <div className="container">
          {businessInfo.map((info, index) => (
            <div key={index} className="title">
              <div>
                <div className="info-title">
                  <h2 className='merchant-info-title'>Merchant Information</h2>
                </div>
                <div className="info">
                  <span className="info-label">Name:</span> {info.name}
                </div>
                <div className="info">
                  <span className="info-label">Address:</span> {info.address}, {info.city}, {info.state}
                </div>
                <div className="info">
                  <span className="info-label">Stars:</span> {info.stars}
                </div>
              </div>
              <div className="image-container">
                <img
                  src="https://via.placeholder.com/300x200" // 替换为商家图片的实际 URL
                  alt={`${info.name} Business`}
                  className="business-image"
                />
              </div>
            </div>
          ))}
        </div>
      );
}


export default BusinessInfo;