import {useState} from "react";
import {useParams} from "react-router-dom";
import {addOrder, modifyOrder} from "../../Rest";
import {getExistingData, onChangeHandler} from "../../Common";
import Form from "../general/Form";

const OrderForm = (props) => {
    const existingData = getExistingData(props.fetchedData, 1);
    const [state, setState] = useState({
        voucherId: existingData?.voucherId || "No",
        status: existingData?.status || "Placed",
        serverResponse: null
    });

    const params = useParams();
    const getData = () => {
        const data = {};
        if (state.voucherId !== "No") {
            data.voucherId = state.voucherId;
        }
        if (existingData) {
            data.status = state.status;
        } else {
            data.customerId = params.id;
        }
        return data;
    }
    const getFormContents = () => {
        const changeHandlerFunc = event => onChangeHandler(setState, event);
        return (
            <>
                Voucher<br/>
                <select name="voucherId" onChange={changeHandlerFunc} defaultValue={state.voucherId}>
                    <option>No</option>
                    {props.fetchedData[0].map((entry, index) =>
                        <option key={index} value={entry.id}>{entry.name}</option>
                    )}
                </select>
                <br/>
                {existingData && <select name="status" onChange={changeHandlerFunc} defaultValue={state.status}>
                    <option>Placed</option>
                    <option>Being modified</option>
                    <option>Delivered</option>
                </select>}
                </>
        );
    };

    return <Form existingId={existingData?.id}
                 formContents={getFormContents()}
                 getDataFunc={getData}
                 modifyFunc={modifyOrder}
                 addFunc={addOrder}/>
};

export default OrderForm;