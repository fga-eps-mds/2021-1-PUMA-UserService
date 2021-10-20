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
        switch (subject.operacao) {
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
        resp.then(async (response) => {
            const subjectId = response.rows[0].subjectid;
            if (subject.operacao === 'alteracao') {
                await db.query('DELETE FROM IDENTIFIES WHERE subjectid IN ($1)', [subjectId]);
            }
            subject.subareas.forEach((subarea) => {
                db.query(
                    'INSERT INTO IDENTIFIES (subareaid,subjectid) VALUES ($1,$2) ', [subarea['subareaid'], subjectId],
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

module.exports = {
    getSubjects,
    addSubject,
    getSubject
};
