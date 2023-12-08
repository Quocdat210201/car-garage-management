import axios from "axios";
import * as Types from '../ActionType'


const BASE_URL = 'https://localhost:44369/'

export const Login = (userName, password) => async dispath => {
    try {
        const result = await axios.post(
            `${BASE_URL}/account/login`
        );
        dispath({ type: Types.USER_LOGIN, payload: result.data.results })
    } catch (error) {
        console.log('Get API error');
    }
}

export default {Login}