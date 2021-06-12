import {useEffect, useState} from "react";
import {tryExtractAndSaveCsrfToken} from "../../Common";

const PostAuth = () => {
    const [state, setState] = useState({
        done: false,
        success: false
    });
    useEffect(() => {
        let success = tryExtractAndSaveCsrfToken();
        setState({
            done: true,
            success
        });
    }, []);

    const doRender = () => {
        if (state.done) {
            let content = <span>Something went wrong, please, try to <a href="/log-in">log in</a> again</span>;
            if(state.success) {
                content = <span>You can now return to <a href="/">main</a></span>;
            }
            return content;
        }
        return <span>Please, wait...</span>;
    }

    return doRender();
};

export default PostAuth;