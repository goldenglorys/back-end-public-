//Import test questions database schema
const testQuestion =  require('../models/testQuestionsModel');

addQuestion = (req, res) => {
    if(req.authData.isSuperAdmin || req.authData.staffLevelStatus == "education officer") {

        const course_id = req.body.course_id

        if(course_id){
            const quest = new testQuestion({
                question: req.body.question,
                options: { optionA: req.body.optionA,
                    optionB: req.body.optionB,
                    optionC: req.body.optionC,
                    optionD: req.body.optionD,            
                },
                answerKey: req.body.answerKey,
                courseID: course_id
            })

            //save the question to the collection
            quest.save()
                .then( saved => {
                    res.status(200).json({
                        success: true,
                        id: saved._id,
                        message: 'Question saved successfully!',
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        error,
                    })

                })
        }

        else {
            res.status(402).json({
                message: 'No course selected'
            })
        }
    } else {
        res.status(500).json({
            message: "Permission denied!"
        })
    }
    
    
}

updateQuestion = (req, res) => {
    if(req.authData.isSuperAdmin || req.authData.staffLevelStatus == "education officer") {
        const questionId = req.body.question_id

    testQuestion.findOneAndUpdate({_id: questionId},
        {
            question: req.body.question,
                options: { optionA: req.body.optionA,
                    optionB: req.body.optionB,
                    optionC: req.body.optionC,
                    optionD: req.body.optionD,            
                },
                answerKey: req.body.answerKey,
        })
        .then(() => res.status(200).json({message: 'Your question was updated successfully'}))
        .catch(err => { res.status(500).json(err) })

    } else {
        res.status(500).json({
            message: "Permission denied!"
        })
    }

    
}

deleteQuestion = (req, res) => {
    if(req.authData.isSuperAdmin || req.authData.staffLevelStatus == "education officer") {
        const questionId = req.body.question_id

        testQuestion.deleteOne({_id: questionId})
        .then(() => res.status(200).json({
            message: 'Deleted Successful'
        }))
        .catch(error => res.status(500).json(error))
    } else {
        res.status(500).json({
            message: "Permission denied!"
        })
    }
}

getQuestions = (req, res) => {
    const course_id = req.params.courseId

    //Get the first ten questions 
    testQuestion.find({courseId: course_id}, {courseId: 0}).limit(10)
    .then(questions => {
        shuffledQuestion = shuffle(questions)
        res.status(200).json({
            shuffledQuestion
        })
    })
    .catch(error => res.status(500).json(error))
}


shuffle = (arr) => {
    let curIndex = arr.length
    let tempValue
    let randomIndex

    //Loop through the array while we have elements or items
    while (curIndex > 0) {
        //Pick a random index
        randomIndex = Math.floor(Math.random() * curIndex)

        //decrease the length of the array/index
        curIndex--

        //swap the current element/item with it
        tempValue = arr[curIndex]
        arr[curIndex] = arr[randomIndex]
        arr[randomIndex] = tempValue
    }

    return arr
}

module.exports = {
    addQuestion,
    updateQuestion,
    getQuestions,
    deleteQuestion
}