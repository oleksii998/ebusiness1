import {useParams} from "react-router-dom";
import Table from "../general/Table";

const BonusCards = (props) => {
    const header = ["Number", "Status"];
    const rows = props.fetchedData[0].map((bonusCard) => {
        return {
            id: bonusCard.id,
            columnValues: [bonusCard.number, bonusCard.status]
        }
    });

    const params = useParams();
    return (
        <div className="content">
            <Table name={`customers/${params.id}/bonus-cards`} header={header} rows={rows}/>
            <a href={`/customers/${params.id}/bonus-cards/add`}>Add</a><br/>
        </div>
    );
}

export default BonusCards;