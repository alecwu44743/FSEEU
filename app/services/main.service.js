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
        author: req.body.author,
        date: new Date().toISOString()
    };

    post_collection.insertOne(post, (err, result) => {
        if (err) {
            console.error('[x] Error inserting documents:', err);
            res.status(500).send({ message: 'Error inserting documents: ' + err });
        }
        else {
            console.log(`[v] [${req.body.title}]'s documents added successfully`);
            res.send({ 
                message: `[${req.body.title}]'s documents added successfully`,
                post_id: result.insertedId
            });
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

const deletePost = (req, res) => {
    const postID = req.params.param;
    console.log('[>] [services] Delete Post :)');
    
    const database = getDatabase();
    const post_collection = database.collection(process.env.DB_COLLECTION_POST);

    // if post's author is the same as the token's username or the token's role is moderator
    // then delete the post
    post_collection.findOne({ _id: new ObjectId(postID) }, (err, document) => {
        if (err) {
            console.error('[x] Error finding document:', err);
            res.status(500).send({ message: 'Error finding document: ' + err });
        } else {
            if (document) {
                console.log('[v] Document found:', document);
                if (document.author == req.body.author || req.body.isModerator) {
                    post_collection.deleteOne({ _id: new ObjectId(postID) }, (err, result) => {
                        if (err) {
                            console.error('[x] Error deleting document:', err);
                            res.status(500).send({ message: 'Error deleting document: ' + err });
                        } else {
                            console.log('[v] Document deleted successfully');
                            res.send({ message: 'Document deleted successfully' });
                        }
                    });
                } else {
                    res.status(401).send({ message: 'Unauthorized!' });
                }
            } else {
                console.log('[x] Document not found');
                res.status(404).send({ message: 'Document not found' });
            }
        }
    });
}

const submitComment = (req, res) => {
    console.log('[>] [services] Submit Comment :)');
    
    const database = getDatabase();
    const comment_collection = database.collection(process.env.DB_COLLECTION_COMMENT);

    const post_comment = {
        post_id: req.params.param,
        author: req.body.author,
        content: req.body.comment,
        date: new Date().toISOString()
    };

    comment_collection.insertOne(post_comment, (err, result) => {
        if (err) {
            console.error('[x] Error inserting comment:', err);
            res.status(500).send({ message: 'Error inserting comment: ' + err });
        } else {
            console.log(`[v] [${req.body.author}]'s comment added successfully`);
            res.send({ 
                message: `[${req.body.author}]'s comment added successfully`,
                comment_id: result.insertedId
            });
        }
    });
}

const getComment = (req, res) => {
    const postID = req.params.param;
    console.log("[>] [services] Get Comment :)");

    const database = getDatabase();
    const comment_collection = database.collection(process.env.DB_COLLECTION_COMMENT);

    comment_collection.find({ post_id: postID }).toArray((err, document) => {
        if (err) {
            console.error('[x] Error finding comment:', err);
            res.status(500).send({ message: 'Error finding comment: ' + err });
        } else {
            if (document) {
                console.log('[v] Comment found:', document);
                res.send(document);
            } else {
                console.log('[x] Comment not found');
                res.status(404).send({ message: 'Comment not found' });
            }
        }
    });
}

const deleteComment = (req, res) => {
    const commentID = req.params.param;
    const author = req.body.author;
    console.log("[>] [services] Delete Comment :)");

    const database = getDatabase();
    const comment_collection = database.collection(process.env.DB_COLLECTION_COMMENT);

    comment_collection.findOne({ _id: new ObjectId(commentID) }, (err, document) => {
        if (err) {
            console.error('[x] Error finding document:', err);
            res.status(500).send({ message: 'Error finding document: ' + err });
        } else {
            if (document) {
                console.log('[v] Comment found:', document);
                if (document.author == author) {
                    comment_collection.deleteOne({ _id: new ObjectId(commentID) }, (err, result) => {
                        if (err) {
                            console.error('[x] Error deleting comment:', err);
                            res.status(500).send({ message: 'Error deleting comment: ' + err });
                        } else {
                            console.log('[v] Comment deleted successfully');
                            res.send({ message: 'Comment deleted successfully' });
                        }
                    });
                } else {
                    res.status(401).send({ message: 'Unauthorized!' });
                }
            } else {
                console.log('[x] Comment not found');
                res.status(404).send({ message: 'Comment not found' });
            }
        }
    });
}

const like = (req, res) => {
    const postID = req.params.param;
    console.log("[>] [services] Like :)");

    const database = getDatabase();
    const like_likecollection = database.collection(process.env.DB_COLLECTION_LIKE);

    const author = req.body.author;

    like_likecollection.findOne({ post_id: postID, author: author }, (err, document) => {
        if (err) {
            console.error('[x] Error finding document:', err);
            res.status(500).send({ message: 'Error finding document: ' + err });
        } else {
            if (document) {
                console.log('[v] Document found:', document);
                like_likecollection.deleteOne({ post_id: postID, author: author }, (err, result) => {
                    if (err) {
                        console.error('[x] Error deleting document:', err);
                        res.status(500).send({ message: 'Error deleting document: ' + err });
                    } else {
                        console.log('[v] Document deleted successfully');
                        res.send({ message: 'Document deleted successfully' });
                    }
                });
            } else {
                console.log('[v] Document not found');
                like_likecollection.insertOne({ post_id: postID, author: author }, (err, result) => {
                    if (err) {
                        console.error('[x] Error inserting document:', err);
                        res.status(500).send({ message: 'Error inserting document: ' + err });
                    } else {
                        console.log('[v] Document inserted successfully');
                        res.send({ message: 'Document inserted successfully' });
                    }
                });
            }
        }
    });
}

const countLike = (req, res) => {
    const postID = req.params.param;
    console.log("[>] [services] Count Like :)");

    const database = getDatabase();
    const like_likecollection = database.collection(process.env.DB_COLLECTION_LIKE);

    like_likecollection.find({ post_id: postID }).toArray((err, document) => {
        if (err) {
            console.error('[x] Error finding document:', err);
            res.status(500).send({ message: 'Error finding document: ' + err });
        } else {
            if (document) {
                console.log('[v] Document found:', document);
                const authors = document.map(doc => doc.author);
                if (document.length > 0) {
                    res.send({
                        message: document.length,
                        authors: authors
                    });
                }
                else {
                    res.send({ message: 0 });
                }
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
    post: post,
    deletePost: deletePost,
    submitComment: submitComment,
    getComment: getComment,
    deleteComment: deleteComment,
    like: like,
    countLike: countLike
};

module.exports = mainService;