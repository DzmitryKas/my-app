import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import './file.scss';

import {pushToStack, setCurrentDir} from '../../../../redux/reducers/fileReducer';
import {downloadFile, deleteFile} from '../../../../redux/actions/file';
import dirLogo from '../../../../assets/img/svg/dir.svg';
import fileLogo from '../../../../assets/img/svg/file.svg';
import sizeFormat from '../../../../utils/sizeFormat';

const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)

    function openDirHandler() {
        if(file.type === 'dir') {
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(file._id))
        }        
    }

    function downloadClickHandler(event) {
        event.stopPropagation();
        downloadFile(file)
    }

    function deleteClickHandler(event) {
        event.stopPropagation();
        dispatch(deleteFile(file))
    }

    return (
        <div className='file' onClick={() => openDirHandler()}> 
            <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img"/>
            <div className="file__name">{file.name}</div>
            <div className="file__date">{file.date.slice(0, 10)}</div>
            <div className="file__size">{sizeFormat(file.size)}</div>
            {file.type !== 'dir' && <button className="file__btn file__download" onClick={(e) => downloadClickHandler(e)}>Download</button>}
            <button className="file__btn file__delete" onClick={(e) => deleteClickHandler(e)}>Delete</button>
        </div>
    )
}

export default File
