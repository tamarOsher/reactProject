
import axios from "axios";
import { SignInData, User } from "../interfaces/user.interface";

export const SignIn = async (data: SignInData) => {
    try {
        

        const response = await axios.post('http://localhost:3000/login/signIn', data, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        });
        alert(JSON.stringify( response)+"       xcvbnm,mnbvcxzzxcvbn");
        return response.data;
    } catch (error) {
        throw new Error('The user does not exist');
    }
};

export const SignUp= async (data: User) => {
    try {

        const response = await axios.post('http://localhost:3000/login/signUp', data, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        });
        console.log(response);
        return response.data;
    } catch (error) {
        throw new Error('The user already exists');
    }
};

