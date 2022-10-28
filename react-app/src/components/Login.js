import {GoogleLogin} from 'react-google-login';

const clientId = '657310180864-a0tkbu56qpf7c3hsm19vdushdi6egofv.apps.googleusercontent.com'

const onSuccess = (res) =>{
    console.log('Login Success!! Current user: ', res.profileObj);
};

const onFailure = (res) =>{
    console.log('Login Failed')
};

const Login = () =>{
    return(
        <div id='signInBtn'>
            <GoogleLogin
                clientId={clientId}
                buttonText='Sign in with Google'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
        )
    // window.open('https://event-fright.herokuapp.com/login/google','_self')
    // window.open('http://localhost:3000/login/google','_self')

};

export default Login
