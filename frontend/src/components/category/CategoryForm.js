import {useState} from "react";
import {addCategory, modifyCategory} from "../../Rest";
import {getExistingData, onChangeHandler} from "../../Common";
import Form from "../general/Form";

const CategoryForm = (props) => {
    const existingData = getExistingData(props.fetchedData, 0);
    const [state, setState] = useState({
        name: existingData?.name || "",
        description: existingData?.description || ""
    });

    const getData = () => {
        return {
            name: state.name,
            description: state.description
        }
    }
    const getFormContents = () => {
        const changeHandlerFunc = event => onChangeHandler(setState, event);
        return (
            <>
                Name<br/>
                <input name="name" type="field" value={state.name} onChange={changeHandlerFunc}/>
                <br/>
                Description<br/>
                <input name="description" type="field" value={state.description} onChange={changeHandlerFunc}/>
            </>
        );
    };

    return <Form existingId={existingData?.id}
                 formContents={getFormContents()}
                 getDataFunc={getData}
                 modifyFunc={modifyCategory}
                 addFunc={addCategory}/>
}

export default CategoryForm;