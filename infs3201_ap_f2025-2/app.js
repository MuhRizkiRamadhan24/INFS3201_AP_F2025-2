const express = require('express');
const exphbs = require('express-handlebars');
const business = require('./business');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('photos')); // serve photos folder

// Handlebars setup
app.engine('handlebars', exphbs.engine({ layout: false }));
app.set('view engine', 'handlebars');

/**
 * Landing Page - list of albums
 */
app.get('/', async (req, res) => {
    const albums = await business.getAllAlbums(); // implement in business layer
    res.render('landing', { albums });
});

/**
 * Album Details Page - list photos in album
 */
app.get('/album/:id', async (req, res) => {
    const albumId = Number(req.params.id);
    const album = await business.getAlbumDetails(albumId);
    if (!album) return res.send('Album not found');
    const photos = await business.getPhotosInAlbum(albumId);
    res.render('album', { album, photos, photoCount: photos.length });
});

/**
 * Photo Details Page
 */
app.get('/photo/:id', async (req, res) => {
    const photoId = Number(req.params.id);
    const photo = await business.getPhotoDetails(photoId);
    if (!photo) return res.send('Photo not found');
    res.render('photo', { photo });
});

/**
 * Edit Photo Page - form
 */
app.get('/photo/:id/edit', async (req, res) => {
    const photoId = Number(req.params.id);
    const photo = await business.getPhotoDetails(photoId);
    if (!photo) return res.send('Photo not found');
    res.render('edit', { photo });
});

/**
 * Handle Edit Photo Form - PRG pattern
 */
app.post('/photo/:id/edit', async (req, res) => {
    const photoId = Number(req.params.id);
    const { title, description } = req.body;
    const success = await business.updatePhoto(photoId, title, description);
    if (!success) return res.send('Error updating photo. Please go back.');
    res.redirect(`/photo/${photoId}`);
});

// Start server
app.listen(8000, () => {
    console.log('Server running on http://localhost:8000');
})
