import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import UploadFile from './UploadFile';
import {hideUploader} from '../../../redux/reducers/uploadReducer';
import './uploader.scss';

const Uploader = () => {
    const isVisible = useSelector(state => state.upload.isVisible);
    const files = useSelector(state => state.upload.files);
    const dispatch = useDispatch()
    // const files = [{id:1, name:'file', progress:50}, {id:2, name:'file', progress:0}]

    function handlerClickClose() {
        dispatch(hideUploader())
    }

    return ( isVisible &&
        <div className="uploader">
            <div className="uploader__header">
                <div className="uploader__title">Загрузки</div>
                <div className="uploader__close" onClick={handlerClickClose}>X</div>
            </div>
            {files.map(file => 
                <UploadFile key={file.id} file={file} /> 
            )}
        </div>
    )
}

export default Uploader
