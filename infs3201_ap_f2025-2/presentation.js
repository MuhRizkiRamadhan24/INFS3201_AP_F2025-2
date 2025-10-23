const prompt = require('prompt-sync')();
const business = require('./business');

/**
 * Convert ISO date format into readable format
 * @param {*} iso 
 * @returns English description of the date
 */
function formatDate(iso) {
    const date = new Date(iso);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

/**
 * Display details of a photo
 */
async function findPhoto() {
    console.log('\n\n');
    let pid = Number(prompt('Photo ID? '));
    let photoDetails = await business.getPhotoDetails(pid);
    if (photoDetails) {
        console.log(`Filename: ${photoDetails.filename}`);
        console.log(` Title: ${photoDetails.title}`);
        console.log(`  Date: ${formatDate(photoDetails.date)}`);
        console.log(`Albums: ${photoDetails.albumNames.join(', ')}`);
        console.log(`  Tags: ${photoDetails.tags.join(', ')}`);
    } else {
        console.log('!!! Photo not found');
    }
    console.log('\n\n');
}

/**
 * Prompt for a new value (reuses old value if blank)
 */
function promptTitle(fieldName, previousValue) {
    let newValue = prompt(`Enter value for ${fieldName} [${previousValue}]: `);
    return newValue !== "" ? newValue : previousValue;
}

/**
 * Update photo title and description
 */
async function updatePhotoDetails() {
    console.log('\n\n');
    let pid = Number(prompt('Photo ID? '));
    let photoDetails = await business.getPhotoDetails(pid);
    if (!photoDetails) {
        console.log("*** Photo not found ***");
        return;
    }
    console.log("Press enter to reuse existing value.");
    let newTitle = promptTitle('title', photoDetails.title);
    let newDescription = promptTitle('description', photoDetails.description);
    let result = await business.updatePhoto(pid, newTitle, newDescription);
    console.log(result ? "Photo updated" : "!!! Problem updating");
    console.log('\n\n');
}

/**
 * Show photos in an album
 */
async function albumPhotos() {
    console.log('\n\n');
    let albumName = prompt('What is the name of the album? ');
    let albumDetails = await business.getAlbumDetailsByName(albumName);
    if (!albumDetails) {
        console.log('!!! Album not found\n\n');
        return;
    }
    let photoList = await business.getPhotosInAlbum(albumDetails.id);
    console.log('filename,resolution,tags');
    for (let p of photoList) {
        console.log(`${p.filename},${p.resolution},${p.tags.join(':')}`);
    }
    console.log('\n\n');
}

/**
 * Add a tag to a photo
 */
async function tagPhoto() {
    console.log('\n\n');
    let pid = Number(prompt("What photo ID to tag? "));
    let photoDetails = await business.getPhotoDetails(pid);
    if (!photoDetails) {
        console.log('!!!! Photo not found');
        return;
    }
    let tag = prompt(`What tag to add (${photoDetails.tags.join(',')})? `).toLowerCase();
    let result = await business.addTag(pid, tag);
    console.log(result ? "Updated" : "Could not add tag");
    console.log('\n\n');
}

/**
 * Display menu and get selection
 */
function getMenuSelec
