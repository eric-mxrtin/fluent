import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase-config';
import { collection, addDoc, onSnapshot, query, where, limit, deleteDoc, doc } from 'firebase/firestore';

export const Queue = ({ user, language, userType, proficiency, setRoom, setInQueue}) => {
  const [queueStatus, setQueueStatus] = useState('Initializing');

  useEffect(() => {
    const queueRef = collection(db, 'queue');
    
    // Add user to queue
    const addToQueue = async () => {
      try {
        setQueueStatus('Adding to queue');
        const docRef = await addDoc(queueRef, {
          userId: user.uid,
          language,
          userType,
          proficiency,
          timestamp: new Date()
        });
        console.log('Added to queue with document ID:', docRef.id);
        setQueueStatus('Waiting for match');
        return docRef;
      } catch (error) {
        console.error('Error adding to queue:', error);
        setQueueStatus('Error: Could not join queue');
        return null;
      }
    };

    // Listen for match
    const listenForMatch = (docRef) => {
      if (!docRef) return null;
      const q = query(collection(db, 'matches'), where('users', 'array-contains', user.uid), limit(1));
      return onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const match = snapshot.docs[0].data();
          console.log('Match found:', match);
          setRoom(match.roomId);
          setInQueue(false);
          deleteDoc(docRef).catch(error => console.error('Error deleting queue document:', error));
        }
      }, (error) => {
        console.error('Error listening for matches:', error);
        setQueueStatus('Error: Could not listen for matches');
      });
    };

    let docRef;
    let unsubscribe;

    const initQueue = async () => {
      docRef = await addToQueue();
      if (docRef) {
        unsubscribe = listenForMatch(docRef);
      }
    };

    initQueue();

    return () => {
      if (unsubscribe) unsubscribe();
      if (docRef) deleteDoc(docRef).catch(error => console.error('Error deleting queue document on cleanup:', error));
    };
  }, [user, language, userType, proficiency, setRoom]);

  return (
    <div>
      <h2>Queue Status: {queueStatus}</h2>
      <p>Waiting for a match...</p>
    </div>
  );
};