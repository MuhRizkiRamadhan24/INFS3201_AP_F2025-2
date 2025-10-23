const express = require('express');
const { engine } = require('express-handlebars');
const business = require('./business');
const path = require('path');

const app = express();
const PORT = 8000;

// ✅ Use express-handlebars with helpers defined directly here
app.engine('handlebars', engine({
    defaultLayout: false,
    helpers: {
        eq: (a, b) => a === b, // <-- define "eq" helper here
    }
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'handlebars'));

app.use(express.urlencoded({ extended: false }));
app.use('/photos', express.static(path.join(__dirname, 'public/photos')));

app.get('/', async (req, res) => {
    const albums = await business.getAllAlbums();
    res.render('index', { albums });
});

app.get('/album/:id', async (req, res) => {
    const album = await business.getAlbumDetails(Number(req.params.id));
    const photos = await business.getPhotosInAlbum(Number(req.params.id));
    res.render('album1', { album, photos, photoCount: photos.length });
});


app.get('/photo/:id', async (req, res) => {
    const photo = await business.getPhotoDetails(Number(req.params.id));
    res.render('photo', { photo });
});

app.get('/photo/:id/edit', async (req, res) => {
    const photo = await business.getPhotoDetails(Number(req.params.id));
    res.render('edit', { photo });
});

app.post('/photo/:id/edit', async (req, res) => {
    const { title, description } = req.body;
    const result = await business.updatePhoto(Number(req.params.id), title, description);
    if (result) {
        res.redirect(`/photo/${req.params.id}`);
    } else {
        res.send('Error updating photo. Go back and try again.');
    }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

