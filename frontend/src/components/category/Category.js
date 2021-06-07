import {useState} from "react";
import {removeCategory} from "../../Rest";
import {sendForm} from "../../Common";

const Category = (props) => {
    const [state, setState] = useState(null);

    const onRemoveCategoryHandler = () => {
        const restFunc = () => removeCategory(props.fetchedData[0].id);
        const respCallback = () => window.location.href = `/categories`;
        const errCallback = (err) => setState(err.response?.data);
        sendForm(restFunc, respCallback, errCallback);
    };

    return (
        <div>
            <h2>Category</h2>
            <p><b>Name: </b> {props.fetchedData[0].name}</p>
            <p><b>Description: </b> {props.fetchedData[0].description}</p>
            <a href={`/categories/${props.fetchedData[0].id}/modify`}>Modify</a><br/>
            <input type="button" onClick={onRemoveCategoryHandler} value="Remove"/>
            <p>{state}</p>
        </div>
    );
};

export default Category;