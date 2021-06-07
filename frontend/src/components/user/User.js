import {useState} from "react";
import {sendForm} from "../../Common";
import {getUserUri, removeUser} from "../../Rest";

const User = (props) => {
    const [state, setState] = useState(null);

    const onRemoveUserHandler = () => {
        const restFunc = () => removeUser(props.fetchedData[0].id, props.isCustomer);
        const respCallback = () => window.location.href = `/${getUserUri(props.isCustomer)}`;
        const errCallback = (err) => setState(err.response?.data);
        sendForm(restFunc, respCallback, errCallback);
    };

    return (
        <div>
            <h2>{props.isCustomer ? "Customer" : "User"}</h2>
            <p><b>Email: </b> {props.fetchedData[0].email}</p>
            <p><b>First name: </b> {props.fetchedData[0].firstName}</p>
            <p><b>Last name: </b> {props.fetchedData[0].lastName}</p>
            <a href={`/${getUserUri(props.isCustomer)}/${props.fetchedData[0].id}/modify`}>Modify</a><br/>
            <input type="button" onClick={onRemoveUserHandler} value="Remove"/>
            <p>{state}</p>
        </div>
    );
};

export default User;