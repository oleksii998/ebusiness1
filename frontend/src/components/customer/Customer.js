import User from "../user/User";

const Customer = (props) => {
    return (
        <>
            <User fetchedData={props.fetchedData} isCustomer={true}/>
            <hr/>
            <a href={`/customers/${props.fetchedData[0].id}/cart`}>Cart</a><br/>
            <a href={`/customers/${props.fetchedData[0].id}/bonus-cards`}>Bonus Cards</a><br/>
            <a href={`/customers/${props.fetchedData[0].id}/orders`}>Orders</a><br/>
            <a href={`/customers/${props.fetchedData[0].id}/transactions`}>Transactions</a>
        </>
    );
};

export default Customer;