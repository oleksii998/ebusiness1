import Table from "../general/Table";

const Vouchers = (props) => {
    const header = ["Name", "Type", "Discount"];
    const rows = props.fetchedData[0].map((voucher) => {
        const promotionType = voucher.voucherType === 0 ? "Percentage" : "Constant";
        return {
            id: voucher.id,
            columnValues: [voucher.name, promotionType, voucher.discount]
        }
    });

    return (
        <div className="content">
            <Table name="vouchers" header={header} rows={rows}/>
            <a href={"/vouchers/add"}>Add</a><br/>
        </div>
    );
};

export default Vouchers;