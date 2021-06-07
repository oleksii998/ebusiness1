import {useState} from "react";
import {getExistingData, onChangeHandler} from "../../Common";
import {addUser, modifyUser} from "../../Rest";
import Form from "../general/Form";

const UserForm = (props) => {
    const existingData = getExistingData(props.fetchedData, 0);
    const [state, setState] = useState({
        email: existingData?.email || "",
        firstName: existingData?.firstName || "",
        lastName: existingData?.lastName || "",
        password: existingData?.password || ""
    });

    const getData = () => {
        return {
            email: state.email,
            firstName: state.firstName,
            lastName: state.lastName,
            password: state.password,
        }
    }

    const getFormContents = () => {
        const changeHandlerFunc = event => onChangeHandler(setState, event);
        return (
            <>
                Email<br/>
                <input name="email" type="field" value={state.email} onChange={changeHandlerFunc}/><br/>
                First name<br/>
                <input name="firstName" type="field" value={state.firstName} onChange={changeHandlerFunc}/><br/>
                Last name<br/>
                <input name="lastName" type="field" value={state.lastName} onChange={changeHandlerFunc}/><br/>
                {!existingData &&
                <>
                    Password
                    <br/>
                    <input name="password" type="password" value={state.password} onChange={changeHandlerFunc}/>
                    <br/>
                </>}
            </>
        );
    };

    return <Form existingId={existingData?.id}
                 formContents={getFormContents()}
                 getDataFunc={getData}
                 modifyFunc={(id, data) => modifyUser(id, data, props.isCustomer)}
                 addFunc={(data) => addUser(data, props.isCustomer)}/>
}

export default UserForm;