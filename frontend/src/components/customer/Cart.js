import Table from "../general/Table";
import {useParams} from "react-router-dom";
import {useState, useContext} from "react";
import {PromotionContext} from "../Reducer";
import {calculatePrice} from "../../Common";

const Cart = (props) => {
    const [promotionState,] = useContext(PromotionContext);
    const [state, ] = useState(null);
    const header = ["Name", "Description", "Category", "Price per one", "Quantity"];
    const rows = props.fetchedData[0].map((cartEntry) => {
        const price = calculatePrice(promotionState.promotions, cartEntry.product);
        return {
            id: cartEntry.id,
            columnValues: [cartEntry.product.name, cartEntry.product.description, cartEntry.categoryName, price, cartEntry.quantity]
        }
    });
    const params = useParams();
    return (
        <div className="content">
            <Table name={`customers/${params.id}/cart`} header={header} rows={rows}/>
            <a href={`/customers/${params.id}/cart/add`}>Add product</a><br/>
            <a href={`/customers/${params.id}/orders/add`}>Place order</a><br/>
            <p>{state}</p>
        </div>
    );
};

export default Cart;