import { useState, useEffect, useContext } from "react";
import mainContext from "../../Context/mainContext";
import cart from "../../API/cart";
import { useNavigate } from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Cart() {

    const { limit } = useContext(mainContext);
    const [pageno, setPageno] = useState(1);
    const [productList, setProductList] = useState([]);
    const [totalProdutc, setTotalProduct] = useState(0);
    const [quantity, setQuantity] = useState({})
    const [billingSet, setBillingSet] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [isEdit, setisEdit] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [isCouponApplied, setIsCouponApplied] = useState(false);
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
            height: '300px',
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
        },

        bgcontainer :{
            position: 'absolute',
            width: '100vw',
            height: '100vh',
            background: '#0000007d',
            top: '0',
            left: '0',
        },

        boarddata: {
            width: '50vw',
            height: '70vh',
            backgroundColor: 'white',
            position: 'relative',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        }
    }

    const getProductList = async() => {
        const res = await cart.getCartList();
        console.log({ res })
        if(res && res.status === 200){
            setProductList(res.data.response)
            setTotalProduct(res.data.response.length)
        }
    }

    const getList = async() => {
        const res = await getProductList()
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

    const handleRemoveToCart = async(item) => {
        const res = await cart.deleteCheckout({ _id: item._id })
        if(res && res.status === 200){
            window.alert('Product is remove from cart')
            getProductList()
        }else{
            window.alert(res.data.message)
        }
    }

    const handleAdd = (item) => {
        console.log({ item })
        setQuantity((prev) => {
            let initial = 0;
            if(prev[item._id]) initial = prev[item._id]
            return { ...prev, [item._id]: initial + 1 }
        })
    }

    const handleSub = (item) => {
        setQuantity((prev) => {
            let initial = 0;
            if(prev[item._id]) initial = prev[item._id]
            if(prev[item._id] === 0) return { ...prev, [item._id]: 0 }
            return { ...prev, [item._id]: initial - 1 }
        })
    }

    const handleCoupon = async() => {
        const res = await cart.applyCoupon({ code: couponCode });
        console.log({ res })
        if(res && res.status === 200){
            window.alert('coupon applied successfully')
            setTotalAmount((prev) => (prev - parseInt(res.data.coupon.amount)));
            setIsCouponApplied(true);
            setisEdit(false);
        }else{
            window.alert(res.data.message)
        }
    }

    useEffect(() => {
        let data = [], totalPrice = 0;
        Object.keys(quantity).map((item) => {
            for(let i=0; i<productList.length; i++){
                if(productList[i]._id === item){
                    data.push({ 
                        price: productList[i].productId.price, 
                        _id: productList[i].productId._id,
                        quantity: quantity[item]
                    })
                    totalPrice += parseFloat(productList[i].productId.price) * quantity[item];
                }
            }
        })

        setTotalAmount(totalPrice)
        setBillingSet([ ...data ]);

    }, [quantity])

    // console.log({ billingSet })


  return (
    <div>
            <br />Total :: {totalProdutc}<br />
            
            <div style={style.container}>
                {
                    productList && productList.map((item, index) => {
                        return (
                            <div key={index} style={style.box}>
                                <div>
                                    <h3>{item?.productId.name}</h3>
                                    <div>
                                        <img src={`${SERVER_URL}/${item?.productId.image}`} alt="img" width="55px;" />
                                    </div>
                                </div>
                                <div>
                                    <h3>{item?.productId.price}</h3>
                                    <button style={style.mybtn} onClick={() => handleRemoveToCart(item)}>Remove To Cart</button>
                                </div>
                                <div>
                                    <button style={style.mybtn} onClick={() => handleAdd(item)}>Add</button>
                                    <div>{quantity[`${item._id}`]}</div>
                                    <button style={style.mybtn} onClick={() => handleSub(item)}>Sub</button>
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
            <button style={style.mybtn} onClick={() => navigate('/product')}>Proceed To Product</button>

            <br /><br />
            { !isCouponApplied && <button style={style.mybtn} onClick={() => setisEdit(!isEdit)}>Apply Coupon</button>}
            <h3>Total Price :: {Math.round(totalAmount * 100) / 100} </h3>
            

            {
                isEdit &&
                <div style={style.bgcontainer}>
                    <div style={style.boarddata}>
                        <button style={style.mybtn} onClick={() => setisEdit(!isEdit)}>Close</button><br /><br />
                        <br />
                        <label htmlFor='name'>Code</label>
                        <input type='text' id='name' value={couponCode} onChange={(e) => setCouponCode(e.target.value)} style={{ border: '1px solid' }} />
                        <button style={style.mybtn} onClick={handleCoupon}>Apply Coupon</button>
                    </div>
                </div>
            }

            { totalAmount > 0 && <button style={style.mybtn}>Proceed To Pay</button>}

        </div>
  )
}

export default Cart