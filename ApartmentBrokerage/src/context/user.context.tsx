import { createContext, useState } from "react"
import { User, SignInData } from "../interfaces/user.interface"
import { SignIn, SignUp } from "../api/user.api"

export type userContext =
    {
        user?: User,
        setUser: Function,
        signIn: Function,
        signUp:Function,
        token: string,
        setToken: Function
    }
export const UserContext = createContext<userContext>();

export const UserProvider = (props) => {
    const { children } = props

    const [user, setUser] = useState<User>()
    const [token,setToken] = useState<string>()
    const userData: userContext = {
        user, setUser(user: User) {
            this.user = user
        },
        async signIn(data: SignInData) {
            try {    
                const response =await SignIn(data)
                if (response) {
                    setUser(await response.user)
                    setToken(await response.token)
                    return response;
                }
                else {
                    throw new Error("no user")
                }
            } catch (error) {
                return false
            }
        },
        async signUp(data: User) {
            try {    
                const user =await SignUp(data)
                
                if (user) {
                    setUser(await user)
                    return true
                }
                else {
                    throw new Error("no user")
                }
            } catch (error) {
                return false
            }
        },
        token,


    }
    return <UserContext.Provider value={userData}>
        {children}
    </UserContext.Provider>
}
