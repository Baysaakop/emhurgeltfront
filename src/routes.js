import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Login from './account/Login';
import Profile from './account/Profile';
import ProductList from './product/ProductList';
import ProductDetail from './product/ProductDetail';
import About from './containers/About';
import Contact from './containers/Contact';
import ProductShop from './product/ProductShop';
import BrandProducts from './product/BrandProducts';
import Staff from './staff/Staff';
import Bonus from './containers/Bonus';
import StaffLogIn from './staff/StaffLogin';
import Registration from './account/Registration';
import Admin from './staff/Admin';

function BaseRouter () {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />            
            <Route exact path="/contact" component={Contact} />            
            <Route exact path="/bonus" component={Bonus} />            
            {/* Product */}
            <Route exact path="/products" component={ProductList} />
            <Route exact path="/products/:id" component={ProductDetail} />
            <Route exact path="/productshop/:id" component={ProductShop} />
            <Route exact path="/brandproducts" component={BrandProducts} />
            {/* Posts urls */}
            {/* <Route exact path="/posts" component={PostList} />
            <Route exact path="/posts/:id" component={PostDetail} />
            <Route exact path="/newpost" component={PostCreate} /> */}
            {/* User urls */}
            <Route exact path="/login" component={Login} />              
            <Route exact path="/signup" component={Registration} />              
            <Route exact path="/profile" component={Profile} />   
            {/* Staff urls */}
            <Route exact path="/stafflogin" component={StaffLogIn} />            
            <Route exact path="/staff" component={Staff} />          
            <Route exact path="/admin" component={Admin} />            
        </Switch>
    )    
}
export default BaseRouter;