import { Schema } from "mongoose";
import { UpdateUserInput, User, UserInput, UserOutput } from "../models/User";

export const findById = async (id: Schema.Types.ObjectId): Promise<UserOutput> => {
  const user = await User.findById(id)
  if(!user) throw new Error('User not found')
  return user
}

export const findByUser = async (userName: string): Promise<UserOutput> => {
  const user = await User.find({ userName })
  if(!user) throw new Error('User not found')
  return user[0]
}

export const findbyRefreshTokem = async(refreshToken: string): Promise<UserOutput>  => {
  const user = await User.find({ refreshToken })
  if(!user) throw new Error('User not found')
  return user[0]
}

export const update = async (id: Schema.Types.ObjectId, user: Partial<UpdateUserInput>): Promise<UserOutput> => {
  const foundUser = await User.findById(id)
  if(!foundUser) throw new Error('Not user found')
  
  const { userName, pwd, roles, refreshToken } = user

  if(userName) foundUser.userName = userName
  if(pwd) foundUser.pwd = pwd
  if(roles) foundUser.roles = roles
  if(refreshToken) foundUser.refreshToken = refreshToken

  return await foundUser.save()
}

export const create = async (user: UserInput): Promise<UserOutput> => {
  return await User.create(user)
}

