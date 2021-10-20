const subareaRepository = require('../repository/subareaRepository');

function getSubareas() {
    return new Promise(async (resolve, reject) => {
        try {
            const response =  await subareaRepository.getSubareas();
            resolve(response);
        } catch (e) {
            reject(e);
        }
        resolve();
    });
}

module.exports = { getSubareas };

