const Session = require("../model/Session");
const Question = require("../model/Question");

// @desc    Create a new question and linked questions
// @route   POST api/session/create
// @access  PRIVATE
exports.createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } =
      req.body;
    const userId = req.user._id;

    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
    });

    const questionsDocs = await Promise.all(
      questions.map(async (q) => {
        const question = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        });
        return question._id;
      })
    );
    session.questions = questionsDocs;
    await session.save();

    res.status(201).json({ success: true, session });
  } catch (error) {
    console.log("Error creating: ", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Get all sessions for logged-in user
// @route   GET api/session/my-sessions
// @access  PRIVATE
exports.getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("questions");
    res.status(200).json(sessions);
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Get a session by ID with the populated questions
// @route   GET api/session/:id
// @access  PRIVATE
exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
    .populate({
        path: "questions",
        options: { sort: { isPinned: -1, createdAt: 1 }},
    })
    .exec();

    if(!session){
        return res.status(404).json({ success: false, message: "Session not found"})
    }

    return res.status(200).json({ success: true, session });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Delete a session and its questions
// @route   DELETE api/session/:id
// @accesss PRIVATE
exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if(!session){
        return res.status(404).json({message: "Session Not Found"});
    }

    // check if the logged-in user owns this session
    if(session.user.toString() !== req.user.id){
        return res.status(401).json({message: "Not authorized to delete this session"})
    }

    // First, delete all questions linked to this session
    await Question.deleteMany({session: session._id});

    // Then, delete the session
    await session.deleteOne();

    res.status(200).json({success: true, message: "Session deleted successfully"})
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
