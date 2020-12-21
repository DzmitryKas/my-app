const authMiddleware = require('../middleware/auth.middleware');
const fileController = require('../controller/fileController');


module.exports = function fileRoutes(app) {
    app.post('/files', authMiddleware, fileController.createDir)
    app.post('/files/upload', authMiddleware, fileController.uploadFile)
    app.get('/files', authMiddleware, fileController.getFile)
    app.get('/files/download', authMiddleware, fileController.downloadFile)
    app.delete('/files', authMiddleware, fileController.deleteFile)
}