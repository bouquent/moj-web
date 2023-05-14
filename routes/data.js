const express = require('express')
const router = express.Router();
const dataApi = require("../controllers/dataControllers")

router.get('/getAllProblem', dataApi.getProblem);
router.post('/saveSubmitHistory', dataApi.saveSubmitHistory);
router.get('/getSubmitHistory', dataApi.getSubmitHistory);
router.get('/getProblemData', dataApi.getProblemData);
router.post('/saveProblemData', dataApi.saveProblemData);
router.get('/getProblemCount', dataApi.getProblemCount);

module.exports = router;
