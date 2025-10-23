const fs = require('fs/promises')
const PHOTO_FILE = 'photos.json'

/**
 * This function loads the json data from the file and returns it as an array of
 * photo objects.
 * @returns An array of photo objects
 */
async function loadPhotoData() {
    let raw = await fs.readFile(PHOTO_FILE, 'utf-8')
    let decoded = await JSON.parse(raw)
    return decoded
}

/**
 * Read the file contents of the user configuration file.
 * @returns 
 */
async function loadUserFile() {
    let raw = await fs.readFile('users.json', 'utf-8')
    let decoded = await JSON.parse(raw)
    return decoded
}

/**
 * Load the information about the albums into memory.
 * @returns An array of photo objects.
 */
async function loadAlbumData() {
    let raw = await fs.readFile('albums.json')
    let decoded = await JSON.parse(raw)
    return decoded
}

/**
 * Save the data to the JSON file.
 * @param {Array of json objects} data 
 */
async function savePhotoData(data) {
    let dataString = JSON.stringify(data, null, 2)
    await fs.writeFile(PHOTO_FILE, dataString, 'utf-8')
}

/**
 * Find details about an album given the albumId
 * @param {*} albumId The ID to search for.
 * @returns An object with the information or undefined if the album was not found.
 */
async function getAlbumDetails(albumId) {
    let albumList = await loadAlbumData()
    for (let a of albumList) {
        if (a.id === albumId) {
            return a
        }
    }
    return undefined
}

/**
 * Find an album given its name.
 * @param {*} name The name of the album, ignoring the case
 * @returns The album or undefined if it was not found.
 */
async function getAlbumDetailsByName(name) {
    let albumList = await loadAlbumData()
    for (let a of albumList) {
        if (a.name.toLowerCase() === name.toLowerCase()) {
            return a
        }
    }
    return undefined
}

/**
 * Get details about a photo given its ID
 * @param {*} photoId 
 * @returns An object if the photos is found or undefined if itwas not found.
 */
async function getPhotoDetails(photoId) {
    let photoList = await loadPhotoData()
    for (let p of photoList) {
        if (p.id === photoId) {
            return p
        }
    }
    return undefined
}

/**
 * Get an array of photos in the given album.
 * @param {*} albumId 
 * @returns A list of photos. If no photos (or album) are found then the function returns
 * an empty array.
 */
async function getPhotosInAlbum(albumId) {
    let result = []
    let photoList = await loadPhotoData()
    for (let p of photoList) {
        if (p.albums.includes(albumId)) {
            result.push(p)
        }
    }
    return result
}

/**
 * Update a photo given its PID with the new title and description.
 * @param {*} pid 
 * @param {*} title 
 * @param {*} description 
 * @returns true if the photo was updated, false otherwise
 */
async function updatePhoto(pid, title, description) {
    let updated = false
    let photoList = await loadPhotoData()
    for (let p of photoList) {
        if (p.id === pid) {
            p.title = title
            p.description = description
            updated = true
        }
    }
    await savePhotoData(photoList)
    return updated
}

/**
 * Add the tag to an existing photo.  This function does no validation... if the caller adds
 * multiple copies of the same name the list would contain multiple occurrences of the tag.
 * @param {*} pid 
 * @param {*} tag 
 * @returns 
 */
async function addTag(pid, tag) {
    let updated = false
    let photoList = await loadPhotoData()
    for (let p of photoList) {
        if (p.id === pid) {
            p.tags.push(tag)
            updated = true
        }
    }
    await savePhotoData(photoList)
    return updated
}

/**
 * Get the details of a certain user... including any password so that the business
 * logic can check if the password is correct.  
 * @param {*} uname 
 * @returns The detail record.
 */
async function getUserDetails(uname) {
    let userList = await loadUserFile()
    for (let u of userList) {
        if (u.username === uname) {
            return u
        }
    }
    return undefined
}

module.exports = {
    getPhotoDetails, getPhotosInAlbum, getAlbumDetails,
    getAlbumDetailsByName, updatePhoto, addTag, getUserDetails
}