import { useState, useEffect, useContext } from "react";
import mainContext from "../../Context/mainContext";
import product from "../../API/product";
import { useNavigate } from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Product() {

    const { limit } = useContext(mainContext);
    const [pageno, setPageno] = useState(1);
    const [productList, setProductList] = useState([]);
    const [totalProdutc, setTotalProduct] = useState(0);
    const navigate = useNavigate();

    const style = {
        mybtn: {
            padding: '10px 20px',
            borderRadius: '4px',
            backgroundColor: '#4CAF50',
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight:'bold',
            textDecoration: 'none',
            border: 'none',
            cursor: 'pointer',
        },

        box: {
            display: 'flex',
            flexDirection: 'column',
            width: '200px',
            height: '200px',
            padding: '12px',
            border: '1px solid',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            gap: '2vh',
        },

        container: {
            display: 'flex',
            gap: '2vh',
            flexWrap: 'wrap',
            margin: '2vh',
        }
    }

    const getProductList = async(page) => {
        const res = await product.getProductList({ limit, page });
        if(res && res.status === 200){
            setProductList(res.data.data.products)
            setTotalProduct(res.data.data.totalCount)
        }
    }

    const getList = async(page = 1) => {
        const res = await getProductList(page)
    }

    const handleNext = () => {
        let prev = pageno;
        setPageno((prev) => (prev+1));
        getProductList(prev+1);
    }

    const handlePrev = () => {
        let prev = pageno;
        setPageno((prev) => (prev-1));
        getProductList(prev-1);
    }

    useEffect(() => {
        getList(1)
    }, [])

    const handleAddToCart = async(item) => {
        const res = await product.createCheckout({ productId: item._id })
        if(res && res.status === 200){
            window.alert('Product is added in the cart')
        }else{
            window.alert(res.data.message)
        }
    }


  return (
    <div>
            <br />Total :: {totalProdutc}<br />
            
            <div style={style.container}>
                {
                    productList && productList.map((item, index) => {
                        return (
                            <div key={index} style={style.box}>
                                <div>
                                    <h3>{item.name}</h3>
                                    <div>
                                        <img src={`${SERVER_URL}/${item.image}`} alt="img" width="55px;" />
                                    </div>
                                </div>
                                <div>
                                    <h3>{item.price}</h3>
                                    <button style={style.mybtn} onClick={() => handleAddToCart(item)}>Add To Cart</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            { pageno > 1 && <button style={style.mybtn} onClick={handlePrev}>Prev Page</button> }<br /><br />
            <h3>Current Page {pageno}</h3><br />
            { Math.ceil(totalProdutc/limit) > pageno && <button style={style.mybtn} onClick={handleNext}>Next Page</button> }
            <br /><br />
            <button style={style.mybtn} onClick={() => navigate('/cart')}>Proceed To Cart</button>
        </div>
  )
}

export default Product