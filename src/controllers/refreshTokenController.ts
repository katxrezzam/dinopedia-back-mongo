import { RequestHandler } from "express"
import { findbyRefreshTokem } from "../services/userServices"
import jwt from 'jsonwebtoken'
import { errorJson, errorMessage } from "../util/errorLogger"

const handleRefreshToken: RequestHandler = async (req, res) => {
  try {
    const cookies = req.cookies

  if(!cookies?.jwt) return res.sendStatus(401)
  const refreshToken = cookies.jwt

  const foundUser = await findbyRefreshTokem(refreshToken)
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    (err: jwt.VerifyErrors | null, decoded: any) => {
      if(err || foundUser.userName !== decoded.userName) return res.sendStatus(403)
      const roles = Object.values(foundUser.roles)
      const userName = foundUser.userName
      const accessToken = jwt.sign(
        {
          "UserInfo": {
            "userName": decoded.userName,
            "roles": roles,
          }
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '300s' }
      )
      res.json({ userName, accessToken, roles })
      return
    }
  )
  } catch (error) {
    res.status(400).json(errorJson(error))
    console.error(errorMessage(error))
  }
  return
}

export default handleRefreshToken