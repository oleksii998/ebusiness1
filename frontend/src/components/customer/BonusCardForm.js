import {useParams} from "react-router-dom";
import {addBonusCard, modifyBonusCard} from "../../Rest";
import {getExistingData, onChangeHandler} from "../../Common";
import {useState} from "react";
import Form from "../general/Form";

const BonusCardForm = (props) => {
    const params = useParams();
    const existingData = getExistingData(props.fetchedData, 0);
    const [state, setState] = useState({
        number: "",
        status: existingData?.status || "Active"
    });

    const getData = () => {
        return {
            customerId: params.id,
            number: state.number,
            status: state.status
        }
    }
    const getFormContents = () => {
        const changeHandlerFunc = event => onChangeHandler(setState, event);
        return (
            <>
                {!existingData && <>
                    Number<br/>
                    <input name="number" type="field" value={state.number} onChange={changeHandlerFunc}/><br/>
                    Status<br/>
                </>
                }
                <select name="status" defaultValue={state.status} onChange={changeHandlerFunc}>
                    <option>Active</option>
                    <option>Blocked</option>
                    <option>Closed</option>
                </select><br/>
            </>
        );
    };

    return <Form existingId={existingData?.id}
                 formContents={getFormContents()}
                 getDataFunc={getData}
                 modifyFunc={modifyBonusCard}
                 addFunc={addBonusCard}/>
};

export default BonusCardForm;