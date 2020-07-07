const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises',{ useUnifiedTopology:true, useNewUrlParser: true});

const courseSchema = new mongoose.Schema({

    name: String,
    author: String,
    tags: [ String],
    date: Date,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);
/*
async function getCourses(){
    return await Course
        //.find({ isPublished: true, tags: {$in: ['frontend', 'backend'] } })
        .find({ isPublished: true})
        .or([ { tags: 'frontend' }, { tags: 'backend' }])
        //.sort({ price: -1})
        .sort('-price')
        //.select({ name: 1, author: 1, price: 1});
        .select('name author price');
}
async function run(){
    const courses = await getCourses();
    console.log(courses);
}

run();
*/

async function getCourses(){
    return await Course
        .find({ isPublished: true})
        .or([
            { price: { $gte: 15 } },
        { name: /.*by.*/i }
        ])
        .sort({ price: -1 })
        .select('name author price');
}

async function run(){
    const courses = await getCourses();
    console.log(courses);
}
run();


async function updateCourse(id) {
    const result = await Course.updateMany({ _id: id }, {
        $set: {
            author: 'Mosh',
            isPublished: false
        }
    });
    console.log(result);

}
updateCourse('5a68fde3f09ad7646ddec17e');