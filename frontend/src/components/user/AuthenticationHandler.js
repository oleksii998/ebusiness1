import {authUrl} from "../../Rest";

const AuthenticationHandler = () => {
    const authRedirect = (provider) => {
        window.location.assign(`${authUrl}/${provider}`);
    };

    return (
        <div>
            <input type="button" onClick={() => authRedirect("google")} value="Google"/>
            <input type="button" onClick={() => authRedirect("github")} value="Github"/>
        </div>
    );
};

export default AuthenticationHandler;