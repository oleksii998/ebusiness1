import {removeProduct} from "../../Rest";
import {calculatePrice, sendForm} from "../../Common";
import {useContext, useState} from "react";
import {PromotionContext} from "../Reducer";

const Product = (props) => {
    const [promotionState,] = useContext(PromotionContext);
    const [state, setState] = useState(null);

    const price = calculatePrice(promotionState.promotions, props.fetchedData[0].product);

    const onRemoveProductHandler = () => {
        const restFunc = () => removeProduct(props.fetchedData[0].product.id);
        const respCallback = () => {
            window.location.href = `/products`;
        };
        const errCallback = (err) => setState(err.response?.data);
        sendForm(restFunc, respCallback, errCallback);
    };

    return (
        <div>
            <h2>Product</h2>
            <p><b>Name: </b> {props.fetchedData[0].product.name}</p>
            <p><b>Description: </b> {props.fetchedData[0].product.description}</p>
            <p><b>Category: </b> {props.fetchedData[0].category.name}</p>
            <p><b>Price: </b> {price}</p>
            <a href={`/products/${props.fetchedData[0].product.id}/modify`}>Modify</a><br/>
            <input type="button" onClick={onRemoveProductHandler} value="Remove"/>
            <p>{state}</p>
        </div>
    );
};

export default Product;