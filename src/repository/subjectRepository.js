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
            'INSERT INTO SUBJECT(name, coursesyllabus, class, semester, academicYear, accessPassword) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
            [subject.name, subject.coursesyllabus, subject.class, subject.semester, subject.academicYear, subject.accessPassword]
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
            'UPDATE SUBJECT SET name = $1, coursesyllabus = $2, class = $3, semester = $4, academicYear = $5, accessPassword = $6 WHERE subjectid = $7 RETURNING *',
            [subject.name, subject.coursesyllabus, subject.class, subject.semester, subject.academicYear, subject.accessPassword, subject.subjectid,]
        ).then((response) => {
            updateIdentifies(subject, subject.subjectid)
            resolve(response.rows);
        }).catch((response) =>{
            reject(response);
        });
    })
}

function updateIdentifies(subject, subjectid) {
    return new Promise((resolve, reject) => {
        deleteIdentifies(subjectid).then((response) => {
            subject.knowledgearea.forEach((knowledgeArea) => {
                db.query(
                    'INSERT INTO IDENTIFIES (knowledgeareaid,subjectid) VALUES ($1,$2) ', [knowledgeArea['knowledgeareaid'], subjectid],
                ).then(() => {
                    resolve(response.rows);
                }).catch((response) => {
                    reject(response);
                });
            });
        }).catch((response) => {
            reject(response);
        });
        
    });
}

async function getSubjectKnowledgeArea(subjectId) {
    return (await db.query(
        `SELECT DISTINCT k.knowledgeareaid, k.knowledgearea FROM KNOWLEDGE_AREA as k 
        INNER JOIN IDENTIFIES as i ON (k.knowledgeareaid = i.knowledgeareaid)
        INNER JOIN SUBJECT as s ON (i.subjectid = s.subjectid  and s.subjectid = $1)`,
        [subjectId],)
    ).rows;
}

async function getSubject(subjectIdParam) {
    return (await db.query(`SELECT * FROM SUBJECT WHERE subjectid = $1`, [subjectIdParam])).rows;
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
    deleteSubject,
    getSubjectKnowledgeArea,
};
