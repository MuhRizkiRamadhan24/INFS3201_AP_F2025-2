const persistence = require('./persistence')

/**
 * Get a photo by ID and populate album names
 * @param {string} photoId
 * @returns {Promise<Object|null>}
 */
async function getPhotoDetails(photoId) {
    const photo = await persistence.getPhotoDetails(photoId)
    if (!photo) return null

    const albumNames = []
    for (let aid of photo.albums) {
        const album = await persistence.getAlbumDetails(aid)
        if (album) albumNames.push(album.name)
    }
    photo.albumNames = albumNames
    return photo
}

/**
 * Update photo title and description
 * @param {string} photoId
 * @param {string} title
 * @param {string} description
 * @returns {Promise<boolean>}
 */
async function updatePhoto(photoId, title, description) {
    return await persistence.updatePhoto(photoId, title, description)
}

/**
 * Get all albums
 * @returns {Promise<Array>}
 */
async function getAllAlbums() {
    return await persistence.getAllAlbums()
}

/**
 * Get album by ID
 * @param {string} albumId
 * @returns {Promise<Object|null>}
 */
async function getAlbumDetails(albumId) {
    return await persistence.getAlbumDetails(albumId)
}

/**
 * Get album by name
 * @param {string} name
 * @returns {Promise<Object|null>}
 */
async function getAlbumDetailsByName(name) {
    return await persistence.getAlbumDetailsByName(name)
}

/**
 * Get all photos in an album
 * @param {string} albumId
 * @returns {Promise<Array>}
 */
async function getPhotosInAlbum(albumId) {
    return await persistence.getPhotosInAlbum(albumId)
}

/**
 * Add tag to a photo
 * @param {string} photoId
 * @param {string} tag
 * @returns {Promise<boolean>}
 */
async function addTag(photoId, tag) {
    return await persistence.addTag(photoId, tag)
}

module.exports = {
    getPhotoDetails,
    updatePhoto,
    getAllAlbums,
    getAlbumDetails,
    getAlbumDetailsByName,
    getPhotosInAlbum,
    addTag
}
