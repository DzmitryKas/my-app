import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import Input from '../../utils/input/Input';
import {setPopupDisplay} from '../../redux/reducers/fileReducer';
import {createDir} from '../../redux/actions/file';

import './disk.scss'

const Popup = () => {
    const [dirName, setDirName] = useState('');
    const popupDisplay = useSelector(state => state.files.popupDisplay);
    const currentDir = useSelector(state => state.files.currentDir);
    const dispatch = useDispatch()

    function createDirHandler() {
        dispatch(createDir(currentDir, dirName));
        dispatch(setPopupDisplay('none'));
        setDirName('');
    }

    return (
        <div className='popup' onClick={() => dispatch(setPopupDisplay('none'))} style={{display: popupDisplay}}>
            <div className="popup__content" onClick={(event => event.stopPropagation())}>
                <div className="popup__header">
                    <div className="popup__title">Создать новую папку</div>
                    <div className="popup__close" onClick={() => dispatch(setPopupDisplay('none'))}>x</div>
                </div>
                <Input type='text' placeholder='Создать новую папку...' value={dirName} setValue={setDirName}/>
                <button className="popup__create" onClick={() => createDirHandler()} >Создать</button>
            </div>

        </div>
    )
}

export default Popup
