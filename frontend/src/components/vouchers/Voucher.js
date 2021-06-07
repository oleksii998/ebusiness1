import {useState} from "react";
import {getUserUri, removeUser, removeVoucher} from "../../Rest";
import {sendForm} from "../../Common";

const Voucher = (props) => {
    const [state, setState] = useState(null);

    const onRemoveVoucherHandler = () => {
        const restFunc = () => removeVoucher(props.fetchedData[0].id);
        const respCallback = () => window.location.href = "/vouchers";
        const errCallback = (err) => setState(err.response?.data);
        sendForm(restFunc, respCallback, errCallback);
    };

    return (
        <div>
            <h2>Voucher</h2>
            <p><b>Name: </b> {props.fetchedData[0].name}</p>
            <p><b>Type: </b> {props.fetchedData[0].voucherType === 0 ? "Percentage" : "Constant"}</p>
            <p><b>Discount: </b> {props.fetchedData[0].discount}</p>
            <a href={`/vouchers/${props.fetchedData[0].id}/modify`}>Modify</a><br/>
            <input type="button" onClick={onRemoveVoucherHandler} value="Remove"/>
            <p>{state}</p>
        </div>
    );
};

export default Voucher;