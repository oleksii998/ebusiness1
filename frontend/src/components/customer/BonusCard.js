import {useParams} from "react-router-dom";
import {removeBonusCard} from "../../Rest";
import {sendForm} from "../../Common";
import {useState} from "react";
import {messages} from "../../Constants";

const BonusCard = (props) => {
    const params = useParams();
    const [state, setState] = useState(null);

    const onRemoveBonusCardHandler = () => {
        const restFunc = () => removeBonusCard(props.fetchedData[0].id);
        const respCallback = () => window.location.href = `/customers/${params.id}/bonus-cards`;
        const errCallback = (err) => setState(err.response?.data || messages.serverError);
        sendForm(restFunc, respCallback, errCallback);
    };

    return (
        <div>
            <h2>Bonus card</h2>
            <p><b>Number: </b> {props.fetchedData[0].number}</p>
            <p><b>Status: </b> {props.fetchedData[0].status}</p>
            <a href={`/bonus-cards/${props.fetchedData[0].id}/modify`}>Modify</a><br/>
            <input type="button" onClick={onRemoveBonusCardHandler} value="Remove"/>
            <p>{state}</p>
        </div>
    );
};

export default BonusCard;