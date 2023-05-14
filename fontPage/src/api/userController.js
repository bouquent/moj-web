import axios from '../utils/requestHttp'
import path from "./urlPath"
import md5 from 'js-md5'

async function sleep(timeMs) {
    return new Promise(resolve => setTimeout(resolve, timeMs));
}

function getEncodedstr(verify_str, timestamp) {
    let key = "zmTfp3Yw&-bfasfhaBclFD1q*(+_ya^12P";
    verify_str = verify_str + ':' + parseInt(timestamp).toString(16) + ':' + key;
    let encoded_str = md5(verify_str);
    return encoded_str;
}

const api = {

async userLogin(account, password) {
    let timestamp = parseInt(new Date().getTime() / 1000);
    let encoded_str = getEncodedstr("submit", timestamp);
    try {
        const ret = await axios({
            method:'post',
            url: path.userLoginUrl,
            headers: {
                "Content-Type": "application/json",
                "timestamp": timestamp,
                "encoded-str": encoded_str,
            },
            data: {
                "account": account,
                "password": password,
            },
        });
        return ret;
    } catch(error) {
        return error;
    }
},

async userRegister(userName, userPassword)
{
    let timestamp = parseInt(new Date().getTime() / 1000);
    let encoded_str = getEncodedstr("submit", timestamp);
    try {
        const ret = await axios({
            method:'post',
            url: path.userRegisterUrl,
            headers: {
                "Content-Type": "application/json",
                "timestamp": timestamp,
                "encoded-str": encoded_str,
            },
            data: {
                "name": userName,
                "password": userPassword,
            },
        });
        return ret;
    } catch(error) {
        return error;
    }
}

}

export default api;