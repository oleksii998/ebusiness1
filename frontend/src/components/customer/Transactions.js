import {useParams} from "react-router-dom";
import Table from "../general/Table";

const Transactions = (props) => {
    const header = ["Id", "Order id", "Final price", "Status"];
    const rows = props.fetchedData[0].map((transaction) => {
        return {
            id: transaction.id,
            columnValues: [transaction.id, transaction.orderId, transaction.finalPrice, transaction.status === 0 ? "Completed" : "Failed"]
        }
    });

    const params = useParams();
    return (
        <div className="content">
            <Table name={`customers/${params.id}/transactions`} header={header} rows={rows}/>
        </div>
    );
};

export default Transactions;