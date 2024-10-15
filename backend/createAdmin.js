const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,

});

const createAdminUser = async () => {
  const email = 'narendrakori2004@gmail.com';
  const plainPassword = 'Narendra@2005';

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);

  try {
    await pool.query('INSERT INTO admins (email, password) VALUES ($1, $2)', [email, hashedPassword]);
    console.log('Admin user created successfully');
  } catch (err) {
    console.error('Error creating admin:', err);
  } finally {
    pool.end();
  }
};

createAdminUser();
