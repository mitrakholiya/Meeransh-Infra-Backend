import jwt from "jsonwebtoken"

export const genrateToken=(id:string):string=>{
    return jwt.sign({id},process.env.JWT_SECRET as string,{
        expiresIn:"1h"
    })
}