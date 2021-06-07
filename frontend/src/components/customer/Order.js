import {useParams} from "react-router-dom";
import {addTransaction, removeOrder} from "../../Rest";
import {sendForm} from "../../Common";
import {useState} from "react";

const Order = (props) => {
    const params = useParams();
    const [state, setState] = useState(null);

    const onPayHandler = () => {
        const restFunc = () => addTransaction({orderId: params.orderId});
        const respCallback = () => setState("Registered transaction");
        const errCallback = (err) => setState(err.response?.data);
        sendForm(restFunc, respCallback, errCallback);
    };

    const onRemoveOrderHandler = () => {
        const restFunc = () => removeOrder(props.fetchedData[0].id);
        const respCallback = () => window.location.href = `/customers/${params.id}/orders`;
        const errCallback = (err) => setState(err.response?.data);
        sendForm(restFunc, respCallback, errCallback);
    };

    return (
        <div>
            <h2>Order</h2>
            <p><b>Id: </b> {props.fetchedData[0].id}</p>
            <p><b>Customer id: </b> {props.fetchedData[0].customerId}</p>
            <p><b>Promotion discount: </b> {props.fetchedData[0].promotionsDiscount}</p>
            <p><b>Voucher discount: </b> {props.fetchedData[0].voucherDiscount}</p>
            <p><b>Price: </b> {props.fetchedData[0].price}</p>
            <p><b>Status: </b> {props.fetchedData[0].status}</p>
            <a href={`/customers/${params.id}/orders/${props.fetchedData[0].id}/modify`}>Modify</a><br/>
            <input type="button" onClick={onPayHandler} value="Pay"/><br/>
            <input type="button" onClick={onRemoveOrderHandler} value="Remove"/>
            <p>{state}</p>
        </div>
    );
};

export default Order;