import axios from "axios";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem('authToken');

class Product {

    async getProductList(data){
        try {

            const { limit, page } = data;
            let parseUrl = `?`;
            parseUrl = limit ? `${parseUrl}limit=${limit}&` : parseUrl ;
            parseUrl = page ? `${parseUrl}page=${page}&` : parseUrl ;

            const config = {
                method: 'get',
                url: `${SERVER_URL}/user/product-list${parseUrl}`,
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

    async createCheckout(data){
        try{

            const config = {
                method: 'post',
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

}

// eslint-disable-next-line
export default new Product();