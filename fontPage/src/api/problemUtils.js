import axios from '../utils/requestHttp'
import path from "./urlPath"
import md5 from 'js-md5'

const getStatusCount = 5;

async function sleep(timeMs) {
    return new Promise(resolve => setTimeout(resolve, timeMs));
}

function getEncodedstr(verify_str, timestamp) {
    let key = "zmTfp3Yw&-bfasfhaBclFD1q*(+_ya^12P";
    verify_str = verify_str + ':' + parseInt(timestamp).toString(16) + ':' + key;
    let encoded_str = md5(verify_str);
    return encoded_str;
}

async function getStatus(theSubmissionId, theSubmitType) {
    let timestamp = parseInt(new Date().getTime() / 1000);
    let encoded_str = getEncodedstr("submit", timestamp);
    try {
        const response = await axios({
            method:'get',
            url: path.getStatusUrl,
            params: {
                submissionId: theSubmissionId,
                submitType: theSubmitType,
            },
            headers: {
                "Content-Type": "application/json",
                "timestamp": timestamp,
                "encoded-str": encoded_str,
            },
        })  
        return response;
    } catch (error) {
        return error;
    }
}

const api = {

async submitCode(submitData, theProblemId) {
    let timestamp = parseInt(new Date().getTime() / 1000);
    let encoded_str = getEncodedstr("submit", timestamp);
    let submitType = submitData['submitType'];
    let getStatusResponse;
    try {
        const response = await axios({
            method:'post',
            url: path.submitUrl,
            params: {
                problemId:theProblemId,
            },
            data: submitData,
            headers: {
                "Content-Type": "application/json",
                "timestamp": timestamp,
                "encoded-str": encoded_str,
            },
            timeout: 10000,
        })
        
        for (let i = 0; i < getStatusCount; ++i) {
            let getStatusResponse = await getStatus(response.data.submissionId, submitType);
            let judgeResult = getStatusResponse.data;
            if ((typeof judgeResult["status"] != "undefined") && judgeResult["status"] != 0) {
                return judgeResult;
            }
            //模拟睡眠
            await sleep(2000);
        }
        return "request limitout";
    } catch(error) {
        let resultData = {
            status:13,
            timeConsumptionMs:0,
            memoryConsumptionKbs:0,
            allCaseNum:0,
            rightCaseNum:0,
            memo: {
              stderr: error,
            }
          };
          return error;
    }
},

async saveHisotrySubmit(theProblemId, theProblemName, theSubmitStatus, theAccount)
{
    let timestamp = parseInt(new Date().getTime() / 1000);
    let encoded_str = getEncodedstr("submit", timestamp);
    const response = axios({
        method:'post',
        url: path.saveSubmitHistoryUrl,
        headers: {
            "Content-Type": "application/json",
            "timestamp": timestamp,
            "encoded-str": encoded_str,
        },
        data: {
            "problemId": theProblemId,
            "problemName": theProblemName,
            "submitStatus": theSubmitStatus,
            "account": theAccount,
        },
    });
},

async fetchProblems()
{
    let timestamp = parseInt(new Date().getTime() / 1000);
    let encoded_str = getEncodedstr("submit", timestamp);
    try {
        const response = await axios({
            method:'get',
            url: path.getProblemTitleUrl,
            headers: {
                "Content-Type": "application/json",
                "timestamp": timestamp,
                "encoded-str": encoded_str,
            },
        })
        return response.data;
    } catch(error) {
        return error;
    }
},

async getProblemData(theProblemId)
{
    let timestamp = parseInt(new Date().getTime() / 1000);
    let encoded_str = getEncodedstr("submit", timestamp);
    try {
        const response = await axios({
            method:'get',
            url: path.getProblemDataUrl,
            headers: {
                "Content-Type": "application/json",
                "timestamp": timestamp,
                "encoded-str": encoded_str,
            },
            params: {
                problemId:theProblemId,
            },
        })
        return response.data["problemData"];
    } catch(error) {
        return error;
    }
},

async getSubmitHistory(theAccount)
{
    let timestamp = parseInt(new Date().getTime() / 1000);
    let encoded_str = getEncodedstr("submit", timestamp);
    try {
        const response = await axios({
            method:'get',
            url: path.getSubmitHistoryUrl,
            headers: {
                "Content-Type": "application/json",
                "timestamp": timestamp,
                "encoded-str": encoded_str,
            },
            params: {
                account:theAccount,
            },
        })
        return response.data["submitHistory"];
    } catch(error) {
        return error;
    }
},

async getProblemCount()
{
    let timestamp = parseInt(new Date().getTime() / 1000);
    let encoded_str = getEncodedstr("submit", timestamp);
    try {
        const response = await axios({
            method:'get',
            url: path.getProblemCountUrl,
            headers: {
                "timestamp": timestamp,
                "encoded-str": encoded_str,
            },
        })
        return response.data["problemCount"];
    } catch(error) {
        return error;
    }
}

}

export default api;
