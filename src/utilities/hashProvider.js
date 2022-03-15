const bcrypt = require('bcrypt');
const saltRounds = 10;

const salt = bcrypt.genSaltSync(saltRounds);

const hash = (pwd) => bcrypt.hashSync(pwd, salt);
const compare = (pwd, hashPwd) => bcrypt.compareSync(pwd, hashPwd);
module.exports = {
    hash,
    compare
}
