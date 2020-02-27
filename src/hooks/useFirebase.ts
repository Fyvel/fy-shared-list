import firebase from 'firebase';
import { config } from '../firebase'

export default function useFirebase(firebaseConfig = { ...config }) {
    if (!firebase.apps.length) {
        console.log('firebase init')
        firebase.initializeApp(firebaseConfig)
    }
    return { firebase }
}