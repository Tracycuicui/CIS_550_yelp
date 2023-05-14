// import databases:
const { connect } = require('./DataConnection');
const DBconnect = require('./DataConnection');
const querystring = require('querystring');

// Router functions: TODO：降低耦合程度，如果项目简单，其实可以完全不用这个文件夹，
// 直接把router写在服务器文件夹也是一样的
// 这种把router写在一个文件夹的操作叫创建中间件（Middleware）

/*
----------------------------------------------
                Routes for testing
----------------------------------------------
*/

const testAuthor = async function (req, res) {
    let names = {
        'Ze Sheng': 57990537,
        'Zhiqi Cui': 1234,
        'Yao Jiang': 2345,
        'Yunhe Li': 23123
    }
    res.send(names);
}

const testFindBusiness = async function (req, res) {
    let shopID = 'Pns2l4eNsfO8kk83dixA6A'

    DBconnect.query(`
    SELECT *
    FROM Business
    WHERE business_id LIKE 'Pns2l4eNsfO8kk83dixA6A'
    LIMIT 1
  `, (err, data) => {
        if (err || data.length === 0) {
            console.log(err);
            res.json({});
        } else {
            res.json({
                shopname: data
            });
        }
    });
}


/*
----------------------------------------------
             Routes for Main Page
----------------------------------------------
*/

/*
    Service 1: Search merchants using name (Normal Search), state, city and type

    Behavior: return the name and location of this merchant
*/
const normalMerchantSearch = async function (req, res) {
    const page = req.query.page;
    const pageSize = 10;
    const {
        name = "%",
        state = "%",
        city = "%",
        address = "%",
        stars = "%"
    } = req.query;

    console.log(page)


    // if all args are nulls, return all merchants in the merchant, order by stars
    let nullQuery = `
		SELECT business_id, name, address, stars, city, state
		FROM Business
		LIMIT 30
		ORDER BY stars DESC;
	`

    let start = (page - 1) * pageSize;
    console.log(start)

    let searchQuery = `
		SELECT business_id, name, address, stars, city, state
		FROM Business
		WHERE name LIKE '%${name}%' AND city LIKE '%${city}%' AND state LIKE '%${state}%' AND categories LIKE '%food%'
		ORDER BY stars DESC
		LIMIT ${pageSize}
        OFFSET ${start}
	`


    if (name === '' && state === '' && city === '' && type === '') {
        DBconnect.query(nullQuery, (err, data) => {
            if (err || data.length === 0) {
                console.log(err);
                res.json({});
            } else {
                console.log(data)
                res.json(data);
            }
        });
    } else {
        DBconnect.query(searchQuery, (err, data) => {
            if (err || data.length === 0) {
                console.log(err);
                res.json({});
            } else {
                console.log(data)
                res.json(data);
            }
        });
    }
}
	

const businessid = async function(req, res) {
	// TODO (TASK 1): replace the values of name and pennKey with your own
	const business_id = 'zzXDi0Pdv0s84M-oQaIa_g';
	// checks the value of type the request parameters
	// note that parameters are required and are specified in server.js in the endpoint by a colon (e.g. /author/:type)
	  res.send(business_id);
  }


//GET /merchantDashboardServiceInfo
const merchantDashboardServiceInfo = async function(req, res) {
	const {
		business_id = "%",
		page = "%"
	} = req.query;
	// if all args are nulls, return all merchants in the merchant, order by stars
	let nullQuery = `
	SELECT name, address, city, state
	FROM Business
	
	ORDER BY stars DESC
	LIMIT 30;
	`
	
	let searchQuery = `
	SELECT b.business_id, b.name,
	ByAppointmentOnly,BikeParking,
	RestaurantsPriceRange2 as RestaurantPricingRange,DogsAllowed
	FROM Business b
	JOIN (SELECT business_id, ByAppointmentOnly
	,BikeParking,RestaurantsPriceRange2,
	DogsAllowed
   FROM Service) AS c ON b.business_id = c.business_id
	Where b.business_id = '${business_id}';
	`
	if (business_id === '') {
		DBconnect.query(nullQuery, (err, data) => {
			if (err || data.length === 0) {
				console.log(err);
				res.json([]);
			} else {
				res.json(data);
			}
		});
	} else {
		
		DBconnect.query(searchQuery, (err, data) => {
			if (err || data.length === 0) {
				console.log(err);
				res.json([]);
			} else {
				res.json(data);
			}
		});
	}
  }


  const merchantDashboardBusinessInfo = async function(req, res) {
	
	const {
		business_id = "%",
		page = "%"
	} = req.query;

	// if all args are nulls, return all merchants in the merchant, order by stars
	let nullQuery = `
	SELECT name, address, city, state, stars
	FROM Business
	ORDER BY stars DESC
	LIMIT 30
	;
	`
	
	let searchQuery = `
	SELECT name, address, city, state, stars, review_count
	FROM Business 
	Where business_id ='${business_id}';
	`
	if (business_id === '') {
		DBconnect.query(nullQuery, (err, data) => {
			if (err || data.length === 0) {
				console.log(err);
				res.json([]);
			} else {
				res.json(data);
			}
		});
	} else {
		
		DBconnect.query(searchQuery, (err, data) => {
			console.log(business_id);
			if (err || data.length === 0) {
				console.log(err);
				res.json([]);
			} else {
				res.json(data);
			}
		});
	}
  }


//GET /merchantDashboardTips
const merchantDashboardTips = async function(req, res) {
	const {
		business_id = "%",
		page = "%"

	} = req.query;
	// if all args are nulls, return all merchants in the merchant, order by stars
	let nullQuery = `
	SELECT name, address, city, state, stars
	FROM Business
	ORDER BY stars DESC
	LIMIT 30
	;
	`
	
	let searchQuery = `
	SELECT b.business_id, b.name, c.user_id, c.text
	FROM Business b
	JOIN (SELECT business_id, user_id, text
		  FROM Tip) AS c ON b.business_id = c.business_id
	Where b.business_id = '${business_id}';
	`
	if (business_id === '') {
		DBconnect.query(nullQuery, (err, data) => {
			if (err || data.length === 0) {
				console.log(err);
				res.json([]);
			} else {
				res.json(data);
			}
		});
	} else {
		
		DBconnect.query(searchQuery, (err, data) => {
			console.log(business_id);
			if (err || data.length === 0) {
				console.log(err);
				res.json([]);
			} else {
				res.json(data);
			}
		});
	}
  }

  //GET /merchantDashboardTips
const merchantDashboardReviews = async function(req, res) {
	const {
		business_id = "%",
		page = "%"
	} = req.query;
	// if all args are nulls, return all merchants in the merchant, order by stars
	let nullQuery = `
	SELECT name, address, city, state, stars
	FROM Business
	ORDER BY stars DESC
	LIMIT 30;
	`
	
	
	let searchQuery = `
	SELECT b.business_id, b.name,
	user_id, c.text, c.stars, useful, funny, cool
	FROM Business b
	JOIN (SELECT business_id, user_id, text, stars, useful, funny, cool
   FROM Review) AS c ON b.business_id = c.business_id
	Where b.business_id = '${business_id}';
	`
	if (business_id === '') {
		DBconnect.query(nullQuery, (err, data) => {
			if (err || data.length === 0) {
				console.log(err);
				res.json([]);
			} else {
				res.json(data);
			}
		});
	} else {
		DBconnect.query(searchQuery, (err, data) => {
			if (err || data.length === 0) {
				console.log(err);
				res.json([]);
			} else {
				res.json(data);
			}
		});
	}
  }

  //GET /specificBussinessInfo
  const specificBussinessInfo = async function(req, res) {
	const {
		business_id = "%",
		page = "%"
	} = req.query;
	// if all args are nulls, return all merchants in the merchant, order by stars
	let nullQuery = `
	SELECT name, address, city, state, stars
	FROM Business
	ORDER BY stars DESC
	LIMIT 30;
	`
	let searchQuery = `
	SELECT b.business_id, b.name,
	user_id, c.text, c.stars, useful, funny, cool
	FROM Business b
	JOIN (SELECT business_id, user_id, text, stars, useful, funny, cool
   FROM Review) AS c ON b.business_id = c.business_id
	Where b.business_id = '${business_id}';
	`
	if (business_id === '') {
		DBconnect.query(nullQuery, (err, data) => {
			if (err || data.length === 0) {
				console.log(err);
				res.json([]);
			} else {
				res.json(data);
			}
		});
	} else {
		DBconnect.query(searchQuery, (err, data) => {
			if (err || data.length === 0) {
				console.log(err);
				res.json([]);
			} else {
				res.json(data);
			}
		});
	}
  }

//GET /historyComments
const historyComments = async function (req, res) {
    const page = req.query.page;
    const pageSize = req.query.page_size ?? 10;
    if (!page) {
        DBconnect.query(`
	  SELECT id, name, comment, date
	  FROM community_record
	  `, (err, data) => {
            if (err || data.length === 0) {
                console.log(err);
                res.json({});
            } else {
                res.json(data);
            }
        });
    } else {
        const start = (page - 1) * pageSize;
        // TODO (TASK 10): reimplement TASK 9 with pagination
        // Hint: use LIMIT and OFFSET (see https://www.w3schools.com/php/php_mysql_select_limit.asp)
        //res.json([]); // replace this with your implementation
        DBconnect.query(`
		SELECT id, name, comment, date
		FROM community_record
	 	LIMIT ${pageSize} OFFSET ${start}
	 `, (err, data) => {
            if (err || data.length === 0) {
                console.log(err);
                res.json({});
            } else {
                res.json(data);
            }
        });
    }

}

//  GET /show some difference between the restaurants
const showGapRestaurants = async function (req, res) {
    const page = req.query.page;
    const pageSize = req.query.page_size ?? 10;
    if (!page) {
        DBconnect.query(`
		SELECT c.account, r.name, r.address, r.category, 
		r.price_level, r.stars, r.review_count,  
		ABS(r.stars - AVG(r2.stars)) AS star_diff,
		ABS(r.review_count - AVG(r2.review_count)) AS review_diff
		FROM User c
		CROSS JOIN Business r
		LEFT JOIN Review rv 
			ON r.rid = rv.reviewed_restaurant_id 
			AND rv.reviewer_id = c.account 
		JOIN restaurant r2 
			ON r.category = r2.category 
			AND r.rid <> r2.rid
		GROUP BY c.account, r.rid
		HAVING COUNT(rv.reviewed_restaurant_id) = 0
		ORDER BY c.account, star_diff, review_diff, location_diff
		LIMIT 10;
	  `, (err, data) => {
            if (err || data.length === 0) {
                console.log(err);
                res.json({});
            } else {
                res.json(data);
            }
        });
    } else {
        const start = (page - 1) * pageSize;
        // TODO (TASK 10): reimplement TASK 9 with pagination
        // Hint: use LIMIT and OFFSET (see https://www.w3schools.com/php/php_mysql_select_limit.asp)
        //res.json([]); // replace this with your implementation
        DBconnect.query(`
		SELECT c.account, r.name, r.address, r.category, 
		r.price_level, r.stars, r.review_count,  
		ABS(r.stars - AVG(r2.stars)) AS star_diff,
		ABS(r.review_count - AVG(r2.review_count)) AS review_diff
		FROM User c
		CROSS JOIN Business r
		LEFT JOIN Review rv 
			ON r.rid = rv.reviewed_restaurant_id 
			AND rv.reviewer_id = c.account 
		JOIN restaurant r2 
			ON r.category = r2.category 
			AND r.rid <> r2.rid
		GROUP BY c.account, r.rid
		HAVING COUNT(rv.reviewed_restaurant_id) = 0
		ORDER BY c.account, star_diff, review_diff, location_diff
	 LIMIT ${pageSize} OFFSET ${start}
	 `, (err, data) => {
            if (err || data.length === 0) {
                console.log(err);
                res.json({});
            } else {
                res.json(data);
            }
        });
    }

}




//  GET /top_compliments
const top_compliments = async function (req, res) {
    const page = req.query.page;
    const pageSize = req.query.page_size ?? 10;
    if (!page) {
        DBconnect.query(`
	  SELECT name, SUM(compliment_count) AS total_compliments
	  FROM (
		  SELECT b.name, c.compliment_count
		  FROM Business b
		  JOIN (
			  SELECT business_id, SUM(compliment_count) AS compliment_count
			  FROM Tip
			  GROUP BY business_id
		  ) AS c ON b.business_id = c.business_id
	  ) AS business_compliments
	  GROUP BY name
	  ORDER BY total_compliments DESC;
	  
	  `, (err, data) => {
            if (err || data.length === 0) {
                console.log(err);
                res.json({});
            } else {
                res.json(data);
            }
        });
    } else {
        const start = (page - 1) * pageSize;
        // TODO (TASK 10): reimplement TASK 9 with pagination
        // Hint: use LIMIT and OFFSET (see https://www.w3schools.com/php/php_mysql_select_limit.asp)
        //res.json([]); // replace this with your implementation
        DBconnect.query(`
	 SELECT name, SUM(compliment_count) AS total_compliments
	 FROM (
		 SELECT b.name, c.compliment_count
		 FROM Business b
		 JOIN (
			 SELECT business_id, SUM(compliment_count) AS compliment_count
			 FROM Tip
			 GROUP BY business_id
		 ) AS c ON b.business_id = c.business_id
	 ) AS business_compliments
	 GROUP BY name
	 ORDER BY total_compliments DESC
  
	 LIMIT ${pageSize} OFFSET ${start}
	 `, (err, data) => {
            if (err || data.length === 0) {
                console.log(err);
                res.json({});
            } else {
                res.json(data);
            }
        });
    }

}

//findPartner(req, res)
//  /findPartner?business_id=:{business_id}
const findFriend = async function(req, res) {
	const {
		user_id = "%",
		page = "%"
	} = req.query;

	let searchQuery = `
	With getname as (
		select distinct r.user_id, B.name,u.name as user_name
		from Review r left join Business B on r.business_id = B.business_id
		left join User u on r.user_id = u.user_id
	)
	SELECT r1.user_name, r2.user_name
	FROM getname r1
	JOIN getname r2 ON r1.name = r2.name AND r1.user_id <> r2.user_id
	WHERE r1.user_id = '${user_id}'
	GROUP BY r1.user_id, r2.user_id
	HAVING COUNT(DISTINCT r1.name) > 1;
	`
	if (user_id === '') {
		DBconnect.query(nullQuery, (err, data) => {
				console.log(err);
				res.json([]);}
 
 
		);
	} else {
		DBconnect.query(searchQuery, (err, data) => {
			if (err || data.length === 0) {
				console.log(err);
				res.json([]);
			} else {
				res.json(data);
			}
		});
	}
  }
 

  const advancedSearch = async function (req, res) {
    const page = req.query.page;
    let options = JSON.parse(req.query.options);
    options = JSON.parse(options);
    const pageSize = 10;

    const {
        state = "%",
        city = "%",
        address = "%",
        stars = "%",
        priceRange = 0
    } = req.query;

    

    console.log(page)
    console.log(req.query)
    console.log("is")
    console.log(options.dogsAllowed === 1)

    const start = (page - 1) * pageSize;
    let query = `SELECT b.business_id, b.name, address, stars, city, state
             FROM Business b JOIN Service s ON b.business_id = s.business_id
             WHERE city LIKE '%${city}%' AND state LIKE '%${state}%'
             
            `;
    let params = [`%${city}%`, `%${state}%`];
    let conditions = [];

    if (options.dogsAllowed === 1) {
        conditions.push('DogsAllowed <> ?');
        params.push('False');
    }

    if (options.alcohol === 1) {
        conditions.push('Alcohol NOT LIKE ?');
        params.push('%none%');
    }

    if (options.driveThru === 1) {
        conditions.push('DriveThru <> ?');
        params.push('False');
    }

    if (options.reservationNeeded === 1) {
        conditions.push('RestaurantsReservations <> ?');
        params.push('False');
    }

    if (options.tableService === 1) {
        conditions.push('RestaurantsTableService <> ?');
        params.push('False');
    }

    if (options.happyHour === 1) {
        conditions.push('HappyHour <> ?');
        params.push('False');
    }

    if (priceRange != 0) {
        conditions.push('RestaurantsPriceRange2 = ?');
        params.push(priceRange);
    }

    
    
    query += `ORDER BY stars DESC LIMIT ${pageSize}  OFFSET ${start} 
               `
    console.log(query)

    DBconnect.query(query, params, function (error, results, fields) {
        if (error) {
            console.error(error);
            res.json({});
        } else {
            console.log(results);
            res.json(results);
        }
    });


}


const userSearch = async function (req, res) {
    const page = req.query.page;
    const pageSize = 10;

    const {
        id = "%",
        username = "%",
    } = req.query;

    console.log(username);
    console.log(id);

    let query='';

    if (id === "%" || id === ' ' || id === '') {
        console.log("name searching")
        query = `SELECT user_id as id, name as username, yelping_since as registrationDate, useful, funny, cool, fans, compliment_note, compliment_writer, compliment_photos
             FROM User
             WHERE name LIKE '%${username}%'
             ORDER BY fans DESC
             `;
             const start = (page - 1) * pageSize;
             query += ` \n LIMIT ${pageSize} \n OFFSET ${start}`
    } else {
        console.log("id searching")
        query = `SELECT user_id as id, name as username, yelping_since as registrationDate, useful, funny, cool, fans, compliment_note, compliment_writer, compliment_photos
             FROM User
             WHERE user_id LIKE '%${id}%'
             ORDER BY fans DESC
             LIMIT 1
             `;
    }
    
    
    

    
             DBconnect.query(query, (err, data) => {
                if (err || data.length === 0) {
                    console.log(err);
                    res.json({});
                } else {
                    console.log(data)
                    res.json(data);
                }
            });
}




module.exports = {
	testAuthor,
	testFindBusiness,
	normalMerchantSearch,
	top_compliments,
	businessid,
	merchantDashboardServiceInfo,
	merchantDashboardBusinessInfo,
	merchantDashboardTips,
	merchantDashboardReviews,
	findFriend,
	userSearch,
	advancedSearch,
	historyComments,
	showGapRestaurants,
	specificBussinessInfo

}