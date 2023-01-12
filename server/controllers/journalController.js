const Journal = require('../models/journalModel')
const mongoose = require('mongoose')

//get all 
const getJournals = async (req, res) => {
    const user_id = req.user._id

    const journals = await Journal.find({ user_id }).sort({createdAt: -1})
    res.status(200).json(journals)
}

//get a single 
const getJournal = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such journal'})
    }

    const journal = await Journal.findById({_id: id})
    
    if (!journal){
        return res.status(404).json({error: 'No such journal'})
    }
    res.status(200).json(journal)
}

//create 
const createJournal = async (req, res) => {
    const {title, note} = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!note){
        emptyFields.push('note')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Empty Momentum. No new journal added!', emptyFields })
    }
    try{
        const user_id = req.user._id
        const journal = await Journal.create({title, note, user_id})
        res.status(200).json(journal)
    }catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete
const deleteJournal = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such journal'})
    }

    const journal = await Journal.findOneAndDelete({_id: id})

    if (!journal){
        return res.status(404).json({error: 'No such journal'})
    }
    res.status(200).json(journal)
}

//update
const updateJournal = async (req, res) => {
    const {id} = req.params
    console.log(req.body)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such journal'})
    }
    

    const journal = await Journal.findByIdAndUpdate({_id: id}, {
        ...req.body}, {new: true})
    
    if (!journal){
        return res.status(404).json({error: 'No such journal'})
    }
    res.status(200).json(journal)
}


module.exports = {
    getJournal,
    getJournals,
    createJournal,
    deleteJournal,
    updateJournal
}