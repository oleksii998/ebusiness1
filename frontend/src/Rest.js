import axios from "axios";
import {getCsrfToken} from "./Common";

const serverUrl = "https://ebusiness-backend.azurewebsites.net";
export const authUrl = `${serverUrl}/authentication`;
const usersUri = "users";
const customersUri = "customers";
const productsUri = "products";
const cartEntriesUri = "cart/entries";
const bonusCardsUri = "bonus-cards";
const ordersUri = "orders";
const categoriesUri = "categories";
const vouchersUri = "vouchers";
const promotionsUri = "promotions";
const transactionsUri = "transactions";

axios.interceptors.request.use(
    function(config) {
        config.withCredentials = true;
        config.headers["Csrf-Token"] = getCsrfToken();
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

export const getUsers = (isCustomer) => {
    const uri = getUserUri(isCustomer);
    return axios.get(`${serverUrl}/${uri}`);
};

export const getUser = (userId, isCustomer) => {
    const uri = getUserUri(isCustomer);
    return axios.get(`${serverUrl}/${uri}/${userId}`);
};

export const removeUser = (userId, isCustomer) => {
    const uri = getUserUri(isCustomer);
    return axios.delete(`${serverUrl}/${uri}/remove/${userId}`);
};

export const modifyUser = (userId, userData, isCustomer) => {
    const uri = getUserUri(isCustomer);
    return axios.post(`${serverUrl}/${uri}/modify/${userId}`, userData);
};

export const addUser = (userData, isCustomer) => {
    const uri = getUserUri(isCustomer);
    return axios.post(`${serverUrl}/${uri}/add`, userData);
};

export const getUserUri = (isCustomer) => {
    return isCustomer ? customersUri : usersUri;
};

export const getCustomerCart = (customerId) => {
    return axios.get(`${serverUrl}/${customersUri}/${customerId}/cart`);
};

export const getProducts = () => {
    return axios.get(`${serverUrl}/${productsUri}`);
};

export const addCartEntry = (cartEntryData) => {
    return axios.post(`${serverUrl}/${cartEntriesUri}/add`, cartEntryData);
};

export const modifyCartEntry = (cartEntryId, cartEntryData) => {
    return axios.post(`${serverUrl}/${cartEntriesUri}/modify/${cartEntryId}`, cartEntryData);
};

export const removeCartEntry = (cartEntryId) => {
    return axios.delete(`${serverUrl}/${cartEntriesUri}/remove/${cartEntryId}`);
};

export const getCartEntry = (cartEntryId) => {
    return axios.get(`${serverUrl}/${cartEntriesUri}/${cartEntryId}`);
};

export const getBonusCards = () => {
    return axios.get(`${serverUrl}/${bonusCardsUri}`);
};

export const getBonusCard = (bonusCardId) => {
    return axios.get(`${serverUrl}/${bonusCardsUri}/${bonusCardId}`);
};

export const removeBonusCard = (bonusCardId) => {
    return axios.delete(`${serverUrl}/${bonusCardsUri}/remove/${bonusCardId}`);
};

export const addBonusCard = (bonusCardData) => {
    return axios.post(`${serverUrl}/${bonusCardsUri}/add`, bonusCardData);
};

export const modifyBonusCard = (bonusCardId, bonusCardData) => {
    return axios.post(`${serverUrl}/${bonusCardsUri}/modify/${bonusCardId}`, bonusCardData);
};

export const getOrders = (customerId) => {
    return axios.get(`${serverUrl}/${customersUri}/${customerId}/orders`);
};

export const getOrder = (orderId) => {
    return axios.get(`${serverUrl}/${ordersUri}/${orderId}`);
};

export const removeOrder = (orderId) => {
    return axios.delete(`${serverUrl}/${ordersUri}/remove/${orderId}`);
};

export const addOrder = (orderData) => {
    return axios.post(`${serverUrl}/${ordersUri}/add`, orderData);
};

export const modifyOrder = (orderId, orderData) => {
    return axios.post(`${serverUrl}/${ordersUri}/modify/${orderId}`, orderData);
};

export const getCategories = () => {
    return axios.get(`${serverUrl}/${categoriesUri}`);
};

export const getCategory = (categoryId) => {
    return axios.get(`${serverUrl}/${categoriesUri}/${categoryId}`);
};

export const removeCategory = (categoryId) => {
    return axios.delete(`${serverUrl}/${categoriesUri}/remove/${categoryId}`);
};

export const addCategory = (orderData) => {
    return axios.post(`${serverUrl}/${categoriesUri}/add`, orderData);
};

export const modifyCategory = (categoryId, orderData) => {
    return axios.post(`${serverUrl}/${categoriesUri}/modify/${categoryId}`, orderData);
};

export const getProduct = (productId) => {
    return axios.get(`${serverUrl}/${productsUri}/${productId}`);
};

export const removeProduct = (productId) => {
    return axios.delete(`${serverUrl}/${productsUri}/remove/${productId}`);
};

export const addProduct = (orderData) => {
    return axios.post(`${serverUrl}/${productsUri}/add`, orderData);
};

export const modifyProduct = (productId, orderData) => {
    return axios.post(`${serverUrl}/${productsUri}/modify/${productId}`, orderData);
};

export const getVouchers = () => {
    return axios.get(`${serverUrl}/${vouchersUri}`);
};

export const getVoucher = (voucherId) => {
    return axios.get(`${serverUrl}/${vouchersUri}/${voucherId}`);
};

export const removeVoucher = (voucherId) => {
    return axios.delete(`${serverUrl}/${vouchersUri}/remove/${voucherId}`);
};

export const addVoucher = (orderData) => {
    return axios.post(`${serverUrl}/${vouchersUri}/add`, orderData);
};

export const modifyVoucher = (voucherId, orderData) => {
    return axios.post(`${serverUrl}/${vouchersUri}/modify/${voucherId}`, orderData);
};

export const getPromotions = () => {
    return axios.get(`${serverUrl}/${promotionsUri}`);
};

export const getPromotion = (promotionId) => {
    return axios.get(`${serverUrl}/${promotionsUri}/${promotionId}`);
};

export const removePromotion = (promotionId) => {
    return axios.delete(`${serverUrl}/${promotionsUri}/remove/${promotionId}`);
};

export const addPromotion = (orderData) => {
    return axios.post(`${serverUrl}/${promotionsUri}/add`, orderData);
};

export const modifyPromotion = (promotionId, orderData) => {
    return axios.post(`${serverUrl}/${promotionsUri}/modify/${promotionId}`, orderData);
};

export const getTransactions = () => {
    return axios.get(`${serverUrl}/${transactionsUri}`);
};

export const getTransaction = (transactionId) => {
    return axios.get(`${serverUrl}/${transactionsUri}/${transactionId}`);
};

export const addTransaction = (transactionData) => {
    return axios.post(`${serverUrl}/${transactionsUri}/add`, transactionData);
};

export const logOut = () => {
    return axios.post(`${serverUrl}/authentication/log-out`);
};