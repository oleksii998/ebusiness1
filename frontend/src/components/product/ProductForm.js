import {addProduct, modifyProduct} from "../../Rest";
import {getExistingData, onChangeHandler} from "../../Common";
import {useState} from "react";
import Form from "../general/Form";

const ProductForm = (props) => {
    const existingData = getExistingData(props.fetchedData, 1);
    const [state, setState] = useState({
        name: existingData?.product.name || "",
        description: existingData?.product.description || "",
        categoryId: existingData?.category.id || props.fetchedData[0][0]?.id,
        price: existingData?.product.price || 0,
        quantity: existingData?.product.quantity || 0
    });

    const getData = () => {
        return {
            name: state.name,
            description: state.description,
            categoryId: state.categoryId,
            price: state.price,
            quantity: state.quantity
        }
    }
    const getFormContents = () => {
        const changeHandlerFunc = event => onChangeHandler(setState, event);
        return (
            <>
                Name<br/>
                <input name="name" type="field" value={state.name} onChange={changeHandlerFunc}/><br/>
                Description<br/>
                <input name="description" type="field" value={state.description} onChange={changeHandlerFunc}/><br/>
                Category<br/>
                <select name="categoryId" onChange={changeHandlerFunc} defaultValue={state.categoryId}>
                    {props.fetchedData[0].map((entry, index) =>
                        <option key={index} value={entry.id}>{entry.name}</option>
                    )}
                </select>
                <br/>
                Price<br/>
                <input name="price" type="number" value={state.price} onChange={changeHandlerFunc}/><br/>
                Quantity<br/>
                <input name="quantity" type="number" value={state.quantity} onChange={changeHandlerFunc}/>
            </>
        );
    };

    return <Form existingId={existingData?.product.id}
                 formContents={getFormContents()}
                 getDataFunc={getData}
                 modifyFunc={modifyProduct}
                 addFunc={addProduct}/>
};

export default ProductForm;