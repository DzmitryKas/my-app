import axios from 'axios';
import {addFile, setFiles, deleteFileAction} from '../reducers/fileReducer';
import { addUploaderFile, changeUploaderFile, showUploader } from '../reducers/uploadReducer';


export function getFiles(dirId) {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5000/files${dirId ? '?parent='+dirId : ''}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            console.log(response.data)
            dispatch(setFiles(response.data))
        } catch(e) {
            console.log(e)
        }
    } 
}

export function createDir(dirId, name) {
    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:5000/files`, {
                name,
                parent: dirId,
                type: 'dir'
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            console.log(response.data)
            dispatch(addFile(response.data))
        } catch(e) {
            console.log(e)
        }
    } 
}

export function uploadFile(file, dirId) {
    return async dispatch => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            if (dirId) {
                formData.append('parent', dirId)
            }
            const uploadFile = {name: file.name, progress: 0, id: Date.now()};
            dispatch(showUploader());
            dispatch(addUploaderFile(uploadFile));

            const response = await axios.post(`http://localhost:5000/files/upload`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    if (totalLength) {
                        uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        console.log(uploadFile.progress)
                        dispatch(changeUploaderFile(uploadFile))
                    }
                }
            })
            dispatch(addFile(response.data))
        } catch(e) {
            console.log(e)
        }
    } 
}

export async function downloadFile(file) {
    const response = await fetch(`http://localhost:5000/files/download?id=${file._id}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    if(response.status === 200) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
}

export function deleteFile(file) {
    return async dispatch => {
        try {            
            const response = await axios.delete(`http://localhost:5000/files?id=${file._id}`, {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(deleteFileAction(file._id));
            alert(response.data.message)
        } catch(e) {
            console.log(e.response.data.message)
        }
    } 
}