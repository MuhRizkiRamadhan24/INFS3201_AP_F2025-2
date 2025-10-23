const { MongoClient, ObjectId } = require('mongodb')

const url = 'mongodb+srv://Rizki:Rizki123@web2.tepl5ma.mongodb.net/?appName=Web2'
const dbName = 'infs3201_fall2025'
let db

async function connect() {
    if (!db) {
        const client = await MongoClient.connect(url, { useUnifiedTopology: true })
        db = client.db(dbName)
    }
    return db
}

// Get photo by ID
async function getPhotoDetails(photoId) {
    const database = await connect()
    const photo = await database.collection('photos').findOne({ _id: ObjectId(photoId) })
    return photo
}

// Get all photos in an album
async function getPhotosInAlbum(albumId) {
    const database = await connect()
    const photos = await database.collection('photos').find({ albums: ObjectId(albumId) }).toArray()
    return photos
}

// Get album by ID
async function getAlbumDetails(albumId) {
    const database = await connect()
    const album = await database.collection('albums').findOne({ _id: ObjectId(albumId) })
    return album
}

// Get album by name
async function getAlbumDetailsByName(name) {
    const database = await connect()
    const album = await database.collection('albums').findOne({ name: name })
    return album
}

// Update photo
async function updatePhoto(photoId, title, description) {
    const database = await connect()
    const result = await database.collection('photos').updateOne(
        { _id: ObjectId(photoId) },
        { $set: { title, description } }
    )
    return result.modifiedCount > 0
}

// Add tag
async function addTag(photoId, tag) {
    const database = await connect()
    const result = await database.collection('photos').updateOne(
        { _id: ObjectId(photoId), tags: { $ne: tag } },
        { $push: { tags: tag } }
    )
    return result.modifiedCount > 0
}

module.exports = {
    getPhotoDetails, getPhotosInAlbum, getAlbumDetails,
    getAlbumDetailsByName, updatePhoto, addTag
}
