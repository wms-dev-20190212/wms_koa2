const models = require('../models/company');
//const superagent = require('superagent')
    /*function Product(x) {
        this.data = x;
    }*/
module.exports = {
    createProduct: (x) => {//新增
        var p = x;
        console.log(p)
        async function getData() {
            await models.create(p); //写入数据库
        }
        getData();
        return p;
    },
    upProduct: (ids) => {//更新修改
        async function upData(obj) {
            var userName = obj;
            userName.updatedAt = Date.now();
            userName.version++;
            await models.update(userName, {
                where: {
                    id: userName.id
                }
            });
        }
        upData(ids);
    },
    delProduct: (ids) => {
        async function delData(ids) {
            await models.destroy({
                where: {
                    id: ids
                }
            });
        }
        delData(ids);
    }
};
