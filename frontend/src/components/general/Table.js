const Table = (props) => {
    return (
        <table>
            <tr>{props.header.map((columnName, index) => <th key={index}>{columnName}</th>)}</tr>
            {props.rows.map((row, index) => {
                return <tr key={index} onClick={() => window.location.href = `/${props.name}/${row.id}`}>
                    {row?.columnValues.map((columnValue, index) => <td key={index}>{columnValue}</td>)}
                </tr>
            })}
        </table>
    );
};
export default Table;