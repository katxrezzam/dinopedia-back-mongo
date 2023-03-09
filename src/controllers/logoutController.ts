import { RequestHandler } from "express";
import { findbyRefreshTokem, update } from "../services/userServices";
import { errorJson, errorMessage } from "../util/errorLogger";

const handleLogout: RequestHandler = async (req, res) => {
  try {
    const cookies= req.cookies

    if(!cookies?.jwt) return res.sendStatus(204)

    const refreshToken = cookies.jwt
    const foundUser = await findbyRefreshTokem(refreshToken)
    if(!foundUser) {
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
      return res.sendStatus(204)
    }
    foundUser.refreshToken = ''
    const result = await update(foundUser._id, foundUser)
    console.log(result)
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json(errorJson(error))
    console.error(errorMessage(error))
  }
  return
}

export default handleLogout