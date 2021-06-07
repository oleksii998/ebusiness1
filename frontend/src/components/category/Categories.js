import Table from "../general/Table";

const Categories = (props) => {
    const header = ["Name", "Description"];
    const rows = props.fetchedData[0].map((category) => {
        return {
            id: category.id,
            columnValues: [category.name, category.description]
        }
    });
    return (
        <div className="content">
            <h2>Categories</h2>
            <Table name={`categories`} header={header} rows={rows}/>
            <a href={`/categories/add`}>Add</a><br/>
        </div>
    );
};

export default Categories;