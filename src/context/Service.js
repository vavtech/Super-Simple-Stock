import axios from 'axios';

export function getData(url, callback, errorcallback) {
    axios.get(url)
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
}

export function postData(url, data, callback, errorcallback) {
    axios.post(url, data, {
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
}