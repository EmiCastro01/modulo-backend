const getUsers = () => {
  const users = fs.readFileSync(UsersFilePath)
  const usersJson = JSON.parse(users)
  return usersJson.usuarios
}
