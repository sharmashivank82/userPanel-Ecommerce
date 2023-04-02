import axios from "axios";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem('authToken');

class Auth {

    async login(data) {
        try{

            const config = {
                method: 'post',
                url: `${SERVER_URL}/auth/login`,
                data,
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const res = await axios(config);
            return res;

        }catch(err){
            return err.response
        }
    }

    async checktoken(data){
        try {

            const config = {
                method: 'post',
                url: `${SERVER_URL}/auth/check-token`,
                headers: {
                    'Authorization': `Bearer ${data}`,
                    'Content-Type': 'application/json'
                }
            }

            const res = await axios(config);
            return res;
            
        } catch (err) {
            return err.response;
        }
    }

    async createUser(data){
        try {

            const config = {
                method: 'post',
                url: `${SERVER_URL}/auth/register`,
                data,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }

            const res = await axios(config);
            return res;
            
        } catch (err) {
            return err.response;
        }
    }

}

// eslint-disable-next-line
export default new Auth();