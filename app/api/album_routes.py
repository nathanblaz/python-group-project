from flask import Blueprint, request
from app.models import db, Photo, Album, User
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload;
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

album_routes = Blueprint("albums", __name__)


@album_routes.route("/")
def get_all_albums():
    albums = Album.query.all()
    if albums is None:
        return {"albums": "nothing here!"}
    # return {"albums": [album.id for album in albums]}
    return {"albums": [album.to_dict() for album in albums]}


@album_routes.route("/<int:id>")
def get_one_album(id):
    album = Album.query.get(id)
    if album is None:
        return {"albums": "nothing here!"}
    return album.to_dict()


@album_routes.route("/add", methods=["POST"])
def add_photos_album():
    photo = Photo.query.get(request.form["photo_id"])
    print("*************add photo album route", photo.to_dict())
    album = Album.query.get(request.form["add_to_album_id"])
    photo.albums.append(album)
    db.session.add(photo)
    db.session.commit()
    return {"album": album.to_dict() }


@album_routes.route("/new", methods=["POST"])
@login_required
def create_album():
    new_album = Album(
                    title=request.form["title"],
                    description=request.form["description"],
                    user_id=request.form["user_id"]
                    )
    db.session.add(new_album)
    db.session.commit()
    return new_album.to_dict()


@album_routes.route("/<id>", methods=["DELETE"])
@login_required
def delete_album(id):
    album = Album.query.get(id)
    db.session.delete(album)
    db.session.commit()
    return {"success": "album deleted"}