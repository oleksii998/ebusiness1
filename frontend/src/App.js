import './App.css';
import {Switch, Route} from "react-router-dom";
import Users from "./components/user/Users";
import Home from "./components/Home";
import ServerData from "./components/general/ServerData";
import {
    getBonusCard,
    getBonusCards,
    getCartEntry, getCategories, getCategory,
    getCustomerCart, getOrder,
    getOrders, getProduct,
    getProducts, getPromotion, getPromotions, getTransaction, getTransactions,
    getUser,
    getUsers, getVoucher, getVouchers
} from "./Rest";
import User from "./components/user/User";
import UserForm from "./components/user/UserForm";
import Customer from "./components/customer/Customer";
import Cart from "./components/customer/Cart";
import CartForm from "./components/customer/CartForm";
import CartEntry from "./components/customer/CartEntry";
import BonusCards from "./components/customer/BonusCards";
import BonusCard from "./components/customer/BonusCard";
import BonusCardForm from "./components/customer/BonusCardForm";
import Order from "./components/customer/Order";
import OrderForm from "./components/customer/OrderForm";
import Orders from "./components/customer/Orders";
import Products from "./components/product/Products";
import ProductForm from "./components/product/ProductForm";
import Product from "./components/product/Product";
import Categories from "./components/category/Categories";
import CategoryForm from "./components/category/CategoryForm";
import Category from "./components/category/Category";
import Transactions from "./components/customer/Transactions";
import Transaction from "./components/customer/Transaction";
import Vouchers from "./components/vouchers/Vouchers";
import VoucherForm from "./components/vouchers/VoucherForm";
import Voucher from "./components/vouchers/Voucher";
import PromotionForm from "./components/promotions/PromotionForm";
import Promotion from "./components/promotions/Promotion";
import Promotions from "./components/promotions/Promotions";
import {useReducer, useEffect} from "react";
import {initialState, Reducer, PromotionContext} from "./components/Reducer";
import AuthenticationHandler from "./components/user/AuthenticationHandler";
import PostAuth from "./components/user/PostAuth";

function App() {
    const [promotionState, dispatchPromotion] = useReducer(Reducer, initialState);

    useEffect(() => {
        getPromotions()
            .then(response => dispatchPromotion(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <PromotionContext.Provider value={[promotionState, dispatchPromotion]}>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/users">
                        <ServerData fetchingFuncs={[() => getUsers(false)]} wrapper={Users}/>
                    </Route>
                    <Route exact path="/users/add">
                        <UserForm/>
                    </Route>
                    <Route exact path="/users/:id/modify">
                        <ServerData fetchingFuncs={[(params) => getUser(params.id, false)]} wrapper={UserForm}/>
                    </Route>
                    <Route exact path="/users/:id">
                        <ServerData fetchingFuncs={[(params) => getUser(params.id, false)]} wrapper={User}/>
                    </Route>
                    <Route exact path="/customers">
                        <ServerData fetchingFuncs={[() => getUsers(true)]} wrapper={Users}
                                    wrapperProps={{isCustomer: true}}/>
                    </Route>
                    <Route exact path="/customers/add">
                        <UserForm isCustomer={true}/>
                    </Route>
                    <Route exact path="/customers/:id">
                        <ServerData fetchingFuncs={[(params) => getUser(params.id, true)]} wrapper={Customer}
                                    wrapperProps={{isCustomer: true}}/>
                    </Route>
                    <Route exact path="/customers/:id/modify">
                        <ServerData fetchingFuncs={[(params) => getUser(params.id, true)]} wrapper={UserForm}
                                    wrapperProps={{isCustomer: true}}/>
                    </Route>
                    <Route exact path="/customers/:id/cart">
                        <ServerData fetchingFuncs={[(params) => getCustomerCart(params.id)]} wrapper={Cart}/>
                    </Route>
                    <Route exact path="/customers/:id/cart/add">
                        <ServerData fetchingFuncs={[getProducts]} wrapper={CartForm}/>
                    </Route>
                    <Route exact path="/customers/:id/cart/:entryId/modify">
                        <ServerData fetchingFuncs={[getProducts, (params) => getCartEntry(params.entryId)]}
                                    wrapper={CartForm}/>
                    </Route>
                    <Route exact path="/customers/:id/cart/:entryId">
                        <ServerData fetchingFuncs={[(params) => getCartEntry(params.entryId)]} wrapper={CartEntry}/>
                    </Route>
                    <Route exact path="/customers/:id/bonus-cards">
                        <ServerData fetchingFuncs={[getBonusCards]} wrapper={BonusCards}/>
                    </Route>
                    <Route exact path="/customers/:id/bonus-cards/add">
                        <BonusCardForm/>
                    </Route>
                    <Route exact path="/customers/:id/bonus-cards/:cardId">
                        <ServerData fetchingFuncs={[(params) => getBonusCard(params.cardId)]} wrapper={BonusCard}/>
                    </Route>
                    <Route exact path="/bonus-cards/:id">
                        <ServerData fetchingFuncs={[(params) => getBonusCard(params.id)]} wrapper={BonusCard}/>
                    </Route>
                    <Route exact path="/bonus-cards/:id/modify">
                        <ServerData fetchingFuncs={[(params) => getBonusCard(params.id)]} wrapper={BonusCardForm}/>
                    </Route>
                    <Route exact path="/customers/:id/bonus-cards">
                        <ServerData fetchingFuncs={[getBonusCards]} wrapper={BonusCards}/>
                    </Route>
                    <Route exact path="/customers/:id/orders">
                        <ServerData fetchingFuncs={[(params) => getOrders(params.id)]} wrapper={Orders}/>
                    </Route>
                    <Route exact path="/customers/:id/orders/add">
                        <ServerData fetchingFuncs={[getVouchers]} wrapper={OrderForm}/>
                    </Route>
                    <Route exact path="/customers/:id/orders/:orderId">
                        <ServerData fetchingFuncs={[(params) => getOrder(params.orderId)]} wrapper={Order}/>
                    </Route>
                    <Route exact path="/customers/:id/orders/:orderId/modify">
                        <ServerData fetchingFuncs={[getVouchers, (params) => getOrder(params.orderId)]}
                                    wrapper={OrderForm}/>
                    </Route>
                    <Route exact path="/products/add">
                        <ServerData fetchingFuncs={[getCategories]} wrapper={ProductForm}/>
                    </Route>

                    <Route exact path="/products">
                        <ServerData fetchingFuncs={[getProducts]} wrapper={Products}/>
                    </Route>
                    <Route exact path="/products/:id">
                        <ServerData fetchingFuncs={[(params) => getProduct(params.id)]} wrapper={Product}/>
                    </Route>
                    <Route exact path="/products/:id/modify">
                        <ServerData fetchingFuncs={[getCategories, (params) => getProduct(params.id)]}
                                    wrapper={ProductForm}/>
                    </Route>
                    <Route exact path="/categories">
                        <ServerData fetchingFuncs={[getCategories]} wrapper={Categories}/>
                    </Route>
                    <Route exact path="/categories/add">
                        <CategoryForm/>
                    </Route>
                    <Route exact path="/categories/:id">
                        <ServerData fetchingFuncs={[(params) => getCategory(params.id)]} wrapper={Category}/>
                    </Route>
                    <Route exact path="/categories/:id/modify">
                        <ServerData fetchingFuncs={[(params) => getCategory(params.id)]} wrapper={CategoryForm}/>
                    </Route>
                    <Route exact path="/vouchers">
                        <ServerData fetchingFuncs={[getVouchers]} wrapper={Vouchers}/>
                    </Route>
                    <Route exact path="/vouchers/add">
                        <VoucherForm/>
                    </Route>
                    <Route exact path="/vouchers/:id">
                        <ServerData fetchingFuncs={[(params) => getVoucher(params.id)]} wrapper={Voucher}/>
                    </Route>
                    <Route exact path="/vouchers/:id/modify">
                        <ServerData fetchingFuncs={[(params) => getVoucher(params.id)]} wrapper={VoucherForm}/>
                    </Route>
                    <Route exact path="/customers/:id/transactions">
                        <ServerData fetchingFuncs={[getTransactions]} wrapper={Transactions}/>
                    </Route>
                    <Route exact path="/customers/:id/transactions/:transactionId">
                        <ServerData fetchingFuncs={[(params) => getTransaction(params.transactionId)]}
                                    wrapper={Transaction}/>
                    </Route>
                    <Route exact path="/promotions">
                        <ServerData fetchingFuncs={[getPromotions]} wrapper={Promotions}/>
                    </Route>
                    <Route exact path="/promotions/add">
                        <ServerData fetchingFuncs={[getProducts]} wrapper={PromotionForm}/>
                    </Route>
                    <Route exact path="/promotions/:id">
                        <ServerData fetchingFuncs={[(params) => getPromotion(params.id)]} wrapper={Promotion}/>
                    </Route>
                    <Route exact path="/promotions/:id/modify">
                        <ServerData fetchingFuncs={[getProducts, (params) => getPromotion(params.id)]}
                                    wrapper={PromotionForm}/>
                    </Route>
                    <Route exact path="/log-in">
                        <AuthenticationHandler/>
                    </Route>
                    <Route exact path="/post-auth">
                        <PostAuth/>
                    </Route>
                </Switch>
            </div>
        </PromotionContext.Provider>
    );
}

export default App;