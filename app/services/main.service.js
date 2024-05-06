const { connectDatabase, getDatabase } = require("../models");

const home = (req, res) => {
    console.log('[>] [services] Home :)');
    res.send('轟姆，噗呲噗呲，咚噠噠噠');
}

const helloworld = (req, res) => {
    console.log('[>] [services] Hello World :)');
    res.send('Hello World，噗呲噗呲，咚噠噠噠');
}

const submit = (req, res) => {
    console.log('[>] [services] Submit :)');
    
    const database = getDatabase();
    const post_collection = database.collection(process.env.DB_COLLECTION_POST);

    const post = {
        course: req.body.course,
        college: req.body.college,
        teacher: req.body.teacher,
        title: req.body.title,
        content: req.body.content,
        date: new Date().toISOString()
    };

    post_collection.insertOne(post, (err, user) => {
        if (err) {
            console.error('[x] Error inserting documents:', err);
            res.status(500).send({ message: 'Error inserting documents: ' + err });
        } else {
            console.log(`[v] [${req.body.title}]'s documents added successfully`);
            res.send({ message: `[${req.body.title}]'s documents added successfully` });
        }
    });
}

const mainService = {
    home: home,
    helloworld: helloworld,
    submit: submit
};

module.exports = mainService;