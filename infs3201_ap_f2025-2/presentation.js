const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const business = require('./business')

const app = express();

// --- Handlebars setup ---
app.engine('handlebars', exphbs.engine({ layout: undefined }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// --- Middleware to handle form submissions ---
app.use(express.urlencoded({ extended: true }));

// --- Serve static files (photos) ---
app.use('/static', express.static(path.join(__dirname, 'photos')));

// --- Routes ---

// Landing page: list albums
app.get('/', async (req, res) => {
    const albums = await business.getAllAlbums();
    res.render('index', { albums });
});

// Album page: list photos in an album
app.get('/album/:id', async (req, res) => {
    const album = await business.getAlbumDetails(req.params.id);
    const photos = await business.getPhotosInAlbum(req.params.id);
    res.render('album', { album, photos });
});

// Photo details page
app.get('/photo/:id', async (req, res) => {
    const photo = await business.getPhotoDetails(req.params.id);
    res.render('photoDetails', { photo });
});

// Edit photo page (GET)
app.get('/photo/:id/edit', async (req, res) => {
    const photo = await business.getPhotoDetails(req.params.id);
    res.render('photoEdit', { photo });
});

// Edit photo form submission (POST) using PRG pattern
app.post('/photo/:id/edit', async (req, res) => {
    const { title, description } = req.body;
    await business.updatePhoto(req.params.id, title, description);
    res.redirect(`/photo/${req.params.id}`);
});

app.listen(8000);
