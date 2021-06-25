import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux'
import {renderOnePhoto} from '../../src/store/photo'
import PhotoComments from './PhotoComments'
import PostComment from './PostComment'
import EditComment from './EditComment'
// import DeleteComment from './DeleteComment'
import DeleteConfirmModal from './DeleteConfirmModal';
import AddToAlbum from './Album/AddToAlbum';

function PhotoPage() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const photo = useSelector(state => state.photoReducer);
    const user = useSelector(state => state.session.user);

    console.log('photo from PhotoPage', photo)
    useEffect(()=>{
        dispatch(renderOnePhoto(Number(id))) //this
    }, [dispatch])


    return (
        <div>
            <div>
                {photo?.title}
            </div>
            <div>
                Date Taken: {photo?.date_taken}
            </div>
            <div>
                {photo?.caption}
            </div>
            <div className="photo-page--photo-div">
                <img className="photo-page--photo" src={photo?.image_url} />
                <PostComment photo={photo}/>
            </div>
            <div>
                <PhotoComments photo={photo}/>
                {/* <EditComment/> */}
                {/* <DeleteComment/> */}
            </div>
            <div>
                <AddToAlbum photo={photo} />
            </div>
        </div>
    )

}
export default PhotoPage;
