import { useContext } from "react"
import { UserContext } from "../context/user.context"
import { useNavigate } from "react-router-dom"
import { user} from "../interfaces/User.interface"

export const SignUp=()=>{
    const userContext=useContext(UserContext)
    let roletype:string
    const navigate=useNavigate()
    const register = async (event) => {
        event.preventDefault()
        const user = {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value,
            role:"user",
            
        }
        const truePassword= event.target.truePassword.value

        if (user.password !== truePassword) {
            alert("הסיסמה והאימות שלה לא תואמים");
            event.target.reset()
            return;
        }
        const response = await userContext.signUp(user);
        if (response) {
            alert("ההרשמה בוצעה בהצלחה")
            navigate("/home")
        }
        else {
            alert("שם משתמש כבר קיים")
            event.currentTarget.reset();
        }
    }


    return <div>
        <h2>הרשמה</h2>
         <form onSubmit={register}>
            <input type="text" placeholder="שם משתמש" name="name"/><br />
            <input type="email" placeholder="מייל" name="email"/><br />
            <input type="password" placeholder="סיסמה" name="password"/><br />
            <input type="password" placeholder="אימות סיסמה" name="truePassword"/><br />
            <button type="submit">הרשמה</button>
        </form>
    </div>

}