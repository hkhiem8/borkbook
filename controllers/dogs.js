const Dog = require('../models/dog');
const User = require('../models/user');

//Displays All Dogs
const index = async (req, res) => {
    try {
        const foundDogs = await Dog.find({ owner: req.session.user._id });
        res.render('dogs/index.ejs', {
            dogs: foundDogs
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Renders Dog Add Form
const newFunc = async (req, res) => {
    try {
        res.render('dogs/new.ejs');
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Deletes dog and it's events
const destroy = async (req, res) => {
    try {
        const deletedDog = await Dog.findOneAndDelete({ _id: req.params.id, owner: req.session.user._id });
        if (!deletedDog) throw new Error('Dog not found or not authorized to delete');
        await Event.deleteMany({ dog: deletedDog._id });
        res.redirect('/dogs');
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Update
const update = async (req, res) => {
    try {
        const updatedDog = await Dog.findOneAndUpdate({ _id: req.params.id, owner: req.session.user._id }, req.body, { new: true });
        if (!updatedDog) throw new Error('Dog not found or not authorized to update');
        res.redirect(`/dogs/${updatedDog._id}`);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Create
const create = async (req, res) => {
    try {
        req.body.owner = req.session.user._id;
        const createdDog = await Dog.create(req.body);
        res.redirect(`/dogs/${createdDog._id}`);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// Edit
const edit = async (req, res) => {
    try {
        const foundDog = await Dog.findOne({ _id: req.params.id, owner: req.session.user._id });
        if (!foundDog) throw new Error('Dog not found or not authorized to edit');
        res.render('dogs/edit.ejs', {
            dog: foundDog
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

//Show
const show = async (req, res) => {
    try {
        const foundDog = await Dog.findOne({ _id: req.params.id, owner: req.session.user._id });
        if (!foundDog) throw new Error('Dog not found');
        const events = await Event.find({ dog: foundDog._id });
        res.render('dogs/show.ejs', {
            dog: foundDog,
            events: events
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

module.exports = {
    index,
    newFunc,
    destroy,
    update,
    create,
    edit,
    show
};
