const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/playground',{ useUnifiedTopology:true, useNewUrlParser: true})
    .then(() => console.log('Connected to Mongodb'))
    .catch(err => console.log('Could not connect to MongoDB...', err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    const course = new Course({
        name: 'Angular.js Course',
        author: 'Moses',
        tags: ['angular', 'frontend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}

async function getCourse(){
    //eq (equal)
    //ne (not equal)
    //gt (geater than)
    //gte (geater than or equal to)
    // lt (less than)
    //lte (less than or equal to)
    //in
    // nin (not in)

    const courses = await Course
    .find({ author: 'Moses', isPublished: true })
    .limit(10)
    .sort({ name: 1})
    //.select({ name: 1, tags: 1});
    .countDocuments();
    console.log(courses);
}
getCourse();
