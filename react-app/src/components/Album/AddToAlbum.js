import React, { useState, useEffect } from "react";
import { Redirect, NavLink, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { renderAllAlbums } from "../../store/album";

// a dropdown menu for "Add to Album" that renders on a photo page
// IF the photo was posted by current_user

const AddToAlbum = ({photo}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const albums = useSelector(state => Object.values(state.albumReducer));

    useEffect(() => {
        dispatch(renderAllAlbums());
    }, [dispatch]);

    const [showForm, setShowForm] = useState(false);
    const [addAlbum, setAddAlbum] = useState("");

    const addPhotoForm = (e) => {
        e.preventDefault();
        console.log(addAlbum, typeof addAlbum)
        const formData = new FormData();
        formData.append("add_photo", addAlbum)
    }

    if (user.id === photo?.user_id) {
        return (
            <>
                <button type="button" onClick={setShowForm}>Add To Album</button>
                {showForm && (
                    <form onSubmit={addPhotoForm}>
                        <select name="albums" value={addAlbum} onChange={(e) => setAddAlbum(e.target.value)}>
                            {albums?.map(album =>
                                <option value={album?.id}>{album?.title}: {album?.id}</option>)}
                        </select>
                        <button>Add</button>
                    </form>
                )}
            </>
        )
    } else {
        return null;
    }

}

export default AddToAlbum;
