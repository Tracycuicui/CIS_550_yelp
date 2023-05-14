import React, { useEffect,useState,setState } from 'react';
import './Community.css';
import config from '../../config.json';

function Community() {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyshow, setHistoryshow] = useState(false);
  const handleSubmit = (event) => {
    
    event.preventDefault();

    if (name.trim() === '' || comment.trim() === '') {
      return;
    }

    const date = new Date();
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    const newComment = {
      name: name,
      comment: comment,
      date: dateString
    }
    var data = new FormData();
    data.append( "json", JSON.stringify(newComment ));
    try {
        const requestOptions = {
            method: 'POST',
            headers: {       'Accept': 'application/json',
      'Content-Type': 'application/json' },
            body: JSON.stringify({newComment})
        };
        const response = fetch(
            "http://localhost:3000/api/comments", requestOptions);
    setComments([...comments, newComment]);
    setName('');
    setComment('');}
    catch (err) {
        console.error(err);
      }
  };
//   const { hiscomments, showHistory } = hisstate
  useEffect(() => {
    // Fetch request to get the song of the day. Fetch runs asynchronously.
    // The .then() method is called when the fetch request is complete
    // and proceeds to convert the result to a JSON which is finally placed in state.

    fetch(`http://${config.server_host}:${config.server_port}/historyComments`)
      .then(response => response.json())
      .then(resJson => setHistory(resJson));
    // TODO (TASK 14): add a fetch call to get the app author (name not pennkey) and store it in the state variable
  }, []);
  
  return (
    <div className="container">
      <h1>User Community</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <textarea className="form"
        type="text"
          placeholder="Write your comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />

        <button className="button" type="submit">Submit</button>
      </form>
      <div className="comment-container">
        {comments.map((comment, index) => (
          <div className="comment" key={index}>
            <div className="name">{comment.name}</div>
            <div className="date">{comment.date}</div>
            <div className="comment-text">{comment.comment}</div>
          </div>
        ))}
      </div>

      <div className='bottom'>
          {historyshow && (
            <div className="comment-container">
                {history.map((comment) => (
                <div className="comment" key={comment.id}>
                    <div className="name">{comment.name}</div>
                    <div className="date">{comment.date}</div>
                    <div className="comment-text">{comment.comment}</div>
                </div>
                ))}
            </div>
          )}
          <button onClick={() => setHistoryshow(true)}>History</button>
        </div>


    </div>



  );
}

export default Community;
