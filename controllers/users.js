const User = require('../models/user')
const Dog = require('../models/dog')
const Event = require('../models/event')
const bcrypt = require('bcrypt')

// Sign Up
const signUp = async(req, res) => {
    try {
        const usernameTaken = await User.findOne({ username: req.body.username })
        if (usernameTaken) return res.send('This username is already taken')

        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        req.body.password = hashedPassword
        await User.create(req.body).then(() => res.redirect('/users/sign-in'))
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// Sign In
const signIn = async(req, res) => {
    try {
        const userExists = await User.findOne({ username: req.body.username })
        if (!userExists) throw new Error('User Not Found')

        const validPassword = bcrypt.compareSync(req.body.password, userExists.password)
        if (!validPassword) throw new Error('Login Failed')

        req.session.user = {
            username: userExists.username,
            _id: userExists._id
        }

        res.redirect('/dogs')
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// Displays all users
const index = async (req, res) => {
    try {
        const foundUsers = await User.find({})
        res.render('users/index.ejs', {
            users: foundUsers
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// Render new user form
const newFunc = (req, res) => {
  res.render('users/new.ejs')
}

// Render sign in form
const showSignIn = (req, res) => {
    res.render('users/signin.ejs')
}

// Delete user and related data
const destroy = async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ _id: req.params.id })
        await Dog.deleteMany({ owner: deletedUser._id })
        await Event.deleteMany({ dog: { $in: deletedUser.dogs } })
        res.redirect('/users')
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// Updates user information
const update = async (req, res) => {
    try {
        if(req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10)
        }
        const updatedUser = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        res.redirect(`/users/${updatedUser._id}`)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// Render edit user form
const edit = async (req, res) => {
    try {
        const foundUser = await User.findOne({ _id: req.params.id })
        res.render('users/edit.ejs', { user: foundUser })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// Shows user profile with dog and events
const show = async (req, res) => {
    try {
        const foundUser = await User.findOne({ _id: req.params.id })
        const dogs = await Dog.find({ owner: foundUser._id })
        const events = await Event.find({ dog: { $in: dogs.map(dog => dog._id) } })
        res.render('users/show.ejs', {
            user: foundUser,
            dogs: dogs,
            events: events
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

module.exports = {
    index,
    newFunc,
    destroy,
    update,
    signUp,
    signIn,
    showSignIn,
    edit,
    show
}
