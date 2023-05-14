const express = require('express');
const config = require('./config.json');
const routes = require('./Routes.js');
const cors = require('cors');
const { connect } = require('./DataConnection');
const DBconnect = require('./DataConnection');
const bodyParser = require('body-parser');

// load express.js into app
const app = express();

// set global static middleware to 'from any domain'
// app.use(cors({
//     origin: '*',
//   }));

// A safer method, this will be tested in the future development:
app.use(cors({ credentials: true, origin: '*' }));

// app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
// Define the API endpoint for posting comments


/*
----------------------------------------------
                Routes for testing
----------------------------------------------
*/
app.get('/author', routes.testAuthor);
app.get('/test1', routes.testFindBusiness);


/*
----------------------------------------------
              Routes for Main Page
----------------------------------------------
*/

app.get('/main', routes.normalMerchantSearch)
app.get('/search', routes.normalMerchantSearch)
app.get('/top_compliments', routes.top_compliments);
app.get('/Asearch', routes.advancedSearch);
app.get('/UserSearch', routes.userSearch);


/*
----------------------------------------------
              Routes for merchantDashboard Page
----------------------------------------------
*/

app.get('/businessid', routes.businessid);
app.get('/merchantDashboardBusinessInfo', routes.merchantDashboardBusinessInfo);
app.get('/merchantDashboardTips', routes.merchantDashboardTips);
app.get('/merchantDashboardServiceInfo', routes.merchantDashboardServiceInfo);
app.get('/merchantDashboardReviews', routes.merchantDashboardReviews);
app.get('/historyComments', routes.historyComments);

/*
----------------------------------------------
              Routes for Other Page
----------------------------------------------
*/

app.get('/showGapRestaurants', routes.showGapRestaurants);
app.get('/specificBussinessInfo', routes.specificBussinessInfo);



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.post('/api/comments', async (req, res) => {
    try {
        console.log(req.body.newComment);
      const name = req.body.newComment.name;
      const comment = req.body.newComment.comment;
      const date = req.body.newComment.date;
     DBconnect.query('INSERT INTO community_record (name, comment, date) VALUES (?, ?, ?)', [name, comment, date],(err,result)=>{
        if(err) {
        console.log(err)
        } 
        console.log(result)
     }); 

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});


