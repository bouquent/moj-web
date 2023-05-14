const express = require('express')
const router = express.Router();
const userApi = require("../controllers/userControllers")

router.post('/sign', userApi.sign);
router.post('/register', userApi.register);

module.exports = router;
