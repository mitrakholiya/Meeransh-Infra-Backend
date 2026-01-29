import jwt from "jsonwebtoken"

export const genrateToken=(id:string,role:string):string=>{
    return jwt.sign({id,role},process.env.JWT_SECRET as string,{
        expiresIn:"1h"
    })
}