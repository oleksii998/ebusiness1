import {useParams} from "react-router-dom";
import Table from "../general/Table";

const Orders = (props) => {
    const header = ["Id", "Voucher discount", "Promotions discount", "Price", "Status"];
    const rows = props.fetchedData[0].map((cartEntry) => {
        return {
            id: cartEntry.id,
            columnValues: [cartEntry.id, cartEntry.voucherDiscount, cartEntry.promotionsDiscount, cartEntry.price, cartEntry.status]
        }
    });

    const params = useParams();
    return (
        <div className="content">
            <Table name={`customers/${params.id}/orders`} header={header} rows={rows}/>
        </div>
    );
}

export default Orders;