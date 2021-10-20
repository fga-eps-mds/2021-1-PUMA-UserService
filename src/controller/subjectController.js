const subjectRepository = require('../repository/subjectRepository');

function getSubjects() {
    return new Promise(async (resolve, reject) => {
        try {
            const response =  await subjectRepository.getSubjects();
            resolve(response);
        } catch (e) {
            reject(e);
        }
        resolve();
    });
}

function addSubject(subject) {
    return new Promise(async (resolve, reject) => {
        try {
            const response =  await subjectRepository.addSubject(subject);
            resolve(response);
        } catch (e) {
            reject(e);
        }
        resolve();
    });
}

function getSubject(subjectIdParam) {
    return new Promise((resolve, reject) => {
        try {
            const response = subjectRepository.getSubject(subjectIdParam);
            resolve(response);
        } catch (e) {
            reject(e);
        }
        resolve();
    });
}

module.exports = { getSubjects, addSubject, getSubject };
