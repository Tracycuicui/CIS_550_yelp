import React, { useState, useEffect } from 'react';
import './UserSearch.css';
import config from '../../config.json';

import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Label
  } from 'recharts';

  const UserInfoModal = ({ user, onClose }) => {
    const radarData = [
      { attribute: 'Useful', value: user.useful },
      { attribute: 'Funny', value: user.funny },
      { attribute: 'Cool', value: user.cool },
    ];
  
    const barData = [
      { name: 'Note', value: user.compliment_note },
      { name: 'Writer', value: user.compliment_writer },
      { name: 'Photos', value: user.compliment_photos },
    ];
  
    return (
      <div className="modal-background">
        <div className="modal">
          <h2>User Information</h2>
          <p><strong>User ID:</strong> {user.id}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Registration Date:</strong> {user.registrationDate}</p>
          <p><strong>Fans:</strong> {user.fans}</p>
          <h3>Ratings</h3>
          <RadarChart cx={150} cy={125} outerRadius={100} width={300} height={250} data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="attribute" />
            <PolarRadiusAxis />
            <Radar name="Ratings" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} label/>
          </RadarChart>
          <h3>Compliments</h3>
          <BarChart width={300} height={300} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };

const UserSearch = () => {
    const [data, setData] = useState([]);
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchBy, setSearchBy] = useState('id');
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchData(currentPage);
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(
                `http://${config.server_host}:${config.server_port}/UserSearch?${searchBy}=${searchBy === 'id' ? userId : username}&page=${currentPage}`,
            );
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSearch = () => {
        if (!userId && !username) {
            alert('Please enter User ID or Username');
        } else {
            fetchData();
            setUserId('');
            setUsername('');
            setFilteredData([]);
        }
    };

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            fetchData();
        }
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
        fetchData();
    };

    return (
        <div className="search-container">
            <div className="search-area">
                <div className="search-tab-container">
                    <div
                        className={`search-tab ${searchBy === 'id' ? 'active' : ''}`}
                        onClick={() => setSearchBy('id')}
                    >
                        Search by ID
                    </div>
                    <div
                        className={`search-tab ${searchBy === 'username' ? 'active' : ''}`}
                        onClick={() => setSearchBy('username')}
                    >
                        Search by username
                    </div>
                </div>
                <div className="search-wrapper">
                    <div className="search-inputs">
                        <label className="search-label">
                            {searchBy === 'id' ? 'User ID' : 'Username'}
                            <input
                                type="text"
                                className="search-input"
                                placeholder={`Search by ${searchBy}`}
                                value={searchBy === 'id' ? userId : username}
                                onChange={e => searchBy === 'id' ? setUserId(e.target.value) : setUsername(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="search-button-container">
                        <button className="search-button" onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Registration Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map(item => (
                                <tr key={item.id} onClick={() => { setShowModal(true); setSelectedUser(item); }}>
                                    <td>{item.id}</td>
                                    <td>{item.username}</td>
                                    <td>{item.registrationDate}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">User not found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <button
                    className="page-button"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span className="page-number">{currentPage}</span>
                <button
                    className="page-button"
                    onClick={handleNextPage}
                    disabled={filteredData.length < 10}
                >
                    Next
                </button>
            </div>
            {showModal && (
                <UserInfoModal
                    user={selectedUser}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default UserSearch;