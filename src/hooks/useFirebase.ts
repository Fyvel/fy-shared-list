import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'
import { config } from '../firebase'

firebase.initializeApp(config)

const { firestore, fireauth, persistence } = {
    firestore: firebase.firestore(),
    fireauth: firebase.auth(),
    persistence: firebase.auth.Auth.Persistence
}

export default function useFirebase() {
    return { firestore, fireauth, persistence }
}