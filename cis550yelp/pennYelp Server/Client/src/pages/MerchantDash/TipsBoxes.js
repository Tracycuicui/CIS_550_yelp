import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import config from '../../config';
import './TipsBoxes.css'


const TipsBoxes = () => {
    const [tipsInfo, setTipsInfo] = useState([]);
    const location = useLocation();
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const selectedBusinessId = new URLSearchParams(location.search).get('business_id');

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        try {
            const TipResponse = await fetch(
                `http://${config.server_host}:${config.server_port}/merchantDashboardTips?business_id=${selectedBusinessId}&page=${currentPage}`,
            );
            const jsonData = await TipResponse.json();
            setTipsInfo(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        const tipsContainer = document.querySelector('.tips-container');
        if (tipsContainer) {
            tipsContainer.style.transition = 'opacity 0.5s';
            tipsContainer.style.opacity = '1';
        }
    }, []);

    const [showFullText, setShowFullText] = useState(false);
    const [fullText, setFullText] = useState('');
    const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });

    const handleTipBoxClick = (event, text) => {

        const cardX = 0;
        const cardY = 0;
        setFullText(text);
        setShowFullText(true);
        setCardPosition({ x: cardX, y: cardY });
    };

    const handleCardClose = () => {
        setShowFullText(false);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };


    return (
        <div className="tips-container" style={{ opacity: '0' }}>
          <h2 className="tips-header">Anonymous Tips</h2>
          <div className="tips-wrapper">
            {tipsInfo.map((tip, index) => (
              <div
                className="tip-box"
                key={index}
                onClick={(event) => handleTipBoxClick(event, tip.text)}
              >
                <div className="tip-text">{tip.text.slice(0, 50)}...</div>
                <div className="tip-date">{tip.date}</div>
                <div className="tip-compliment">{tip.compliment_count} compliments</div>
              </div>
            ))}
          </div>
          {showFullText && (
            <div className="tip-card" style={{ top: cardPosition.y, left: cardPosition.x }}>
              <div className="card-content">
                <div className="card-text">{fullText}</div>
                <button className="card-close-btn" onClick={handleCardClose}>
                  Close
                </button>
              </div>
            </div>
          )}
          <div className="pagination">
            
            <button
              className="prev-btn"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              style={{ backgroundColor: 'green', fontSize: '14px', fontWeight: 'bold' }}
            >
              Prev
            </button>
            <div className="pagination-page-number">{currentPage}</div>
            
            <button
              className="next-btn"
              onClick={handleNextPage}
              disabled={tipsInfo.length < itemsPerPage}
              style={{ backgroundColor: 'green', fontSize: '14px', fontWeight: 'bold' }}
            >
              Next
            </button>
          </div>
        </div>
      );

}

export default TipsBoxes;
