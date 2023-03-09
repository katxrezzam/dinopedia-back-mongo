import { RequestHandler } from "express";
import { create, findByUser } from "../services/userServices";
import bcrypt from 'bcrypt'
import { toNewUser } from "../util/validation/userValidation";
import { errorJson, errorMessage } from "../util/errorLogger";

const handleNewUser: RequestHandler = async (req, res) => {
  try {
    const parsedUser = toNewUser(req.body)
    const duplicated = await findByUser(parsedUser.userName)
    if(duplicated) return res.sendStatus(409)

    const hashedPwd = await bcrypt.hash(parsedUser.pwd, 10)
    parsedUser.pwd = hashedPwd

    console.log(parsedUser)

    const newUser =  await create(parsedUser)

    console.log(newUser)
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json(errorJson(error))
    console.error(errorMessage(error))
  }
  return
}

export default handleNewUser