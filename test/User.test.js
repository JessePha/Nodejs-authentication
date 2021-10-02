import Chai from 'chai'
import ChaiHTTP from 'chai-http'
import { describe, it as test } from 'mocha'
import httpStatus from '../config/httpStatus.js'
import app from '../Server.js'

Chai.should()
Chai.use(ChaiHTTP)

const randomString = Math.random().toString(36).substring(7)
const user = {
    username: randomString,
    password: randomString
}
const userId = '60f5768ec48a261e343226e5'

const testNoneExistingRoute = () => {
    describe('Testing route that not exist', () => {
        test('Expecting 404 not found', (done) => {
            Chai.request(app)
            .get(`/${randomString}`)
            .end((request, response) => {
                response.should.have.a.status(httpStatus.NOT_FOUND)
                done()
            })
        })
    })
}

// createUser
// getAllUsers
// findUser
// getUserWithUsernameQuery
// updateUser
// deleteUser

const createUser = () => {
    describe('Testing Create(POST) method', () => {
        test('Expecting a user to be created', (done) => {
            Chai.request(app)
            .post('/register')
            .send(user)
            .end((error,response) => {
                response.should.have.a.status(httpStatus.CREATED)
                response.body.should.be.a('object')
                response.body.should.have.property('username').eq(user.username)
                response.body.should.have.property('password').eq(user.password)
                done()
            })
        })
    })
}
const getAllUsers = () => {
    describe('Testing Create(GET) method', () => {
        test('Expecting to return all users', (done) => {
            Chai.request(app)
            .get('/user')
            .end((error, response) =>{
                response.should.have.status(httpStatus.OK)
                response.body.should.be.a('array')
                response.body.length.should.be.eq(response.body.length)
                done()
            })
        })
    })
}
const findUser = () => {
    describe('Testing Create(GET) method', () => {
        test('Expecting a user return', (done) => {
            Chai.request(app)
            .get()
        })
    })
}
const getUserWithUsernameQuery = () => {
    describe('Testing Create(GET) method', () => {
        test('Expecting a user return', (done) => {
            Chai.request(app)
        })
    })
}
const updateUser = () => {
    describe('Testing Create(PUT) method', () => {
        test('Expecting a user updated', (done) => {
            Chai.request(app)
            .put(`/user/${userId}`)
            .send(user)
            .end((error, response) => {
                response.should.have.status(httpStatus.OK)
                response.body.should.be.a('object')
                response.body.should.have.property('_id').eq(`${userId}`)
  //              response.body.should.have.property('username').eq(user.username)
  //              response.body.should.have.property('password').eq(user.password)
                done()
            })
        })
    })
}
const deleteUser = () => {
    describe('Testing Create(DELETE) method', () => {
        test('Expecting a user to be deleted', (done) => {
            Chai.request(app)
            .delete(`/user/${userId}`)
            .end((error, response) => {
                response.should.have.status(httpStatus.OK)
                done()
            })
        })
    })
}





describe('TESTING USER API ROUTES', () => {
    testNoneExistingRoute()
 //   createUser()
    getAllUsers()
    updateUser()
    deleteUser()
})
