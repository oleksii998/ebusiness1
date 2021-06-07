import {logOut} from "../Rest";

const Home = () => {
    return (
        <ul>
            <li><a href="/users">Users</a></li>
            <li><a href="/customers">Customers</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/categories">Categories</a></li>
            <li><a href="/promotions">Promotions</a></li>
            <li><a href="/vouchers">Vouchers</a></li>
            <li><a href="/log-in">Log in</a></li>
            <li><input type="button" onClick={logOut} value="Log out"/></li>
        </ul>
    );
};

export default Home;