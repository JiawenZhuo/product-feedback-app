const { ObjectID } = require('bson');
const {getDatabase} = require('./mongo');

const collectionName = 'comments';

async function insertComment(comment) {
    const database = await getDatabase();
    const {insertedId} = await database.collection(collectionName).insertOne(comment);
    return insertedId;
}

async function getComments() {
    const database = await getDatabase();
    return await database.collection(collectionName).toArray();
}

async function deleteComment(){
    const database = await getDatabase();
    await database.collection(collectionName).deleteOne({
        _id: new ObjectID(id),
    })
}

async function updateComment(id, comment) {
    const database = await getDatabase();
    delete comment._id;
    await database.collection(collectionName).update(
        {_id: new ObjectID(id), },
        {
            $set: {
                ...comment
            },
        },
    )
}
module.exports ={
    insertComment,
    getComments,
    updateComment,
    deleteComment
}