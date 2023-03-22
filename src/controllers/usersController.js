const fs = require('fs')
const path = require('path')
const UsersFilePath = path.join(__dirname, '../data/users.json')
const { validationResult} = require('express-validator')

const getUsers = () => {
    const users = fs.readFileSync(UsersFilePath)
    const usersJson = JSON.parse(users)
    return usersJson.usuarios
}

const userView = (req,res) => { 
  const users = getUsers()
  const user = users.find((user) => user.id == req.params.id)
  res.render(path.join(__dirname, '../views/vistas/user.ejs'), {user})
}
const usersView = (req,res) => {
    const users = getUsers()
    res.render(path.join(__dirname, '../views/vistas/users.ejs'), { users:users})
}

const addUserView = (req,res) => {
    res.render(path.join(__dirname, '../views/vistas/addUser.ejs'))
}

const addUser = (req,res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()})
  }
  const users = getUsers()
  const newUser = {
    id: users.length + 1,
    ...req.body 
  }
  users.push(newUser)
  const newDataBase = '{ "usuarios":'+ JSON.stringify(users, null, 2) + '}'
  fs.writeFileSync(UsersFilePath, newDataBase)
  res.redirect('/')

}


const deleteUser = (req,res) => {

 const users = getUsers()
 console.log(users)
 const deleted = users.filter((user)=> user.id != req.params.id)
 console.log(users)
 const newDataBase = '{ "usuarios":'+ JSON.stringify(deleted, null, 2) + '}'
 fs.writeFileSync(UsersFilePath, newDataBase)
 res.redirect('/')
}


module.exports = {
    usersView,
    addUserView,
    addUser,
    userView,
    deleteUser
}