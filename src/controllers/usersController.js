const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')
const UsersFilePath = path.join(__dirname, '../data/users.json')
const { validationResult} = require('express-validator')

const getUsers = () => {
    const users = fs.readFileSync(UsersFilePath)
    const usersJson = JSON.parse(users)
    return usersJson.usuarios
}

const homeView = (req,res) => {
  if(req.session.nombre){
    const users = getUsers()
    const user = users.find((user) => user.name == req.session.nombre)
    res.render(path.join(__dirname, '../views/vistas/bienvenido.ejs'), {user})
  }else{
    res.render(path.join(__dirname, '../views/vistas/login.ejs'))  
  }
}

const logOut = (req, res) => {
  req.session.destroy()
  res.clearCookie('login-session')
  res.redirect('/')
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
    res.render(path.join(__dirname, '../views/vistas/signUp.ejs'))
}

const loginView = (req,res) => {
  res.render(path.join(__dirname, '../views/vistas/login.ejs'))
}
const signUp = (req,res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()})
  }
  const users = getUsers()
  const newUser = {
    id: users.length + 1,
    ...req.body
  }
  newUser.password = bcrypt.hashSync(newUser.password, 10)        //ENCRIPTO LA CONTRASEÑA
  users.push(newUser)
  const newDataBase = '{ "usuarios":'+ JSON.stringify(users, null, 2) + '}'
  fs.writeFileSync(UsersFilePath, newDataBase)
  res.redirect('/')
}

const login = (req,res) => { 
  const users = getUsers()
  const userToCompare = {...req.body}
  const user = users.find(user => user.name == userToCompare.name)
 
    if(user && user.name === userToCompare.name && bcrypt.compareSync(userToCompare.password, user.password)){
      req.session.nombre = user.name
      res.redirect('/')
    }else{
      res.send("Usuario invalido")
    }
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
    signUp,
    userView,
    deleteUser,
    login,
    loginView,
    homeView,
    logOut,
}