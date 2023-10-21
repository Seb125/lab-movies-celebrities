// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model.js');
const Movie = require('../models/Movie.model.js');


// all your routes here

router.get('/create', (req, res) => {
    const getCeleb = async (req, res) => {
        try {
            const myCelebrities = await Celebrity.find();
            
            res.render('movies/new-movie', {celebrities: myCelebrities});
        } catch(err) {
            console.log(err)
        }
    }

    getCeleb(req, res);
    
})

router.post('/create', (req, res) => {
    
    const createMovie = async (req, res) => {
        
        try {
            const myMovie = req.body;
            Movie.create(myMovie);
            res.redirect('/movies');
        } catch(err) {
            console.log(err);
           
        }

    }
    
    createMovie(req, res);
    
})


router.get('/', (req, res) => {
    const getMovies = async (req, res) => {
        try {
            const myMovies = await Movie.find();
            res.render('movies/movies', {myMovies: myMovies});

        } catch(err) {
            console.log(err)
        }
    }

    getMovies(req, res);
})

router.get('/:id', (req, res) => {
    const getDetails = async (req, res) => {
        try {
            const details = await Movie.findById(req.params.id).populate('cast');
            console.log(details)
            

            res.render('movies/movie-details',details);
            //res.render('movies/movie-details', {details: populated});

        } catch(err) {
            console.log(err)
        }
    }

    getDetails(req, res);
})

router.post('/:id/delete', (req, res) => {
    const deleteMovie = async (req, res) => {
        try {
            const del =  await Movie.findByIdAndRemove(req.params.id);
            

            res.redirect('/movies');
            //res.render('movies/movie-details', {details: populated});

        } catch(err) {
            console.log(err)
        }
    }

    deleteMovie(req, res);
})

router.get('/:id/edit', (req, res) => {
    const editMovie = async (req, res) => {
        try {
            const movie =  await Movie.findById(req.params.id).populate('cast');
            
            //res.send(movie);
            res.render('movies/edit-movie', movie);
            

        } catch(err) {
            console.log(err)
        }
    }

    editMovie(req, res);
})

router.post('/:id', (req, res) => {
    const updateMovie = async (req, res) => {
        try {
            const movie =  await Movie.findByIdAndUpdate(req.params.id, req.body);
            
            //res.send(movie);
            res.redirect(`/movies/${req.params.id}`);
            

        } catch(err) {
            console.log(err)
        }
    }

    updateMovie(req, res);
})


module.exports = router;