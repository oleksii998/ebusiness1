import Table from "../general/Table";
import {getUserUri} from "../../Rest";

const Users = (props) => {
    const header = ["Email", "First name", "Last name"];
    const rows = props.fetchedData[0].map((user) => {
        return {
            id: user.id,
            columnValues: [user.email, user.firstName, user.lastName]
        }
    });

    return (
        <div className="content">
            <Table name={getUserUri(props.isCustomer)} header={header} rows={rows}/>
            <a href={`/${getUserUri(props.isCustomer)}/add`}>Add</a><br/>
        </div>
    );
};

export default Users;