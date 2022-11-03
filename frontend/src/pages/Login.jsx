import  { useState }from "react"
import toast, { Toaster } from 'react-hot-toast';
const { ValidateEmail  , validatePassword} = require('../utils/helpers')


function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    // validate the email
    if(email === ''){
      toast.error('email feild is empty!')

    }else if(! ValidateEmail(email)){
        toast.error('email format is invalid!')

    }
    // validate the password
    if(! validatePassword(password)){
      toast.error('Password must be more then 6 caracteres')
    }

    setEmail('');
    setPassword('');
  };



  return (
    <div className="flex min-h-full items-center justify-center py-12 m:px-6 lg:px-8">
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm 	 mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 bg-amber-100	 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-4xl font-bold	 text-center">Login</h1>

            <form onSubmit={handleSubmit}>
            <input onChange={event => setEmail(event.target.value)}  value={email} type="text" className="block border border-grey-light w-full p-3 rounded mb-4" name="email" placeholder="Email" />
            <input onChange={event => setPassword(event.target.value)}  value={password} type="password" className="block border border-grey-light w-full p-3 rounded mb-4" name="password" placeholder="Password" />
            <button type="submit" className="w-full text-center py-3 rounded bg-blue-900 text-white hover:bg-green-dark focus:outline-none my-1">Login</button>
            </form>

            <div className="text-center text-sm text-grey-dark mt-4"> By signing in, you agree to the <a className="no-underline border-b border-grey-dark text-blue-900" href="/"> <span> </span>  Terms of Service  </a>   <span> and </span> <a className="no-underline border-b border-grey-dark text-blue-900	" href="/">  Privacy Policy </a> </div>
          </div>
        </div>
      </div>
    <Toaster />
    </div>
  )
}

export default Login