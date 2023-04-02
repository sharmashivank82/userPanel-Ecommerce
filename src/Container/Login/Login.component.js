import './Login.css';
import { useState, useEffect } from 'react';
import auth from '../../API/auth';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();
    const initialState = { email: '', password: '' }
    const [ loginData, setLoginData ] = useState(initialState)
    const { email, password } = loginData;

    const [ registerData, setRegisterData ] = useState({ name: '', ...initialState });
    const { name } = registerData;

    const [register, setRegister] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }))
    }

    const handleChange2 = (e) => {
        const { name, value } = e.target;
        setRegisterData((prev) => ({ ...prev, [name]: value }))
    }

    // console.log({ registerData })

    const handleSubmit = async(e) => {
        e.preventDefault();
        const res = await auth.login(loginData);
        if(res && res.status === 200){
            alert(res.data.message);
            localStorage.setItem('authToken', res.data.token)
            navigate('/')
            window.location.reload();
        }else{
            alert('Invalid Credentials')
        }
    }

    const handleRegisterSubmit = async(e) => {
        e.preventDefault();
        const res = await auth.createUser(registerData);
        if(res && res.status === 200){
            window.alert('User is created successfully')
        }else{
            console.error(res);
        }
    }

    useEffect(() => {
        if(localStorage.getItem('authToken')){
            navigate('/')
        }
        // eslint-disable-next-line
    }, [])

  return (
    <>
        {!register && 
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <h2>Sign In</h2>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={handleChange} required />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={handleChange} required />
                    <input type="submit" value="Sign In" />
                </form>
                <h4>NEW User <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setRegister(!register)}>Create Account</span></h4>
            </div>
        }


        {register && 
        <>
            <div className="container">
                <form onSubmit={handleRegisterSubmit}>
                    <h2>Sign Up</h2>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={name} onChange={handleChange2} required />
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={registerData.email} onChange={(e) => { setRegisterData((prev) => ({ ...prev, email: e.target.value })) }} required />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={registerData.password} onChange={(e) => { setRegisterData((prev) => ({ ...prev, password: e.target.value })) }} required />
                    <input type="submit" value="Sign Up" />
                </form>
                <h4>Already User <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setRegister(!register)}>Login</span></h4>
            </div>
        </>
        }
    </>
  )
}

export default Login

{/*  */}