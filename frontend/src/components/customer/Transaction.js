const Transaction = (props) => {
    return (
        <div>
            <h2>Transaction</h2>
            <p><b>Id: </b> {props.fetchedData[0].id}</p>
            <p><b>Order id: </b> {props.fetchedData[0].orderId}</p>
            <p><b>Final price: </b> {props.fetchedData[0].finalPrice}</p>
            <p><b>Status: </b> {props.fetchedData[0].status === 0 ? "Successful" : "Faulty"}</p>
        </div>
    );
};

export default Transaction;