import { useEffect } from "react";
import auth from "../../API/auth";
import { useContext } from "react";
import mainContext from "../../Context/mainContext";
import { useNavigate, Outlet } from "react-router-dom";

function Home() {

    const context = useContext(mainContext);
    const { setLoginUserinfo } = context;
    const navigate = useNavigate();

    async function fetchData() {
        if(localStorage.getItem('authToken')){

            const res = await auth.checktoken(localStorage.getItem('authToken'));
            if(res && res.status === 200){
                setLoginUserinfo( res.data.user )
                navigate('/product')
            }else if(res.status === 403 && localStorage.getItem("authToken")){  
                localStorage.removeItem("authToken");
               navigate('/login')
                window.location.reload();
            }else {
                localStorage.removeItem("authToken");
               navigate('/login')
            }

        }else{
           navigate('/login')
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

  return (
    <>
        <Outlet />
    </>
  )
}

export default Home