import {useState} from "react";
import {addPromotion, modifyPromotion} from "../../Rest";
import {getExistingData, onChangeHandler} from "../../Common";
import Form from "../general/Form";

const PromotionForm = (props) => {
    const existingData = getExistingData(props.fetchedData, 1);
    const calcMax = () => {
        if (existingData?.promotion.promotionType === 1) {
            return props.fetchedData[0].find(entry => entry.product.id === Number.parseInt(existingData?.product.id)).product.price;
        }
        return 1;
    };
    const calcStep = () => {
        return existingData?.promotion.promotionType === 1 ? 1 : .01;
    };
    const [state, setState] = useState({
        productId: existingData?.product.id || props.fetchedData[0][0]?.product.id,
        promotionType: existingData?.promotion.promotionType || 0,
        discount: {value: existingData?.promotion.discount || 0, max: calcMax(), step: calcStep()}
    });
    const customOnChangeHandler = (currentState, name, value) => {
        if (name === "promotionType") {
            let max = 1;
            let step = .01;
            if (value === "1") {
                max = props.fetchedData[0].find(entry => entry.product.id === Number.parseInt(state.productId)).product.price;
                step = 1;
            }
            return {
                promotionType: value,
                discount: {
                    value: 0,
                    max,
                    step
                }
            }
        } else if (name === "discount") {
            return {
                discount: {
                    ...currentState.discount,
                    value
                }
            }
        }
        return {
            [name]: value
        }
    };

    const getData = () => {
        return {
            productId: state.productId,
            type: state.promotionType,
            discount: state.discount.value
        }
    }
    const getFormContents = () => {
        const changeHandlerFunc = event => onChangeHandler(setState, event, customOnChangeHandler);
        return (
            <>
                Product<br/>
                <select name="productId" defaultValue={state.productId} onChange={changeHandlerFunc}>
                    {props.fetchedData[0].map((entry, index) => <option key={index} value={entry.product.id}>
                        {entry.product.name}
                    </option>)}
                </select>
                <br/>
                Promotion type<br/>
                <select name="promotionType" defaultValue={state.promotionType} onChange={changeHandlerFunc}>
                    <option value="0">Percentage</option>
                    <option value="1">Constant</option>
                </select>
                <br/>
                Discount<br/>
                <input name="discount" type="number" min="0" max={state.discount.max} step={state.discount.step}
                       value={state.discount.value} onChange={changeHandlerFunc}/>
            </>
        );
    };

    return <Form existingId={existingData?.promotion.id}
                 formContents={getFormContents()}
                 getDataFunc={getData}
                 modifyFunc={modifyPromotion}
                 addFunc={addPromotion}/>
};

export default PromotionForm;