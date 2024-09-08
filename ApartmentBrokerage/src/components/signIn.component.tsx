import { useContext } from "react"
import { SignInData } from "../interfaces/user.interface"
import { UserContext } from "../context/user.context"
import { useNavigate } from 'react-router-dom';


export const SignIn = () => {    
    const userContext = useContext(UserContext)
    const navigate = useNavigate()
    const entrance = async (event) => {
        event.preventDefault()
        const user: SignInData = {
            email: event.target.email.value,
            password: event.target.password.value,
        }
        const response = await userContext.signIn(user)
        if (response.user.role === "admin"&& response.user) {
            alert(" מנהל התחבר")
            navigate('/admin')
        }
        else if (response.user.role === "user") {
            alert("משתמש התחבר")
            navigate('/Home')
        }
        else {
            alert("error")
            event.target.reset()
        }

    }
    return <div>
        <h2>התחבר כמנהל</h2>
        <form onSubmit={entrance}>
            <input type="email" placeholder="מייל" name="email" /> <br />
            <input type="password" placeholder="סיסמת" name="password" /> <br />
            <button type="submit">שמירה</button>
        </form>
    </div>

}