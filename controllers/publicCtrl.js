//Import users database schema
const Course =  require('../models/courseDetailsModel');

//Import users database schema
const CourseCategory =  require('../models/courseCategoryModel')

showCourse = (req, res) => {
	Course.find().select('title description coverPicture price outline instructors duration category regDate regTime _id').then(
        docs => {
            const response = {
                count: docs.length,
                data: docs.map(doc => {
                    return {
                        _id: doc._id,
                        title: doc.title,
                        description: doc.description,
                        coverPicture: doc.coverPicture,
                        price: doc.price,
                        outline: doc.outline,
                        instructors: doc.instructors,
                        duration: doc.duration,
                        category: doc.category,
                        regDate: doc.regDate,
                        regTime: doc.regTime
                        // request: {
                        //     type: 'GET',
                        //     url: 'http://'+req.headers.host+'/users/'+doc._id
                        // }
                    }
                })
            }
        res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json({
                error,
            })
        });
}

showCourseByCategory = (req, res) => {
	const categoryID = req.params.categoryID;
	Course.findById(categoryID).select('title description coverPicture price outline instructors duration category regDate regTime _id').then(
        docs => {
            const response = {
                count: docs.length,
                data: docs.map(doc => {
                    return {
                        _id: doc._id,
                        title: doc.title,
                        description: doc.description,
                        coverPicture: doc.coverPicture,
                        price: doc.price,
                        outline: doc.outline,
                        instructors: doc.instructors,
                        duration: doc.duration,
                        category: doc.category,
                        regDate: doc.regDate,
                        regTime: doc.regTime
                        // request: {
                        //     type: 'GET',
                        //     url: 'http://'+req.headers.host+'/users/'+doc._id
                        // }
                    }
                })
            }
        res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json({
                error,
            })
        });
}

module.exports = {
	showCourse,
	showCourseByCategory,
}