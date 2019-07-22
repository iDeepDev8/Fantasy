import { exportAllDeclaration } from '@babel/types'
import {
  getAllMessages,
  getViewableMessages,
  addUser,
  addMessage,
  resetFirestore
} from '../server/firestore/fsdb'

const FirestoreMock = {
  Users: {
    users: [
      { id: 1, isAdmin: true, userName: 'Celia' },
      { id: 2, isAdmin: false, userName: 'Ruslan' },
      { id: 3, isAdmin: false, userName: 'Keith' },
      { id: 4, isAdmin: false, userName: 'Taine' }
    ]
  },
  Messages: {
    messages: [
      { id: 1, userName: 'Taine', message: 'test 1', recipients: [1, 2, 3, 4, 5], timestamp: 123456788 },
      { id: 2, userName: 'Taine', message: 'test 2', recipients: [1, 2, 4, 5], timestamp: 123456789 },
      { id: 3, userName: 'Taine', message: 'test 3', recipients: [1, 2, 5], timestamp: 123456999 },
      { id: 4, userName: 'Taine', message: 'test 4', recipients: [5], timestamp: 12345 }
    ]
  }
}

const getAllUsersMock = () => {
  const obj = FirestoreMock.Users
  return Promise.resolve(obj)
}

const getAllMessagesMock = () => {
  const obj = FirestoreMock.Messages
  return Promise.resolve(obj)
}

test('getAllUsers returns an array of 4 users', (done) => {
  expect.assertions(1)
  getAllUsersMock()
    .then(obj => {
      expect(obj.users).toHaveLength(4)
      done()
    })
})

test('addUser adds a new user to db with a sequential userId and if Admin already exists sets it to false', (sessionID, done) => {
  addUser('TestBed2', 'Wizard')
    .then(array => console.log(array))
  // .then(user => {
  //   console.log(user)
  //   expect({ user }).toEqual({ user: 'Wizard' })
  //   done()
  // })
  // .then(obj => {
  //   console.log(obj.users)
  //   expect(obj.users).toHaveLength(5)
  //   done()
  // })
})

// setUserName = username => {
//   addUser(ssID, username)
//     .then(user => {
//       this.setState({ user }, () => {
//         saveSession(this.state)
//       })
//     })
// }
// addUser('TestBed', 'Wizard')getAllMessages
//   .then(array => console.log(array))

test('getAllMessages returns an array of 3 messages', (done) => {
  getAllMessagesMock()
    .then(obj => {
      expect(obj.messages).toHaveLength(3)
      done()
    })
})

test('addMessage adds a new message to db', (done) => {
  addMessage('TestBed2', 'Celia', [1, 3], 'Wizard is the best')
    .then(messages => {
      expect(messages[3].messageText).toBe('Wizard is the best')
      expect(messages.length).toBe(5)
      done()
    })
})

test.skip('getViewableMessages gets only messages a player can see', (done) => {
  getViewableMessages('TestBed2', '2')
    .then(userMessages => {
      console.log(userMessages)
      done()
    })
})

test('resetFirestore deletes a document', (done) => {
  resetFirestore('123456789012345')
    .then(() => {
      expect(db.collection('123456789012345').doc('Users')).not(null)
      done()
    })
})
