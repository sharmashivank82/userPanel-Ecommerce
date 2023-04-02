import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainState from "./Context/mainState";
import Login from "./Container/Login/Login.component";
import Home from "./Container/Home/Home.component";
import Product from "./Container/Product/Product";
import Cart from "./Container/Checkout/Cart";

function App() {
  return (
    <MainState>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />}>
              <Route path="product" element={<Product />} />
              <Route path="cart" element={<Cart />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </MainState>
  );
}

export default App;
