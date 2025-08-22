const Question = require("../model/Question");
const Session = require("../model/Session");

// @desc    add additional questions in a existing session
// @route   POST /api/questions/add
// @access  PRIVATE
exports.addQuestionsToSession = async (req, res) => {
    try {
        const { sessionId, questions} = req.body;

        if(!sessionId || !questions || !Array.isArray(questions)){
            return res.status(400).json({message: "Invalid Input Data"})
        }

        const session = await Session.findById(sessionId);

        if(!session){
            return res.status(404).json({message: "Session not found"})
        }

        // Create new questions
        const createdQuestions = await Question.insertMany(
            questions.map((q) => ({
                session: sessionId,
                question: q.question,
                answer: q.answer
            }))
        )

        // Update session to include new question IDs
        session.questions.push(...createdQuestions.map((q) => q._id))
        await session.save();

        res.status(201).json(createdQuestions);
    } catch (error) {
        return res.status(500).json({message: "Server Error"});
    }
}

// @desc    pin or unpin a question
// @route   POST /api/questions/:id/pin
// @access  PRIVATE
exports.togglePinQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if(!question){
            return res.status(404).json({message: "Question Not Found"});
        }

        question.isPinned = !question.isPinned;
        await question.save();
        res.status(200).json({success: true, question});
    } catch (error) {
        return res.status(500).json({message: "Server Error"});
    }
}

// @desc    Update a note for a question
// @route   POST /api/questions/:id/note
// @access  PRIVATE
exports.updateQuestionNote = async (req, res) => {
    try {
        const { note } = req.body;
        
        const question = await Question.findById(req.params.id);

        if(!question){
            return res.status(404).json({message: "Question not found"})
        }

        question.note = note || "";
        question.save();

        res.status(201).json({success: true, question});
    } catch (error) {
        return res.status(500).json({message: "Server Error"});
    }
}