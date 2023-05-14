//import './findFriendPages.css';
import './styles.css';
import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { useState } from 'react'
// import App from './App';

const FindFriend = () => {
    const [query, setQuery] = useState('')
    const [userData, setUserData] = useState(null)
    const [repoData, setRepoData] = useState([])
  
    const handleSearch = (event) => {
      event.preventDefault()
      fetch(`https://api.github.com/users/${query}`)
        .then(response => {
          if (!response.ok) {
            throw Error(`${response.status}: ${response.statusText}`)
          }
          return response.json()
        })
        .then(response => {
          const formattedDate = new Date(response.created_at).toLocaleString("en-US", {
            weekday: "short",
            month: "long",
            day: "2-digit",
            year: "numeric",
          })
          setUserData({
            username: response.login,
            avatar: response.avatar_url,
            name: response.name ? response.name : "N/A",
            twitterHandle: response.twitter_username ? `@${response.twitter_username}` : "N/A",
            location: response.location ? response.location : "N/A",
            creationDate: formattedDate,
            profileLink: response.html_url,
            bio: response.bio ? response.bio : "No bio available",
            followersCount: response.followers,
            followingCount: response.following,
            publicReposCount: response.public_repos,
          })
          fetch(response.repos_url)
            .then(response => response.json())
            .then(response => setRepoData(response))
        })
        .catch(error => console.log(error))
    }
  
    const handleInputChange = (event) => {
      setQuery(event.target.value)
    }
  
    return (
      <div className="container">
        
        <form className="search-form" onSubmit={handleSearch}>
        <div className="search-box">
          <input type="text" placeholder="Enter GitHub username" onChange={handleInputChange} />
          <input type="submit" value="Search" />
        </div>
      </form>
        {userData && (
          <div>
            <h2>{userData.username}</h2>
            <img src={userData.avatar} alt={userData.username} />
            <p>Name: {userData.name}</p>
            <p>Twitter: {userData.twitterHandle}</p>
            <p>Location: {userData.location}</p>
            <p>Creation Date: {userData.creationDate}</p>
            <p>Bio: {userData.bio}</p>
            <p>Followers: {userData.followersCount}</p>
            <p>Following: {userData.followingCount}</p>
            <p>Public Repositories: {userData.publicReposCount}</p>
            <ul>
              {repoData.map(repo => (
                <li key={repo.id}>{repo.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
  
  export default FindFriend;
//   return (
// <div className="friend-page">
// <div>       
//     {/* <link rel="stylesheet" href="./styles.css"/>
//     <link rel="preconnect" href="https://fonts.googleapis.com"/>
//     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
//     <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;1,300;1,500&display=swap" rel="stylesheet"/>
//     <script src="findFriend.js"></script>
//     <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
//     <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script> */}
//     <title>Github search</title>
// </div>
//     <div id="container">
//         <div id="search-form">
//             <div id="search-box">
//                 <input id="search-input" type="search" required/>
//                 <input id="btn-submit" class="btn submit" type="submit" value="search"/>
//             </div>
//         </div>
//         <div class="details-box default">
//             <div class="default-info">
//                 <h1>Github User Search</h1>
//                 <p>Type in a github username into the search box, Click search to generate user's key details.</p>
//                 <p id="error"></p>
//             </div>
//         </div>
//         <div class="details-box result-box">
//             <div id="main-details-section">
//                 <div id="base-info">
//                     <div id="info">
//                         <h2 id="username">User's Name</h2>
//                         <p><ion-icon name="logo-twitter"></ion-icon>&nbsp;<span id="twitterhandle"></span></p>
//                         <p><ion-icon name="location-sharp"></ion-icon>&nbsp;<span id="location"></span></p>
//                         <p><ion-icon name="calendar-sharp"></ion-icon>&nbsp;<span id="creation-date"></span></p>
//                     </div>
//                 </div>
//                 <a id="profile-link" class="btn profile-link" href="" target="_blank">View Profile</a>
//             </div>
//             <div id="about-section">
//                 <h2>About</h2>
//                 <p id="bio"></p>
//             </div>
//             <div id="stats-count">
//                 <div id="followers">
//                     <h2>Followers</h2>
//                     <h2 id="followers-count"></h2>
//                 </div>
//                 <div id="following">
//                     <h2>Following</h2>
//                     <h2 id="following-count"></h2>
//                 </div>
//                 <div id="public-repos">
//                     <h2>Repos</h2>
//                     <h2 id="public-repos-count"></h2>
//                 </div>
//             </div>
//             <div id="repo-section">
//                 <h2>Repositories</h2>
//                 <div id="repos-box">
//                     <ul id="repo-items">
//                     </ul>
//                 </div>
//             </div>
//         </div>
//         <a class="repo-link" href="https://github.com/tcrz/github-userSearch" target="_blank">Link to repo</a>
//         {/* </div> */}
//     </div>
// </div>
// );
// };
// export default findFriend;