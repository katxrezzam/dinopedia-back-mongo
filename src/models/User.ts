import { Schema, model } from 'mongoose'


interface UserAttributes{
  _id: Schema.Types.ObjectId
  userName: string
  pwd: string
  roles: number[]
  refreshToken: string
}

export interface UserInput extends Omit<UserAttributes, '_id' | 'roles' | 'refreshToken'> {}
export interface UpdateUserInput extends Omit<UserAttributes, '_id' > {}
export interface UserOutput extends Required<UserAttributes> {}


const UserSchema = new Schema<UserAttributes>({
  userName: {
    type: String,
    required: true
  },
  pwd: {
    type: String,
    required: true
  },
  roles: {
    User: {
      type: Number,
      default: 2001
    },
    Admin: Number
  },
  refreshToken: String
})

const User = model<UserAttributes>('User', UserSchema)

export { User, UserAttributes }