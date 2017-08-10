import axios from 'axios';

export default {
    // 获取新增人次的概要
    getExampleData: function (account, password, remember) {
        return new Promise((resolve, reject) => {
            axios.get('/getExample')
            .then((d) => {
                if (d.data.success === true) {
                    let data = d.data.data;
                    resolve(data);
                } else {
                    reject(d.data.msg);
                }
            }, (d) => {
                reject(d.msg);
            });
        });
    }
};
