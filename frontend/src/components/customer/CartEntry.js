import {useState, useContext} from "react";
import {removeCartEntry} from "../../Rest";
import {calculatePrice, sendForm} from "../../Common";
import {useParams} from "react-router-dom";
import {PromotionContext} from "../Reducer";

const CartEntry = (props) => {
    const params = useParams();
    const [promotionState, ] = useContext(PromotionContext)
    const [state, setState] = useState(null);

    const onRemoveCartEntryHandler = () => {
        const restFunc = () => removeCartEntry(props.fetchedData[0].id);
        const respCallback = () => window.location.href = `/customers/${params.id}/cart`;
        const errCallback = (err) => setState(err.response?.data);
        sendForm(restFunc, respCallback, errCallback);
    };

    const price = calculatePrice(promotionState.promotions, props.fetchedData[0].product);
    return (
        <div>
            <h2>Added to cart product</h2>
            <p><b>Name: </b> {props.fetchedData[0].product.name}</p>
            <p><b>Description: </b> {props.fetchedData[0].product.description}</p>
            <p><b>Category: </b> {props.fetchedData[0].categoryName}</p>
            <p><b>Price: </b> {price}</p>
            <p><b>Quantity: </b> {props.fetchedData[0].quantity}</p>
            <a href={`/customers/${params.id}/cart/${props.fetchedData[0].id}/modify`}>Modify</a><br/>
            <input type="button" onClick={onRemoveCartEntryHandler} value="Remove"/>
            <p>{state}</p>
        </div>
    );
};

export default CartEntry;