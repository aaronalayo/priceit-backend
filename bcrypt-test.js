import bcrypt from "bcrypt"

const password = 'myTotally$afePa55w0rd!'

const hashed_password = await bcrypt.hash(password, 10);

console.log(hashed_password)