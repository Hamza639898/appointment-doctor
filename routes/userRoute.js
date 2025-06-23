const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userMiddleware = require('../middlewares/userMiddleware');

// Public routes
router.post('/register', userController.register);
router.post('/login', userMiddleware,userController.login); // ✅ no middleware here

// Protected route
router.get('/profile', userMiddleware, (req, res) => {
  res.json({ message: 'Protected route', user: req.user });
});

module.exports = router;
