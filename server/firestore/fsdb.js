import firebase from 'firebase/app'
import 'firebase/firestore'
const firebaseConfig = {
  apiKey: 'AIzaSyAGK7lTDySjyb-huj2kUzjSoz_pSsLmafM',
  authDomain: 'fantasy-scroll.firebaseapp.com',
  databaseURL: 'https://fantasy-scroll.firebaseio.com',
  projectId: 'fantasy-scroll',
  storageBucket: 'fantasy-scroll.appspot.com',
  messagingSenderId: '325113898596',
  appId: '1:325113898596:web:c745fc7aa34f979b'
}
const fire = firebase.initializeApp(firebaseConfig)
const db = fire.firestore()

const getAllUsers = (sessionId) => {
  return db.collection(sessionId).doc('Users').get()
    .then(data => { return data.data() })
}

const addUser = (sessionId, userName) => {
  return getAllUsers(sessionId)
    .then(obj => {
      let id = obj.users[obj.users.length - 1].id + 1
      let isAdmin = true
      obj.users.forEach(user => {
        if (user.isAdmin === true) isAdmin = false
      })
      let user = { id, isAdmin, userName }
      obj.users.push(user)
      db.collection(sessionId).doc('Users').set(obj)
      return obj.users
    })
}

const getAllMessages = (sessionId) => {
  return db.collection(sessionId).doc('Messages').get()
    .then(data => { return data.data() })
}

const addMessage = (sessionId, userName, recipients, messageText) => {
  return getAllMessages(sessionId)
    .then(obj => {
      let id = obj.messages[obj.messages.length - 1].id + 1
      let date = new Date()
      let timestamp = date.getTime()
      let message = { id, userName, messageText, recipients, timestamp }
      obj.messages.push(message)
      db.collection(sessionId).doc('Messages').set(obj)
      return obj.messages
    })
}
const resetFirestore = (sessionId) => {
  db.collection(sessionId).doc(TestBed2).delete().then(function () {
    console.log('Document successfully deleted!')
  }).catch(function (error) {
    console.error('Error removing document: ', error)
  })
}

export {
  getAllUsers,
  getAllMessages,
  addUser,
  addMessage,
  resetFirestore
}
