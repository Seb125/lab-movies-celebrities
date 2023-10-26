// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model.js');
const Movie = require('../models/Movie.model.js');
// all your routes here


router.get('/create', async (req, res) => {
   
        try {
            const myMovies = await Movie.find();
            
            res.render('celebrities/new-celebrity', {movies: myMovies});
        } catch(err) {
            console.log(err)
        }
    

    
    
})

router.post('/create', (req, res) => {
    
    const createCeleb = async (req, res) => {
        
        try {
            const celeb = req.body;
            const celebrity = await Celebrity.create(celeb);

// I want to push this celebrity to all the movies it was playing in
            
            console.log(celeb)
            // celeb.movies.forEach((movie) => {
            //     console.log(movie)
            // })
            async function pushMovies() {
                if (Array.isArray(celeb.movies)) {
                   for(let i = 0; i<celeb.movies.length; i++) {
                        const movie = await Movie.findByIdAndUpdate(celeb.movies[i], { $push: { cast: celebrity._id } });
                   }
                } else {
                    const movie = await Movie.findByIdAndUpdate(celeb.movies, { $push: { cast: celebrity._id } });
                }
        }
            await pushMovies();
            res.redirect('/celebrities');
        } catch(err) {
            console.log(err);
            res.render('celebrities/new-celebrity');
        }

    }
    
    createCeleb(req, res);
    
})


router.get('/', (req, res) => {
    const getCeleb = async (req, res) => {
        try {
            const myCelebrities = await Celebrity.find();
            res.render('celebrities/celebrities', {celebrities: myCelebrities});

        } catch(err) {
            console.log(err)
        }
    }

    getCeleb(req, res);
})


router.get('/:id', (req, res) => {
    const getDetails = async (req, res) => {
        try {
            const details = await Celebrity.findById(req.params.id).populate('movies');
            console.log(details)
            

            res.render('celebrities/celebrity-details',details);
            //res.render('movies/movie-details', {details: populated});

        } catch(err) {
            console.log(err)
        }
    }

    getDetails(req, res);
})


router.get('/:id/edit', (req, res) => {
    const editCelebrity = async (req, res) => {
        try {
            const allMovies = await Movie.find();
            const celebrity =  await Celebrity.findById(req.params.id).populate('movies');
            
            let notInCast = [];
            let movieIDs = [];

            celebrity.movies.forEach((movie) => {
                movieIDs.push(movie._id);
            })
        
            allMovies.forEach((movie) => {
                if (!movieIDs.some(id => id.equals(movie._id))) {
                    notInCast.push(movie);
                }
            })
            console.log(notInCast)
            res.render('celebrities/edit-celebrity', {celebrity: celebrity, notInCast: notInCast});
            

        } catch(err) {
            console.log(err)
        }
    }

    editCelebrity(req, res);
})

router.post('/:id', (req, res) => {
    const updateCelebrity = async (req, res) => {
        try {
            const celebrity =  await Celebrity.findByIdAndUpdate(req.params.id, req.body);
            
            //res.send(movie);
            res.redirect(`/celebrities/${req.params.id}`);
            

        } catch(err) {
            console.log(err)
        }
    }

    updateCelebrity(req, res);
})

module.exports = router;