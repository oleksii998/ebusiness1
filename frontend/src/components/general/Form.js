import {useState} from "react";
import {messages} from "../../Constants";
import {sendForm} from "../../Common";

const Form = (props) => {
    const [state, setState] = useState(null);

    const submitForm = (event) => {
        event.preventDefault();
        setState("Please, wait");
        const data = props.getDataFunc();
        const restFunc = () => props.existingId ? props.modifyFunc(props.existingId, data) : props.addFunc(data);
        const respCallback = () => setState("Operation completed successfully");
        const errCallback = (err) => setState(err.response?.data?.message || messages.serverError);
        sendForm(restFunc, respCallback, errCallback);
    };

    return (
        <form onSubmit={submitForm}>
            {props.formContents}
            <br/>
            <input type="submit" value={props.existingId ? "Modify" : "Add"}/>
            <p>{state}</p>
        </form>
    );
};

export default Form;