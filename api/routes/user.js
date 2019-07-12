const express = require('express');
const router = express.Router();

const userRepository = require('../repository/userRepository');

router.post('/signup', userRepository.signupUser);

router.delete('/:userId', userRepository.deleteUser);

router.post('/login', userRepository.loginUser);

module.exports = router;