const { ObjectId } = require('mongodb');
const { connectDatabase, getDatabase } = require("../models");

const home = (req, res) => {
    console.log('[>] [services] Home :)');
    res.send('轟姆，噗呲噗呲，咚噠噠噠');
}

const helloworld = (req, res) => {
    console.log('[>] [services] Hello World :)');
    res.send('Hello World，噗呲噗呲，咚噠噠噠');
}

const feeds = (req, res) => {
    console.log("[>] [service] postall !!!");
    const database = getDatabase();

    database.collection(process.env.DB_COLLECTION_POST).find({}).toArray((err, document) => {
        res.send(document);
    })
}

const submit = (req, res) => {
    console.log('[>] [services] Submit :)');
    
    const database = getDatabase();
    const post_collection = database.collection(process.env.DB_COLLECTION_POST);

    const post = {
        course: req.body.course,
        college: req.body.college,
        department: req.body.department,
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

const post = (req, res) => {
    console.log('[>] [services] Post :)');
    
    const database = getDatabase();
    const post_collection = database.collection(process.env.DB_COLLECTION_POST);

    const postID = req.params.param;

    post_collection.findOne({ _id: new ObjectId(postID) }, (err, document) => {
        if (err) {
            console.error('[x] Error finding document:', err);
            res.status(500).send({ message: 'Error finding document: ' + err });
        } else {
            if (document) {
                console.log('[v] Document found:', document);
                res.send(document);
            } else {
                console.log('[x] Document not found');
                res.status(404).send({ message: 'Document not found' });
            }
        }
    });
}

const mainService = {
    home: home,
    helloworld: helloworld,
    feeds: feeds,
    submit: submit,
    post: post
};

module.exports = mainService;