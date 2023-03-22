const path = require('path')
const { check } = require('express-validator')
const userController = require('../controllers/usersController.js')

const routes = (app) => {
app.get('/', (req,res) => {
    res.render(path.join(__dirname, '../views/vistas/bienvenido.ejs'))
})
app.get('/user/:id', userController.userView)
app.get('/AddUser', userController.addUserView)
app.get('/users', userController.usersView)
app.get('/delete/:id', userController.deleteUser)
app.post('/addUser', [
                    check('name').isLength({min : 5}),
                    check('name').isAlpha().withMessage('Must be alphabetical characters'),
                    check('lastName').isLength({min :5}),
],userController.addUser)
}
module.exports = {
    routes,
}
