const express = require('express')
const router = express.Router();
const submitApi = require("../controllers/submitControllers")

router.post('/submitCode', submitApi.submitCode);
router.get('/getStatus', submitApi.getSubmitStatus);

module.exports = router;