import React from "react"
import './App.css';
import { Footer } from "./component/Footer";
import { Home } from "./component/Home";
import { BrowserRouter,Route, Switch } from "react-router-dom";
import { ProductDetail } from "./component/product/productDetail";
import { Cart } from "./component/cart/cart";
import { Register } from "./component/user/register";
import { Login } from "./component/user/login";
import { Profile } from "./component/user/profile";
import { Password } from "./component/user/password";
import { Edit } from "./component/user/Edit";
import { MyOrder } from "./component/order/MyOrder";
import { OrderDetail } from "./component/order/OrderDetail";
import { OrderAdmin } from "./component/order/orderAdmin";
import { Products } from "./component/product/ADMIN/Products";
import { CreateP } from "./component/product/ADMIN/products/CreateP";
import { UpdateP } from "./component/product/ADMIN/products/updateP";
import { NotFound } from "./NotFound";

function App() {
  return (
    <BrowserRouter>
    
    <Switch>
    <Route path="/" exact component={Home}/>
      <Route path="/product/:id" exact component={ProductDetail}/>
      <Route path="/cart" exact component={Cart}/>
      <Route path="/register" exact component={Register}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/profile" exact component={Profile}/>
      <Route path="/password/change" exact component={Password}/>
      <Route path="/profile/edit" exact component={Edit}/>
      <Route path="/me/order" exact component={MyOrder}/>
      <Route path="/order/:idr" exact component={OrderDetail}/>
      <Route path="/admin/orders" exact component={OrderAdmin}/>
      <Route path="/admin/products" exact component={Products}/>
      <Route path="/admin/products/create" exact component={CreateP}/>
      <Route path="/admin/products/update/:id" exact component={UpdateP}/>
      <Route  component={NotFound}/>
    </Switch>

      
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
