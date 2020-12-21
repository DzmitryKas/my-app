import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getFiles, uploadFile} from '../../redux/actions/file';
import {setPopupDisplay, setCurrentDir} from '../../redux/reducers/fileReducer';
import FileList from './fielList/FileList';
import Popup from './Popup';
import Uploader from './uploader/Uploader';
import './disk.scss';

const Disk = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir);
    const dirStack = useSelector(state => state.files.dirStack);
    const [dragEnter, setDragEnter] = useState(false)


    useEffect(() => {
        dispatch(getFiles(currentDir));
    }, [currentDir])

    function showPopupHandler() {
        dispatch(setPopupDisplay('flex'))
    }

    function backClickHandler() {
        const backDirId = dirStack.pop();
        dispatch(setCurrentDir(backDirId))
    }

    function fileUploadHandler(event) {
        const files = [...event.target.files];
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    function dragEnterHandler(event) {
        event.preventDefault();
        event.stopPropagation();        
        setDragEnter(true)
    }

    function dragLeaveHandler(event) {
        event.preventDefault();
        event.stopPropagation();        
        setDragEnter(false)
    }

    function dropHandler(event) {
        event.preventDefault();
        event.stopPropagation();        
        let files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
    }

    return ( !dragEnter ?
        <div className='disk' onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            <div className="disk__btns">
                <div className="disk__back" onClick={() => backClickHandler()}>Назад</div>
                <div className="disk__create" onClick={() => showPopupHandler()}>Создать попку</div>
                <div className="disk__upload">
                    <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
                    <input multiple={true} onChange={(event) => fileUploadHandler(event)} type="file" id="disk__upload-input" className="disk__upload-input"/>
                </div>
            </div>            
            <FileList />
            <Popup />
            <Uploader />
        </div>
        :
        <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            Перетащите файл сюда
        </div>        
    );
};

export default Disk
