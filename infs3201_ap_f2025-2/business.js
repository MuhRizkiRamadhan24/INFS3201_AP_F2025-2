const persistence = require('./persistence');

/**
 * Get photo details along with album names.
 */
async function getPhotoDetails(photoId) {
    const photoDetails = await persistence.getPhotoDetails(photoId);
    if (photoDetails) {
        const albumNames = [];
        for (let aid of photoDetails.albums) {
            const album = await persistence.getAlbumDetails(aid);
            if (album) albumNames.push(album.name);
        }
        photoDetails.albumNames = albumNames;
    }
    return photoDetails;
}

/**
 * Update photo title and description.
 */
async function updatePhoto(photoId, title, description) {
    return await persistence.updatePhoto(photoId, title, description);
}

/**
 * Get album by name.
 */
async function getAlbumDetailsByName(name) {
    return await persistence.getAlbumByName(name);
}


/**
 * Get all photos in an album.
 */
async function getPhotosInAlbum(albumId) {
    return await persistence.getPhotosInAlbum(albumId);
}

/**
 * Add tag to a photo.
 */
async function addTag(photoId, tag) {
    return await persistence.addTag(photoId, tag);
}

async function getAllAlbums() {
    const databaseAlbums = await persistence.getAllAlbums();
    return databaseAlbums;
}

module.exports = {
    getPhotoDetails,
    updatePhoto,
    getAlbumDetailsByName,
    getPhotosInAlbum,
    addTag
};

