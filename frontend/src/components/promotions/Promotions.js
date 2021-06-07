import Table from "../general/Table";

const Promotions = (props) => {
    const header = ["Id", "Product Name", "Promotion Type", "Discount value"];
    const rows = props.fetchedData[0].map((entry) => {
        const promotionType = entry.promotion.promotionType === 0 ? "Percentage" : "Constant";
        return {
            id: entry.promotion.id,
            columnValues: [entry.promotion.id, entry.product.name, promotionType, entry.promotion.discount]
        }
    });

    return (
        <div className="content">
            <Table name="promotions" header={header} rows={rows}/>
            <a href={`/promotions/add`}>Add</a><br/>
        </div>
    );
};

export default Promotions;