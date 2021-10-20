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

function addSubject(subject) {
    return new Promise((resolve, reject) => {
        let resp;
        switch (subject.operacao){
            case 'alteracao':
                resp = db.query(
                    'UPDATE SUBJECT SET name = $1, coursesyllabus = $2 WHERE subjectid = $3 RETURNING *',
                    [subject.name, subject.coursesyllabus, subject.subjectid]
                )
                break;
            case 'cadastro':
                resp = db.query(
                    'INSERT INTO SUBJECT(name,coursesyllabus) VALUES ($1,$2) RETURNING *',
                    [subject.name, subject.coursesyllabus]
                )
                break;
        }
        resp.then((response) => {
            resolve(response.rows);
        }).catch((response) => {
            reject(response);
        });
    });
}

function getSubject(subjectIdParam) {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM SUBJECT as s WHERE subjectid=$1',
            [subjectIdParam],
        ).then((response) => {
            resolve(response.rows);
        }).catch((response) => {
            reject(response);
        });
    });
}

module.exports = {
    getSubjects,
    addSubject,
    getSubject
};
