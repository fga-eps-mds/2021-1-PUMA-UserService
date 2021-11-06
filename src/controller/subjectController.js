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

async function getSubject(subjectIdParam) {
    let knowledgeArea = await subjectRepository.getSubjectKnowledgeArea(subjectIdParam);
    console.log(knowledgeArea);
    let response = await subjectRepository.getSubject(subjectIdParam);
    response[0].knowledgeArea = [knowledgeArea];
    console.log(response);
    return response;
    // return new Promise((resolve, reject) => {
    //     try {
    //         let response = subjectRepository.getSubject(subjectIdParam);
    //         console.log(response);
    //         resolve(response);
    //     } catch (e) {
    //         reject(e);
    //     }
    //     resolve();
    // });
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
