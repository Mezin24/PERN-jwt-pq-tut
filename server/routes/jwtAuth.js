const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validationInfo');
const authorization = require('../middleware/authorization');

// REGISTER route
router.post('/register', validInfo, async (req, res) => {
  try {
    // 1. Get user info
    const { name, email, password } = req.body;

    // 2. Check if the user already exists
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).send(`User ${email} already exists`);
    }

    // 3. Bcrypt the user password

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // 4. Enter new user into DB
    const newUser = await pool.query(
      'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, bcryptPassword]
    );

    // 5. Generate JWT
    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json('Some problem with server');
  }
});

// LOGIN route

router.post('/login', validInfo, async (req, res) => {
  try {
    // 1. destructure the req.body
    const { email, password } = req.body;
    // 2. check if user doesn't exist (if not then we throw error)
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
      email,
    ]);

    if (user.rows.length === 0) {
      res.status(401).json({ message: "Such user doesn't exist" });
    }
    // 3. check if incoming password is the same the database password
    const checkPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!checkPassword) {
      res.status(401).json({
        message: 'Invalid password or email',
      });
    }
    // 4. give them the jwt token
    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/is-verify', authorization, async (req, res) => {
  try {
    res.status(200).send(true);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
