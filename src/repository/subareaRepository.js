const db = require('../../dbconfig/dbConfig');

function getSubareas() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM SUBAREA;').
        then((response) => {
            resolve(response.rows);
        }).catch((response) => {
            reject(response);
        });
    });
}


module.exports = {
    getSubareas
};