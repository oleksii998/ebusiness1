import {useState} from "react";
import {addVoucher, modifyVoucher} from "../../Rest";
import {getExistingData, onChangeHandler} from "../../Common";
import Form from "../general/Form";

const VoucherForm = (props) => {
    const existingData = getExistingData(props.fetchedData, 0);
    const calcMax = () => {
        if(existingData?.voucherType === 1) {
            return Number.MAX_VALUE;
        }
        return 1;
    };
    const calcStep = () => {
        return existingData?.voucherType === 1 ? 1 : .01;
    };
    const [state, setState] = useState({
        name: existingData?.name || "",
        voucherType: existingData?.voucherType || 0,
        discount: {value: existingData?.discount || 0, max: calcMax(), step: calcStep()},
    });
    const customOnChangeHandler = (currentState, name, value) => {
        if (name === "voucherType") {
            let max = 1;
            let step = .01;
            if (value === "1") {
                max = Number.MAX_VALUE;
                step = 1;
            }
            return {
                voucherType: value,
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
            name: state.name,
            type: state.voucherType,
            discount: state.discount.value
        }
    }
    const getFormContents = () => {
        const changeHandlerFunc = event => onChangeHandler(setState, event, customOnChangeHandler);
        return (
            <>
                Name<br/>
                <input name="name" type="field" value={state.name} onChange={changeHandlerFunc}/>
                <br/>
                Voucher type<br/>
                <select name="voucherType" defaultValue={state.voucherType} onChange={changeHandlerFunc}>
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

    return <Form existingId={existingData?.id}
                 formContents={getFormContents()}
                 getDataFunc={getData}
                 modifyFunc={modifyVoucher}
                 addFunc={addVoucher}/>
};

export default VoucherForm;