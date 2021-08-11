import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Login from './account/Login';
import Profile from './account/Profile';
import PostCreate from './posts/PostCreate';
import ProductList from './product/ProductList';
import ProductDetail from './product/ProductDetail';
import About from './containers/About';
import Contact from './containers/Contact';
import ProductShop from './product/ProductShop';
import BrandProducts from './product/BrandProducts';
import PostList from './posts/PostList';
import PostDetail from './posts/PostDetail';
import Staff from './account/Staff';

function BaseRouter () {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />            
            <Route exact path="/contact" component={Contact} />            
            {/* Product */}
            <Route exact path="/products" component={ProductList} />
            <Route exact path="/products/:id" component={ProductDetail} />
            <Route exact path="/productshop/:id" component={ProductShop} />
            <Route exact path="/brandproducts" component={BrandProducts} />
            {/* Posts urls */}
            <Route exact path="/posts" component={PostList} />
            <Route exact path="/posts/:id" component={PostDetail} />
            <Route exact path="/newpost" component={PostCreate} />
            {/* User urls */}
            <Route exact path="/login" component={Login} />              
            <Route exact path="/profile" component={Profile} />               
            <Route exact path="/staff" component={Staff} />            
        </Switch>
    )    
}
export default BaseRouter;