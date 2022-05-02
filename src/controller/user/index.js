const getAll = require('./getAll');
const activate = require('./activate');
const deactivate = require('./deactivate');
const remove = require('./remove');
const update = require('./update');
const changePassword = require('./changePassword');
const getFullInfo = require('./getFullInfo');
const statisticalCountUser = require('./statistical-count-user');

module.exports = {
    getAll,
    activate,
    deactivate,
    remove,
    update,
    changePassword,
    getFullInfo,
    statisticalCountUser
}