import {useState} from "react";
import {removePromotion} from "../../Rest";
import {sendForm} from "../../Common";

const Promotion = (props) => {
    const [state, setState] = useState(null);

    const onRemovePromotionHandler = () => {
        const restFunc = () => removePromotion(props.fetchedData[0].promotion.id);
        const respCallback = () => window.location.href = "/promotions";
        const errCallback = (err) => setState(err.response?.data);
        sendForm(restFunc, respCallback, errCallback);
    };

    return (
        <div>
            <h2>Promotion</h2>
            <p><b>Id: </b> {props.fetchedData[0].promotion.id}</p>
            <p><b>Product: </b> {props.fetchedData[0].product.name}</p>
            <p><b>Type: </b> {props.fetchedData[0].promotion.promotionType === 0 ? "Percentage" : "Constant"}</p>
            <p><b>Discount: </b> {props.fetchedData[0].promotion.discount}</p>
            <a href={`/promotions/${props.fetchedData[0].promotion.id}/modify`}>Modify</a><br/>
            <input type="button" onClick={onRemovePromotionHandler} value="Remove"/>
            <p>{state}</p>
        </div>
    );
};

export default Promotion;