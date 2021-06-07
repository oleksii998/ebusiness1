import Table from "../general/Table";
import {useContext} from "react";
import {PromotionContext} from "../Reducer";
import {calculatePrice} from "../../Common";

const Products = (props) => {
    const [promotionState, ] = useContext(PromotionContext);

    const header = ["Name", "Description", "Price", "Category"];
    const rows = props.fetchedData[0].map((cartEntry) => {
        const price = calculatePrice(promotionState.promotions, cartEntry.product);
        return {
            id: cartEntry.product.id,
            columnValues: [cartEntry.product.name, cartEntry.product.description, price, cartEntry.category.name]
        }
    });

    return (
        <div className="content">
            <Table name={`products`} header={header} rows={rows}/>
            <a href={`/products/add`}>Add</a><br/>
        </div>
    );
};

export default Products;