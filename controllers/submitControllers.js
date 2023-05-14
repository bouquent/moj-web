const axios = require('axios')

async function submitCode(req, res) {
    
    const {method, headers, body} = req;
    const judgeUrl = "http://39.104.62.0:8181/judge/submit?problemId=" + req.query.problemId;
 
    try {
        const response = await axios({
            method,
            url: judgeUrl,
            headers,
            data:body,
        });
        res.status(response.status).send(response.data);
    } catch (error){
	    console.log(error)
    }

}

async function getSubmitStatus(req, res) {
    const {method, headers, body} = req;
    const getStatusUrl = "http://39.104.62.0:8181/judge/status?submissionId=" 
    + req.query.submissionId + "&submitType=" + req.query.submitType; 

    try {
        const response = await axios({
            method,
            url: getStatusUrl,
            headers,
            data:body,
        });
        res.status(response.status).send(response.data);
    } catch (error){
	    console.log(error);
    }
}

module.exports = {
    submitCode,
    getSubmitStatus,
}
