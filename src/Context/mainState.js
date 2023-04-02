import mainContext from "./mainContext";
import { useState } from "react";

const MainState = (props) => {

    const [ productList, setProductList ] = useState([]);
    const [ loginUserInfo, setLoginUserinfo ] = useState({});
    const [ totalDataCount, setTotalDataCount ] = useState(0);
    const [ limit, setlimit ] = useState(3);

    return (
        <mainContext.Provider value={{
            productList, 
            setProductList,

            loginUserInfo, 
            setLoginUserinfo,

            totalDataCount,
            setTotalDataCount,
            limit, 
            setlimit,

        }}>
            {props.children}
        </mainContext.Provider>
    )
}

export default MainState;