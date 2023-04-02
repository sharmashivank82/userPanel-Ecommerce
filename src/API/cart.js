import axios from "axios";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem('authToken');

class Cart {

    async getCartList(){
        try {

            const config = {
                method: 'get',
                url: `${SERVER_URL}/user/checkout-list`,
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

    async deleteCheckout(data){
        try{

            const config = {
                method: 'delete',
                url: `${SERVER_URL}/user/checkout`,
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

    async applyCoupon(data){
        try{

            const config = {
                method: 'put',
                url: `${SERVER_URL}/user/coupon`,
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
export default new Cart();