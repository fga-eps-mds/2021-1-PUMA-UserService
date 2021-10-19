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

module.exports = { getSubjects };
