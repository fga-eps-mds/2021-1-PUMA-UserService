const { response } = require('express');
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
        db.query(
            'INSERT INTO SUBJECT(name,coursesyllabus) VALUES ($1,$2) RETURNING *',
            [subject.name, subject.coursesyllabus]
        ).then((response) => {
            resolve(response.rows[0].subjectid);
            updateIdentifies(subject, response.rows[0].subjectid)
        }).catch((response) => {
            reject(response);
        });
    })
}

function updateSubject(subject) {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE SUBJECT SET name = $1, coursesyllabus = $2 WHERE subjectid = $3 RETURNING *',
            [subject.name, subject.coursesyllabus, subject.subjectid]
        ).then((response) => {
            resolve(response.rows);
        }).catch((response) =>{
            reject(response);
        });
        deleteIdentifies(subject.subjectid).then((response) => {
            updateIdentifies(subject, subject.subjectid)
            resolve(response);
        }).catch((response) => {
            reject(response);
        });
    })
}

function updateIdentifies(subject, subjectid) {
    return new Promise((resolve, reject) => {
        subject.subareas.forEach((subarea) => {
            db.query(
                'INSERT INTO IDENTIFIES (subareaid,subjectid) VALUES ($1,$2) ', [subarea['subareaid'], subjectid],
            ).then(() => {
                resolve(response.rows);
            }).catch((response) => {
                reject(response);
            });
        });
    });
}

function getSubject(subjectIdParam) {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT DISTINCT s.subjectid,s.name,s.coursesyllabus,i.subareaid, sb.description FROM SUBJECT as s INNER JOIN IDENTIFIES as i ON (s.subjectid = i.subjectid and s.subjectid = $1) INNER JOIN SUBAREA as sb ON (i.subareaid = sb.subareaid)',
            [subjectIdParam],
        ).then((response) => {
            resolve(response.rows);
        }).catch((response) => {
            reject(response);
        });
    });
}

function deleteIdentifies(subjectId) {
    return new Promise((resolve, reject) => {
        db.query(
            'DELETE FROM IDENTIFIES WHERE subjectid IN ($1)', 
            [subjectId]
        ).then((response) =>{
            resolve(response);
        }).catch((response) => {
            reject(response);
        });;
    })
}

function deleteSubject(subjectId) {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM IDENTIFIES WHERE subjectid = $1`, [subjectId],
        ).then((response) =>{
            resolve(response);
        }).catch((response) => {
            reject(response);
        });

        db.query('DELETE FROM SUBJECT WHERE subjectid = $1 RETURNING *', [subjectId]
        ).then((response) => {
            resolve(response);
        }).catch((response) => {
            reject(response);
        });
    });
}

module.exports = {
    getSubjects,
    updateSubject,
    addSubject,
    getSubject,
    deleteSubject
};
