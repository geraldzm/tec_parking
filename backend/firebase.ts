require('dotenv').config()
import { initializeApp, applicationDefault } from 'firebase-admin/app'
const { getFirestore } = require('firebase-admin/firestore')

initializeApp({
    credential: applicationDefault()
});

const db = getFirestore()
db.settings({ ignoreUndefinedProperties: true });

export default  db;
