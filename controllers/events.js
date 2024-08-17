const Event = require("../models/event");
const Dog = require("../models/dog");

// Renders new event form
const newFunc = async (req, res) => {
  try {
    const dog = await Dog.findOne({
      _id: req.params.dogId,
      owner: req.session.user._id,
    });
    if (!dog)
      throw new Error("You must have at least one dog to create an event.");
    res.render("events/new.ejs", { dog });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Create
const create = async (req, res) => {
  try {
    const dog = await Dog.findOne({
      _id: req.params.dogId,
      owner: req.session.user._id,
    });
    if (!dog) throw new Error("Dog not found");
    const newEvent = await Event.create({
      name: req.body.name,
      notes: req.body.notes,
      dog: dog._id,
    });
    res.redirect(`/dogs/${dog._id}/events/${newEvent._id}`);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Index
const index = async (req, res) => {
  try {
    const { dogId } = req.params;
    const dog = await Dog.findOne({ _id: dogId, owner: req.session.user._id });
    const events = await Event.find({ dog: dogId });
    res.render("events/index.ejs", { dog, events });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//Show
const show = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("dog");
    if (!event) throw new Error("Event not found");
    if (event.dog.owner.toString() !== req.session.user._id)
      throw new Error("Unauthorized access.");
    res.render("events/show.ejs", { event });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//Edit
const edit = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("dog");
    if (!event) throw new Error("Event not found");
    if (event.dog.owner.toString() !== req.session.user._id)
      throw new Error("Unauthorized access.");
    res.render("events/edit.ejs", { event });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//Update
const update = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        notes: req.body.notes,
        dog: req.params.dogId,
      },
      { new: true }
    );

    if (!updatedEvent) throw new Error("Event not found");
    res.redirect(`/dogs/${req.params.dogId}/events/${updatedEvent._id}`);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//Delete
const destroy = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) throw new Error("Event not found");
    res.redirect(`/dogs/${req.params.dogId}/events`);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  newFunc,
  create,
  index,
  show,
  edit,
  update,
  destroy,
};
