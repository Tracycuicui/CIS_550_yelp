import { useEffect, useState } from 'react';
import { Container, Divider, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';
import LazyTable from '../components/LazyTable';
import SongCard from '../components/SongCard';
const config = require('../config.json');

export default function Merchants() {
  // We use the setState hook to persist information across renders (such as the result of our API calls)
  // const [songOfTheDay, setSongOfTheDay] = useState({});
  // TODO (TASK 13): add a state variable to store the app author (default to '')
  //const [appAuthor, setAppAuthor] = useState('');

  const [selectedBusinessId, setSelectedBusinessId] = useState(null);
  const [SongOfTheDay, setSongOfTheDay] = useState(null);
  // The useEffect hook by default runs the provided callback after every render
  // The second (optional) argument, [], is the dependency array which signals
  // to the hook to only run the provided callback if the value of the dependency array
  // changes from the previous render. In this case, an empty array means the callback
  // will only run on the very first render.
  useEffect(() => {
    // Fetch request to get the song of the day. Fetch runs asynchronously.
    // The .then() method is called when the fetch request is complete
    // and proceeds to convert the result to a JSON which is finally placed in state.
    fetch(`http://${config.server_host}:${config.server_port}/businessid`)
      .then(res => res.text())
      .then(resText => setSelectedBusinessId(resText));
    // .then(fetch(`http://${config.server_host}:${config.server_port}/merchantDashboardTips?business_id=${selectedBusinessId}`))
    //   .then(res => res.json())
    //   .then(resJson => setSongOfTheDay(resJson));
      //.then(resJson => setAppAuthor(resJson));
      // TODO (TASK 14): add a fetch call to get the app author (name not pennkey) and store it in the state variable
    // fetch(`http://${config.server_host}:${config.server_port}/author/name`)
    //   .then(res => res.text())
    //   .then(resJson => {setAppAuthor(resJson);})
  }, []);
  console.log(selectedBusinessId);

  // Here, we define the columns of the "Top Songs" table. The songColumns variable is an array (in order)
  // of objects with each object representing a column. Each object has a "field" property representing
  // what data field to display from the raw data, "headerName" property representing the column label,
  // and an optional renderCell property which given a row returns a custom JSX element to display in the cell.
  const BusinessInfoColumns = [
    {//name, address, city, state, stars, review_count
      field: 'name',
      headerName: 'Resturant Name',
      //renderCell: (row) => <Link onClick={() => setSelectedBusinessId(row.business_id)}>{row.title}</Link> // A Link component is used just for formatting purposes
    },
    {
      field: 'address',
      headerName: 'Resturant address',
      //renderCell: (row) => <NavLink to={`/albums/${row.album_id}`}>{row.album}</NavLink> // A NavLink component is used to create a link to the album page
    },
    {
      field: 'city',
      headerName: 'City'
    },
    {
      field: 'state',
      headerName: 'State'
    },
    {
      field: 'stars',
      headerName: 'Stars'
    },
    {
      field: 'review_count',
      headerName: 'Review Count'
    },
  ];

  const tipsColumns = [
    {
      field: 'name',
      headerName: 'Resturant Name',
      //renderCell: (row) => <Link onClick={() => setSelectedBusinessId(row.business_id)}>{row.title}</Link> // A Link component is used just for formatting purposes
    },
    {
      field: 'user_id',
      headerName: 'User ID',
      //renderCell: (row) => <NavLink to={`/albums/${row.album_id}`}>{row.album}</NavLink> // A NavLink component is used to create a link to the album page
    },
    {
      field: 'text',
      headerName: 'User Text'
    },
  ];
  const reviewsColumns = [
    {
      //b.business_id, b.name, user_id, c.text, c.stars, useful, funny, cool
      field: 'name',
      headerName: 'Resturant Name',
      //renderCell: (row) => <Link onClick={() => setSelectedBusinessId(row.business_id)}>{row.title}</Link> // A Link component is used just for formatting purposes
    },
    {
      field: 'user_id',
      headerName: 'User ID',
      //renderCell: (row) => <NavLink to={`/albums/${row.album_id}`}>{row.album}</NavLink> // A NavLink component is used to create a link to the album page
    },
    {
      field: 'text',
      headerName: 'User Text'
    },
    {
      field: 'stars',
      headerName: 'User rank'
    },
    {
      field: 'useful',
      headerName: 'Useful'
    },
    {
      field: 'funny',
      headerName: 'Funny'
    },
    {
      field: 'cool',
      headerName: 'Cool'
    },
  ];
  const serviceColumns = [
    {
      // b.name,
      // ByAppointmentOnly,BikeParking,
      // RestaurantsPriceRange2 as RestaurantPricingRange,DogsAllowed
      field: 'name',
      headerName: 'Resturant Name',
      //renderCell: (row) => <Link onClick={() => setSelectedBusinessId(row.business_id)}>{row.title}</Link> // A Link component is used just for formatting purposes
    },
    {
      field: 'ByAppointmentOnly',
      headerName: 'By Appointment Only',
      //renderCell: (row) => <NavLink to={`/albums/${row.album_id}`}>{row.album}</NavLink> // A NavLink component is used to create a link to the album page
    },
    {
      field: 'BikeParking',
      headerName: 'User Text'
    },
    {
      field: 'RestaurantPricingRange',
      headerName: 'Restaurant Pricing Range'
    },
    {
      field: 'DogsAllowed',
      headerName: 'Dogs Allowed'
    },

  ];
  // TODO (TASK 15): define the columns for the top albums (schema is Album Title, Plays), where Album Title is a link to the album page
  // Hint: this should be very similar to songColumns defined above, but has 2 columns instead of 3
  // const albumColumns = [
  //   {
  //     field:'title',
  //     headerName:'Album Title',
  //     renderCell: (row) => <NavLink to={`/albums/${row.album_id}`}>{row.title}</NavLink>
  //   },
  //   {
  //     field:'plays',
  //     headerName:'Plays'
  //   }
  // ]

  return (
    <Container>
      {/* SongCard is a custom component that we made. selectedSongId && <SongCard .../> makes use of short-circuit logic to only render the SongCard if a non-null song is selected */}
      {/* {selectedBusinessId && <SongCard songId={selectedBusinessId} handleClose={() => setSelectedSongId(null)} />} */}
      {/* <h2>Check out the Merchants detailed information:&nbsp;
        <Link onClick={() => setSongOfTheDay(SongOfTheDay.business_id)}>{SongOfTheDay.name}</Link>
      </h2> */}
      <Divider />
      {/* TODO (TASK 16): add a h2 heading, LazyTable, and divider for top albums. Set the LazyTable's props for defaultPageSize to 5 and rowsPerPageOptions to [5, 10] */}
      <h2>Business information</h2>
      <LazyTable route={`http://${config.server_host}:${config.server_port}/merchantDashboardBusinessInfo?business_id=${selectedBusinessId}`} columns={BusinessInfoColumns} />

      {/* TODO (TASK 17): add a paragraph (<p>text</p>) that displays the value of your author state variable from TASK 13 */}
      <Divider />
      {/* TODO (TASK 16): add a h2 heading, LazyTable, and divider for top albums. Set the LazyTable's props for defaultPageSize to 5 and rowsPerPageOptions to [5, 10] */}
      <h2>Service</h2>
      <LazyTable route={`http://${config.server_host}:${config.server_port}/merchantDashboardServiceInfo?business_id=${selectedBusinessId}`} columns={serviceColumns} />
      {/* TODO (TASK 17): add a paragraph (<p>text</p>) that displays the value of your author state variable from TASK 13 */}
      <Divider />

      <h2>Tips</h2>
      <LazyTable route={`http://${config.server_host}:${config.server_port}/merchantDashboardTips?business_id=${selectedBusinessId}`} columns={tipsColumns} />
      
      <Divider />
      {/* TODO (TASK 16): add a h2 heading, LazyTable, and divider for top albums. Set the LazyTable's props for defaultPageSize to 5 and rowsPerPageOptions to [5, 10] */}
      <h2>Reviews</h2>
      <LazyTable route={`http://${config.server_host}:${config.server_port}/merchantDashboardReviews?business_id=${selectedBusinessId}`} columns={reviewsColumns} />

      {/* TODO (TASK 17): add a paragraph (<p>text</p>) that displays the value of your author state variable from TASK 13 */}
      <Divider />
      {/* <p>{appAuthor}</p> */}
    </Container>
    
  );
};