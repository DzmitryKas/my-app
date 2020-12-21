const fs = require('fs');
const File = require('../models/File');
const config = require('../../config/config');

class FileService {
    createDir(file) {
        const filePath = `${config.filePath}\\${file.user}\\${file.path}`
        return new Promise(((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath)
                    return resolve({message: 'File was created'})
                } else {
                    return reject({message: "File already exist"})
                }
            } catch (e) {
                return reject({message: 'File error'})
            }
        }))
    }

    deleteFile(file) {
        const path = this.getPath(file);
        if(file.type === 'dir') {
            fs.rmdirSync(path);
        } else {
            fs.unlinkSync(path);
        }
    }

    getPath(file) {
        return config.filePath + '\\' + file.user + '\\' + file.path;
     }

}


module.exports = new FileService()