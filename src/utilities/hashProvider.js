const bcrypt = require('bcrypt');
const saltRounds = 10;

const salt = bcrypt.genSaltSync(saltRounds);

export const hash = (pwd) => bcrypt.hashSync(pwd, salt);
export const compare = (pwd, hashPwd) => bcrypt.compareSync(pwd, hashPwd);

