import {addCartEntry, modifyCartEntry} from "../../Rest";
import {getExistingData, onChangeHandler} from "../../Common";
import {useState} from "react";
import {useParams} from "react-router-dom";
import Form from "../general/Form";

const CartForm = (props) => {
    const existingData = getExistingData(props.fetchedData, 1);
    const [state, setState] = useState({
        productId: existingData?.product.id || props.fetchedData[0][0]?.product.id,
        quantity: existingData?.quantity || "",
        serverResponse: null
    });

    const params = useParams();
    const getData = () => {
        return {
            customerId: params.id,
            productId: state.productId,
            quantity: state.quantity
        }
    }
    const getFormContents = () => {
        const changeHandlerFunc = event => onChangeHandler(setState, event);
        return (
            <>
                {!existingData &&
                <>
                    Product<br/>
                    <select name="productId" onChange={changeHandlerFunc} defaultValue={state.productId}>
                        {props.fetchedData[0].map((entry, index) =>
                            <option key={index} value={entry.product.id}>{entry.product.name}</option>
                        )}
                    </select>
                </>}
                <br/>
                Quantity<br/>
                <input name="quantity" type="number" value={state.quantity} onChange={changeHandlerFunc}/>
            </>
        );
    };

    return <Form existingId={existingData?.id}
                 formContents={getFormContents()}
                 getDataFunc={getData}
                 modifyFunc={modifyCartEntry}
                 addFunc={addCartEntry}/>
};

export default CartForm;