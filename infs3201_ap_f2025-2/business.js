const persistence = require('./persistence');

/**
 * Get photo details along with album names.
 */
async function getPhotoDetails(photoId) {
    const photoDetails = await persistence.getPhotoDetails(photoId);
    if (photoDetails) {
        const albumNames = [];
        for (let aid of photoDetails.albums) {
            const album = await persistence.getAlbumById(aid);
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
 * Get album details by ID.
 */
async function getAlbumDetails(id) {
    return await persistence.getAlbumDetails(Number(id));
}

/**
 * Get album details by name.
 */
async function getAlbumDetailsByName(name) {
    const albums = await persistence.getAllAlbums();
    return albums.find(a => a.name === name);
}

/**
 * Get all photos in an album.
 */
async function getPhotosInAlbum(albumId) {
    return await persistence.getPhotosInAlbum(albumId);
}

/**
 * Add a tag to a photo.
 */
async function addTag(photoId, tag) {
    return await persistence.addTag(photoId, tag);
}

/**
 * Get all albums.
 */
async function getAllAlbums() {
    return await persistence.getAllAlbums();
}

module.exports = {
    getPhotoDetails,
    updatePhoto,
    getAlbumDetails,
    getAlbumDetailsByName,
    getPhotosInAlbum,
    addTag,
    getAllAlbums
};



