const db = require('../../dbconfig/dbConfig');

function getSubjects() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM SUBJECT;').
        then((response) => {
            resolve(response.rows);
        }).catch((response) => {
            reject(response);
        });
    });
}


module.exports = {
    getSubjects
};
