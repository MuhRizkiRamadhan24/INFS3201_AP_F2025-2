const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://Rizki:Rizki123@web2.tepl5ma.mongodb.net/?appName=Web2';
const dbName = 'infs3201_fall2025';

let db;

// --- Connect to MongoDB ---
async function connectDB() {
    if (!db) {
        const client = new MongoClient(url);
        await client.connect();
        console.log('✅ Connected to MongoDB Atlas');
        db = client.db(dbName);
    }
    return db;
}

// --- Get photo details by ID ---
async function getPhotoDetails(photoId) {
    const database = await connectDB();
    return await database.collection('photos').findOne({ id: Number(photoId) });
}

// --- Update a photo’s title and description ---
async function updatePhoto(photoId, title, description) {
    const database = await connectDB();
    const result = await database.collection('photos').updateOne(
        { id: Number(photoId) },
        { $set: { title, description } }
    );
    return result.modifiedCount === 1;
}

// --- Get album details by ID ---
async function getAlbumDetails(albumId) {
    const database = await connectDB();
    return await database.collection('albums').findOne({ id: Number(albumId) });
}

// --- Get album details by name ---
async function getAlbumDetailsByName(name) {
    const database = await connectDB();
    return await database.collection('albums').findOne({ name });
}

// --- Get all albums ---
async function getAllAlbums() {
    const database = await connectDB();
    return await database.collection('albums').find().toArray();
}

// --- Get all photos in an album ---
async function getPhotosInAlbum(albumId) {
    const database = await connectDB();
    return await database.collection('photos').find({ albums: Number(albumId) }).toArray();
}

// --- Add a tag to a photo ---
async function addTag(photoId, tag) {
    const database = await connectDB();
    const result = await database.collection('photos').updateOne(
        { id: Number(photoId) },
        { $addToSet: { tags: tag.toLowerCase() } }
    );
    return result.modifiedCount === 1;
}

// --- Export all ---
module.exports = {
    connectDB,
    getPhotoDetails,
    updatePhoto,
    getAlbumDetails,
    getAlbumDetailsByName,
    getAllAlbums,
    getPhotosInAlbum,
    addTag
};



