import axios from 'axios';
import Constants from '../constants/CommonConstants';

export function getData(url, callback, errorcallback) {
    const path = Constants.BASE_URL + Constants.COLON + Constants.PORT + Constants.FORWARD_SLASH + url;

    const loadData = async () => {
        await axios.get(path)
            .then(res => {
                if (callback != null) {
                    callback(res);
                }
            })
            .catch(err => {
                if (errorcallback != null) {
                    errorcallback(err);
                }
            })
    };
    loadData();
}

export function postData(url, data, callback, errorcallback) {
    const path = Constants.BASE_URL + Constants.COLON + Constants.PORT + Constants.FORWARD_SLASH + url;
    const loadData = async () => {
        await axios.post(path, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (callback != null) {
                callback(res);
            }
        })
            .catch(err => {
                if (errorcallback != null) {
                    errorcallback(err);
                }
            });
    };
    loadData();
}