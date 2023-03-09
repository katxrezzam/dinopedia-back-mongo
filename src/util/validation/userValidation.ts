import { CreateUser } from "../../types";
import { stringValidation } from "./_validation";

export const toNewUser = (obj: any): CreateUser => {
  const newUser: CreateUser = {
    userName: stringValidation(obj.userName),
    pwd: stringValidation(obj.pwd)
  }
  return newUser
}