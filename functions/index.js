const functions = require('firebase-functions/v2');
const admin = require('firebase-admin');
const {onDocumentCreated} = require("firebase-functions/v2/firestore");

// Initialize the Firebase Admin SDK
admin.initializeApp();

// Your Cloud Functions
exports.matchUsers = onDocumentCreated('queue/{userId}', async (event) => {
    console.log('matchUsers function triggered');
    const newUser = event.data.data();
    console.log('New user data:', newUser);
    const db = admin.firestore();

    // Query for a matching user
    const matchQuery = db.collection('queue')
        .where('language', '==', newUser.language)
        .where('userType', '!=', newUser.userType)
        .limit(1);

    console.log('Searching for matching user with language:', newUser.language, 'and opposite userType');
    const matchingUsers = await matchQuery.get();

    if (!matchingUsers.empty) {
        console.log('Matching user found');
        const matchedUser = matchingUsers.docs[0].data();
        console.log('Matched user data:', matchedUser);
        const roomId = db.collection('rooms').doc().id;
        console.log('Created new room with ID:', roomId);

        // Create a new room
        await db.collection('rooms').doc(roomId).set({
            users: [newUser.userId, matchedUser.userId],
            language: newUser.language,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        console.log('Room document created');

        // Create a match document
        await db.collection('matches').add({
            users: [newUser.userId, matchedUser.userId],
            roomId: roomId,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        console.log('Match document created');

        // Remove both users from the queue
        await db.collection('queue').doc(newUser.userId).delete();
        await db.collection('queue').doc(matchedUser.userId).delete();
        console.log('Users removed from queue');
    } else {
        console.log('No matching user found');
    }
});