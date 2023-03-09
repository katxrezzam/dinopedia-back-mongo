import { RequestHandler } from "express"
import { findByUser, update } from "../services/userServices"
import bcrypt from 'bcrypt'
import { errorJson, errorMessage } from "../util/errorLogger"
import jwt from "jsonwebtoken"
import { config } from "dotenv"

config()

const handleLogin: RequestHandler = async (req, res) => {
  try {
    console.log(req.body)
    const { userName, pwd } = req.body
    if(!userName || !pwd) return res.status(400).json({ 'message': 'Username or password are required' })
    const user = await findByUser(userName)
    console.log(user.pwd)
    const match = await bcrypt.compare(pwd, user.pwd)
    console.log(match)
    if(match){
      const roles = Object.values(user.roles).filter(Boolean)
      const accessToken = jwt.sign(
        {
          "UserInfo": {
            "userName": user.userName,
            "roles": roles
          }
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '150s' }
      )
      const refreshToken = jwt.sign(
        { "userName" : user.userName },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '1d' }
      )

      user.refreshToken = refreshToken
      await update(user._id, user)
      console.log(roles)
      res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000  })
      res.json({ user, accessToken })
    }
    else{
      res.sendStatus(401)
    }
  } catch (error) {
    res.status(400).json(errorJson(error))
    console.error(errorMessage(error))
  }
  return
}

export default handleLogin 