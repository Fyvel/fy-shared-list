import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { config } from '../firebase'

export default function useFirebase(firebaseConfig = { ...config }) {
    if (!firebase.apps.length) {
        console.log('firebase init')
        firebase.initializeApp(firebaseConfig)
    }
    return {
        firestore: firebase.firestore,
        fireauth: firebase.auth
    }
}