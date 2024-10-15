const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const Razorpay = require("razorpay");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg'); // Import the pg library
require('dotenv').config(); // Load environment variables



const app = express()
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: false})); 




// Create a new pool instance
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    // port: process.env.PGPORT,
  });


  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    console.log('Database connected successfully!');
    release(); // Release the client back to the pool
  });


//Tourist Signup or register

app.post('/signup-tourist' , (req , res) => {
    const sql = 'INSERT INTO tourists (name, email, password) VALUES ($1, $2, $3) RETURNING *';
    const values = req.body;
  

    pool.query(sql, values, (err, data) => {
        if (err) {
          console.error('Error executing query', err.stack);
          return res.status(500).json({ error: err.message });
        }
        return res.status(200).json(data.rows[0]);
      });
})


// Tourist Login 

app.post('/login-tourist', (req, res) => {
  const sql = 'SELECT * FROM tourists WHERE email = $1 AND password = $2';
  const values = [req.body.email, req.body.password];

  pool.query(sql, values, (err, data) => {
      if (err) {
          console.error('Error executing query', err.stack);
          return res.status(500).json({ error: err.message });
      }
      
      if (data.rows.length > 0) {
        const tourist_id = data.rows[0].tourist_id; // Extract tourist_id
        return res.status(200).json({ message: 'Login successful!', tourist_id }); // Return tourist_id
    } 
      
      else {
          return res.status(401).json({ message: 'Invalid email or password' });
      }
  });
});

//Guide Signup or register

app.post('/signup-guide' , (req , res) => {
    const sql = 'INSERT INTO guides (name, email, password) VALUES ($1, $2, $3) RETURNING *';
    const values = req.body;
  

    pool.query(sql, values, (err, data) => {
        if (err) {
          console.error('Error executing query', err.stack);
          return res.status(500).json({ error: err.message });
        }
        return res.status(200).json(data.rows[0]);
      });
})




// Guide login
app.post('/login-guide', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM guides WHERE email = $1 AND password = $2';
  pool.query(sql, [email, password], (err, data) => {
      if (err) {
          console.error('Error executing query', err.stack);
          return res.status(500).json({ error: 'Failed to login.' });
      }
      if (data.rows.length > 0) {
          return res.status(200).json({ guide_id: data.rows[0].guide_id });
      } else {
          return res.status(401).json({ error: 'Invalid email or password.' });
      }
  });
});



// Handle profile data insertion of guide
app.post('/insert-profile/:guide_id', (req, res) => {
  const guide_id = req.params.guide_id;
  const { location, profile_picture, contact_number, bio, rating } = req.body;

  const sql = `
    INSERT INTO GuideProfiles (guide_id, location, profile_picture, contact_number, bio, rating)
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT (guide_id) 
    DO UPDATE SET 
      location = EXCLUDED.location,
      profile_picture = EXCLUDED.profile_picture,
      contact_number = EXCLUDED.contact_number,
      bio = EXCLUDED.bio,
      rating = EXCLUDED.rating
    RETURNING *;
  `;

  const values = [guide_id, location, profile_picture, contact_number, bio, rating];

  pool.query(sql, values)
    .then(result => res.status(200).json(result.rows[0]))
    .catch(err => {
      console.error('Error executing query', err.stack);
      res.status(500).json({ error: err.message });
    });
});



// Route to get guide profile by guide_id
app.get('/guide-profile/:guide_id', async (req, res) => {
  const guide_id = req.params.guide_id;

  try {
    // Join guides and GuideProfiles tables to get the complete profile
    const result = await pool.query(`
      SELECT g.name, p.location, p.profile_picture, p.contact_number, p.bio, p.rating
      FROM guides g
      JOIN GuideProfiles p ON g.guide_id = p.guide_id
      WHERE g.guide_id = $1
    `, [guide_id]);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Profile not found' });
    }
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Failed to fetch profile data' });
  }
});




// Update guide profile by ID
app.put('/update-guide-profile/:guide_id', (req, res) => {
  const { guide_id } = req.params;
  const { location, profile_picture, contact_number, bio, rating } = req.body;
  const sql = `
      UPDATE GuideProfiles 
      SET location = $1, profile_picture = $2, contact_number = $3, bio = $4, rating = $5 
      WHERE guide_id = $6
      RETURNING *`;
  const values = [location, profile_picture, contact_number, bio, rating, guide_id];

  pool.query(sql, values, (err, result) => {
      if (err) {
          console.error('Error executing query', err.stack);
          return res.status(500).json({ error: 'Failed to update profile.' });
      }
      if (result.rows.length > 0) {
          return res.json(result.rows[0]);
      } else {
          return res.status(404).json({ error: 'Profile not found.' });
      }
  });
});





//  Route to get tourist profile by tourist_id

app.get('/tourist-profile/:tourist_id', async (req, res) => {
  const tourist_id = req.params.tourist_id;
  try {
    const result = await pool.query(`
      SELECT t.name, p.profile_picture, p.contact_number, t.email
      FROM tourists t
      JOIN touristprofiles p ON t.tourist_id = p.tourist_id
      WHERE t.tourist_id = $1
    `, [tourist_id]);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Profile not found' });
    }
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Failed to fetch profile data' });
  }
});




// Handle profile data insertion of guide

app.post('/insert-profile-tourist/:tourist_id', (req, res) => {
  const tourist_id = req.params.tourist_id;
  const { name, profile_picture, contact_number } = req.body;

  const sql = `
  INSERT INTO TouristProfiles (tourist_id, name, profile_picture, contact_number)
  VALUES ($1, $2, $3, $4)
  ON CONFLICT (tourist_id)
  DO UPDATE SET
    name = EXCLUDED.name,
    profile_picture = EXCLUDED.profile_picture,
    contact_number = EXCLUDED.contact_number
  RETURNING *;
  `;

  const values = [tourist_id, name, profile_picture, contact_number];

  pool.query(sql, values)
    .then(result => res.status(200).json(result.rows[0]))
    .catch(err => {
      console.error('Error executing query', err.stack);
      res.status(500).json({ error: err.message });
    });
});


//search guide
app.get('/search-guides', (req, res) => {
  const location = req.query.location;

  const sql = 'SELECT * FROM guides g JOIN GuideProfiles gp ON g.guide_id = gp.guide_id WHERE gp.location ILIKE $1';
  const values = [`%${location}%`];

  pool.query(sql, values, (err, data) => {
    if (err) {
      console.error('Error executing query', err.stack);
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(data.rows);
  });
});




//  Route for Creating a Booking:
app.post('/book-guide', (req, res) => {
  const { guide_id, tourist_id } = req.body;

  // The booking_date should be provided or default to current timestamp
  const booking_date = new Date(); // or provide a specific date if needed

  const sql = `
    INSERT INTO Bookings (guide_id, tourist_id, booking_date, status)
    VALUES ($1, $2, $3, 'pending') RETURNING *`;

  const values = [guide_id, tourist_id, booking_date];

  pool.query(sql, values)
    .then(result => res.status(200).json(result.rows[0]))
    .catch(err => {
      console.error('Error executing query', err.stack);
      res.status(500).json({ error: err.message });
    });
});


//Update booking 
app.put('/bookings/:booking_id', (req, res) => {
  const { booking_id } = req.params;
  const { status } = req.body;  // 'accepted', 'declined', or 'completed'
  
  const query = `
    UPDATE Bookings SET status = $1
    WHERE booking_id = $2
    RETURNING booking_id, tourist_id, guide_id, status`;

  pool.query(query, [status, booking_id])
    .then(result => {
      const booking = result.rows[0];

      // Ensure the booking was found
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      const notificationQuery = `
        INSERT INTO Notifications (tourist_id, guide_id, message, is_read, booking_id)
        VALUES ($1, $2, $3, false, $4)`;

      // Get current system time
      const currentTime = new Date(); // This gets the current system date and time
      let message = ''; // Initialize message variable

      // Construct the notification message based on the status
      if (status === 'accepted') {
        message = `Congratulations! Your booking with Guide ${booking.guide_id} has been accepted on ${currentTime}.`;
      } else if (status === 'declined') {
        message = `Your booking with Guide ${booking.guide_id} has been declined on ${currentTime}.`;
      } else if (status === 'completed') {
        message = `Your booking with Guide ${booking.guide_id} has been completed on ${currentTime}.`;
      } else {
        return res.status(400).json({ error: 'Invalid status' });
      }

      // Format the current time to a more readable format
      const formattedTime = currentTime.toLocaleString(); // Customize as needed

      // Replace placeholder with formatted time in the message
      const finalMessage = message.replace(currentTime, formattedTime);

      // Send the notification
      pool.query(notificationQuery, [booking.tourist_id, booking.guide_id, finalMessage, booking_id])
        .then(() => res.json({ success: true }))
        .catch(err => res.status(500).json({ error: 'Failed to send notification' }));
    })
    .catch(err => res.status(500).json({ error: 'Failed to update booking' }));
});





// Route to Fetch Guide's Bookings

app.get('/guide-bookings/:guide_id', (req, res) => {
  const { guide_id } = req.params;

  const sql = `SELECT * FROM Bookings WHERE guide_id = $1`;
  pool.query(sql, [guide_id], (err, data) => {
    if (err) {
      console.error('Error executing query', err.stack);
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(data.rows);
  });
});







//get notifications
app.get('/notifications/:tourist_id', (req, res) => {
  const { tourist_id } = req.params;
  
  const query = `
    SELECT 
    n.notification_id, 
    n.tourist_id, 
    t.name AS tourist_name, 
    t.email AS tourist_email, 
    g.guide_id,  
    g.email AS guide_email,
    gp.contact_number AS guide_contact_number,  
    tp.contact_number AS tourist_contact_number,  
    n.message, 
    n.is_read, 
    n.created_at, 
    n.booking_id,
    p.status,  -- Selecting payment status (if available)
    b.status AS booking_status
FROM 
    notifications n
JOIN 
    tourists t ON n.tourist_id = t.tourist_id
JOIN 
    touristprofiles tp ON n.tourist_id = tp.tourist_id
JOIN 
    bookings b ON n.booking_id = b.booking_id
JOIN 
    guides g ON b.guide_id = g.guide_id
JOIN 
    guideprofiles gp ON g.guide_id = gp.guide_id
LEFT JOIN 
    payments p ON b.booking_id = p.booking_id  -- Left join to include all bookings, even without payments
WHERE 
    n.tourist_id = $1;

  `;

  pool.query(query, [tourist_id])
    .then(result => res.json(result.rows))
    .catch(err => res.status(500).json({ error: 'Failed to fetch notifications' }));
});





// Get Booked Tours
app.get('/tourists/:tourist_id/booked-tours', (req, res) => {
  const { tourist_id } = req.params;
  const query = `
    SELECT bt.tour_name, bt.tour_description, bt.tour_date, g.name AS guide_name
    FROM BookedTours bt
    JOIN Guides g ON bt.guide_id = g.guide_id
    WHERE bt.tourist_id = $1`;

  pool.query(query, [tourist_id])
    .then(result => res.json(result.rows))
    .catch(err => res.status(500).json({ error: 'Failed to fetch booked tours' }));
});



//------------------------------------- Razor Pay API's---------------------------------------------







app.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { amount, notification_id } = req.body;
    console.log(notification_id)

    console.log("Key ID:", process.env.RAZORPAY_KEY_ID);
    console.log("Key Secret:", process.env.RAZORPAY_KEY_SECRET); // Only for debugging, do not log in production

    const options = {
      amount: amount, // Amount in paise
      currency: "INR", // Ensure currency is specified
      receipt: "narendrakori2004@gamil.com", // Use notification_id as the receipt
    };
    console.log("Creating order with options:", options);

    const order = await razorpay.orders.create(options);
    console.log("Order created successfully:", order);

    if (!order || !order.id) {
      return res.status(500).send("Error creating order");
    }

    // Fetch the booking_id based on the notification_id
    const bookingSql = `
      SELECT booking_id FROM Notifications WHERE notification_id = $1 LIMIT 1;
    `;

    const bookingResult = await pool.query(bookingSql, [notification_id]);
    console.log(bookingResult);

    if (bookingResult.rows.length === 0) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    const booking_id = bookingResult.rows[0].booking_id;

    // Insert payment record into the database
    const paymentSql = `
      INSERT INTO Payments (payment_id, booking_id, amount, status,order_id)
      VALUES ($1, $2, $3, $4,$5)
      RETURNING *;
    `;

    const values = ['unsuccessful', booking_id, amount / 100, 'pending',order.id];

    const paymentResult = await pool.query(paymentSql, values);
    console.log("Payment record inserted successfully:", paymentResult.rows[0]);

    // Send response with order and payment details
    console.log("order", order);
    console.log("paymentResult", paymentResult)
    const payment= paymentResult.rows[0];
    res.json({ order, payment });
  } catch (err) {
    console.error("Razorpay Error:", err);  // Log the error details
    console.error("Complete Error:", JSON.stringify(err, null, 2)); // Log the complete error object
    
    if (err.response) {
      console.error("Razorpay Response:", err.response);
      return res.status(err.response.status || 500).json({
        error: "Razorpay Error",
        details: err.response.data || "No details available",  // Send the error details in the response
      });
    }
    res.status(500).json({
      error: "Internal Server Error",
      details: err.message,  // Send the error message in the response
    });
  }
});







// Your Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Verify the payment signature
app.post("/verify-payment", (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

  // Generate a signature based on the payment details
  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    // Signature matches, payment is verified
    console.log("payment id: ",razorpay_payment_id)
    console.log("order id: ", razorpay_order_id)
     // Update Payments table
     const sql = `
     UPDATE Payments
     SET payment_id = $1, status = 'completed', payment_date = CURRENT_TIMESTAMP
     WHERE order_id = $2
     RETURNING *;
   `;
   const values = [razorpay_payment_id, razorpay_order_id];

   pool.query(sql, values)
     .then(result => {
       res.json({ success: true, message: "Payment verified successfully", payment: result.rows[0] });
     })
     .catch(err => {
       console.error('Error updating payment record', err.stack);
       res.status(500).json({ error: err.message });
     });

  } else {
    // Signature doesn't match, reject the payment

    // Update Payments table to 'failed'
    const sql = `
      UPDATE Payments
      SET status = 'failed'
      WHERE order_id = $1
      RETURNING *;
    `;
    const values = [razorpay_order_id];

    pool.query(sql, values)
      .then(result => {
        res.json({ success: false, message: "Payment verification failed", payment: result.rows[0] });
      })
      .catch(err => {
        console.error('Error updating payment record', err.stack);
        res.status(500).json({ error: err.message });
      });
  }
});





//--------------------------Support-----------------------------------//




// Support request submission route

app.post("/support", async (req, res) => {
  const { name, email, category, message } = req.body;

  try {
    const newSupportRequest = await pool.query(
      "INSERT INTO SupportRequests (name, email, category, message) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, category, message]
    );

    res.json(newSupportRequest.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});




// -----------------review-----------------//


app.post('/reviews/:booking_id', async (req, res) => {
  const {rating, comment } = req.body;
  const { booking_id } = req.params; 

  try {
    const result = await pool.query(
      'INSERT INTO Reviews (booking_id, rating, comment) VALUES ($1, $2, $3) RETURNING *',
      [booking_id, rating, comment]
    );
    res.status(201).json({ review: result.rows[0] });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Error creating review" });
  }
});


//--------------------------------admin----------------------------//

// Admin login API

app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const admin = result.rows[0];
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, { expiresIn: '3h' });

    return res.status(200).json({ success: true, token });
  } catch (err) {
    console.error('Error logging in:', err);
    return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});



//---------------------------------------------Admin functionality--------------------------------------------------//




// Fetch Payment Details
app.get('/api/admin/payments', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM payments`);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

//fetch support details
app.get('/api/admin/support',async (req, res) => {
  try {
   const result = await pool.query('SELECT * FROM supportrequests');
   res.status(200).json(result.rows);
  }catch{
   console.error('Error fetching payments:', error);
   res.status(500).json({success : false, message: 'server error. please try again late'})
  } 
 });
 

// Fetch Tourist Details
app.get('/api/admin/tourists', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tourists');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching tourists:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

// Fetch Guide Details
app.get('/api/admin/guides', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM guides');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching guides:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

// Remove Tourist
app.delete('/api/admin/tourists/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM tourists WHERE tourist_id = $1', [id]);
    res.status(200).json({ success: true, message: 'Tourist removed successfully.' });
  } catch (error) {
    console.error('Error deleting tourist:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

// Remove Guide
app.delete('/api/admin/guides/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM guides WHERE guide_id = $1`, [id]);
    res.status(200).json({ success: true, message: 'Guide removed successfully.' });
    console.log(id)
    console.log("removed success");
  } catch (error) {
    console.error('Error deleting guide:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});


// Search Tourist by ID or Name
app.get('/api/admin/tourists/search', async (req, res) => {
  const { id, name } = req.query;

  try {
    let result;
    if (id) {
      result = await pool.query('SELECT * FROM tourists WHERE id = $1', [id]);
    } else if (name) {
      result = await pool.query('SELECT * FROM tourists WHERE name ILIKE $1', [`%${name}%`]);
    } else {
      return res.status(400).json({ success: false, message: 'Please provide a search term' });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error searching tourists:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

// Search Guide by ID or Name
app.get('/api/admin/guides/search', async (req, res) => {
  const { id, name } = req.query;

  try {
    let result;
    if (id) {
      result = await pool.query('SELECT * FROM guides WHERE id = $1', [id]);
    } else if (name) {
      result = await pool.query('SELECT * FROM guides WHERE name ILIKE $1', [`%${name}%`]);
    } else {
      return res.status(400).json({ success: false, message: 'Please provide a search term' });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error searching guides:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});






app.listen(8081 , ()=>{
    console.log("Listening............");
})
