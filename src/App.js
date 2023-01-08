import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home';
// import About from './pages/About';
import Navigation from './components/Navigation';
import Products from './pages/Products';
import Cart from './pages/Cart';
import SingleProduct from './pages/SingleProduct';
import { CartContext } from './CartContext';
import { useEffect } from 'react';
import { useState } from 'react';

const App = () => {

    const [ cart,setcart] = useState({})
    useEffect(()=>{
        const cart= window.localStorage.getItem('cart')
        console.log("cart_here",JSON.parse(cart))
        setcart(JSON.parse(cart))
    },[])
    useEffect(()=>{
        window.localStorage.setItem('cart',JSON.stringify(cart));
    },[cart]);

    return (<>

        <Router>
            <CartContext.Provider value={{cart,setcart}}>
                <Navigation></Navigation>

                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    {/* <Route path="/about" component={About}></Route> */}
                    <Route path="/products" exact component={Products}></Route>
                    <Route path="/products/:_id" exact component={SingleProduct}></Route>
                    <Route path="/cart" component={Cart}></Route>



                </Switch>
            </CartContext.Provider>
        </Router>
    </>)
}

export default App;