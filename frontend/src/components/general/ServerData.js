import {useState, useEffect, createElement} from "react";
import {useParams} from "react-router-dom";
import {messages} from "../../Constants";
import {isString} from "../../Common";

const ServerData = (props) => {
    const [state, setState] = useState({
        content: <p>Please, wait while the content is being loaded</p>
    });
    const params = useParams();
    useEffect(() => {
        setState({
            content: <p>Please, wait while the content is being loaded</p>
        });
        const fetchedData = new Array(props.fetchingFuncs.length);
        props.fetchingFuncs.map((fetchingFunc, index) => fetchingFunc(params).then(response => {
            fetchedData[index] = response.data;
            const canRenderWrapper = !fetchedData.includes(undefined);
            if (canRenderWrapper) {
                setState({
                    content: createElement(props.wrapper, {fetchedData, ...(props.wrapperProps ?? {})})
                })
            }
        }).catch(error => {
            setState({
                content: <p>{error.response?.data?.message || (isString(error.response?.data) ? error.response?.data : messages.serverError)}</p>
            });
        }))
    }, [props.wrapper]);

    return (
        <div>
            {state.content}
        </div>
    );
};

export default ServerData;