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

function updateSubject(subject) {
    return new Promise(async (resolve, reject) => {
        try {
            const response =  await subjectRepository.updateSubject(subject);
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

function deleteSubject(subjectId) {
    return new Promise((resolve, reject) => {
        try {
            const response = subjectRepository.deleteSubject(subjectId);
            resolve(response);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = { 
    getSubjects,
    addSubject,
    getSubject,
    updateSubject,
    deleteSubject
};
