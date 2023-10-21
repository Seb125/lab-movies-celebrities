// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model.js');
// all your routes here


router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res) => {
    
    const createCeleb = async (req, res) => {
        
        try {
            const celeb = req.body;
            Celebrity.create(celeb);
            res.redirect('/celebrities')
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


module.exports = router;