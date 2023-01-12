const express = require('express')
const { getJournal,
    getJournals,
    createJournal, 
    deleteJournal,
    updateJournal } = require('../controllers/journalController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

//GET all journals
router.get('/', getJournals)

//GET a single journal
router.get('/modify/:id', getJournal)

//POST a new journal
router.post('/post', createJournal)

//DELETE a journal
router.delete('/:id', deleteJournal)

//UPDATE a journal
router.patch('/modify/:id', updateJournal)

module.exports = router