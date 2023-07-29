const path = require('path')
const { check } = require('express-validator')
const userController = require('../controllers/usersController.js')

const routes = (app) => {
app.get('/', userController.homeView)
app.get('/logOut', userController.logOut)
app.get('/logIn', userController.loginView)
app.get('/user/:id', userController.userView)
app.get('/AddUser', userController.addUserView)
app.get('/users', userController.usersView)
app.get('/delete/:id', userController.deleteUser)
app.post('/signUp', [
                    check('name').isLength({min : 5}),
                    check('name').isAlpha().withMessage('Must be alphabetical characters'),
                    check('lastName').isLength({min :5}),
],userController.signUp)
app.post('/login', [
                    check('name').isLength({min : 5}),
                    check('name').isAlpha().withMessage('Must be alphabetical characters'),
                    check('lastName').isLength({min :5}),
], userController.login)
}
module.exports = {
    routes,
}
