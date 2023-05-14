import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import config from '../../config';
import RadarChart from './RadaerChart';
import './ReviewBox.css';

const ReviewBox = () => {
  const [reviewInfo, setReviewInfo] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [animation, setAnimation] = useState('fade-in');

  const location = useLocation();
  const selectedBusinessId = new URLSearchParams(location.search).get('business_id');

  useEffect(() => {
    fetchData();
  }, [selectedBusinessId])

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const reviewInfoResponse = await fetch(
        `http://${config.server_host}:${config.server_port}/merchantDashboardReviews?business_id=${selectedBusinessId}`,
      );
      const jsonData = await reviewInfoResponse.json();
      setReviewInfo(jsonData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleNextReview = () => {
    setAnimation('fade-out');
    setTimeout(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviewInfo.length);
      setAnimation('fade-in');
    }, 500);
  };

  const handlePreviousReview = () => {
    setAnimation('fade-out');
    setTimeout(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex - 1 + reviewInfo.length) % reviewInfo.length);
      setAnimation('fade-in');
    }, 500);
  };

  return (
    <div>
      <div className="container">
        {isLoading ? (
          <p>Loading...</p>
        ) : reviewInfo.length ? (
          <div key={reviewInfo[currentReviewIndex].review_id} className={`review-box ${animation}`}>
            <div className="reviewer-name">{reviewInfo[currentReviewIndex].user_id}</div>
            <div className="review-date">{reviewInfo[currentReviewIndex].date}</div>
            <div className="review-stars">{'⭐'.repeat(reviewInfo[currentReviewIndex].stars)}</div>
            <div className="review-text">{reviewInfo[currentReviewIndex].text}</div>
          </div>
          
        ) : (
          <div className="no-review">No reviews found.</div>
        )}
        
        <div className="pagination">
          <button
            className="pageButton"
            onClick={handlePreviousReview}
            disabled={!reviewInfo.length  || currentReviewIndex === 0}
          >
            Previous
          </button>
          <button
            className="pageButton"
            onClick={handleNextReview}
            disabled={!reviewInfo.length || currentReviewIndex === reviewInfo.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewBox;