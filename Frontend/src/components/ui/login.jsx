import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { Toaster, toast } from "sonner"   // ✅ import toast
import { Link, useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  })
  const[loading,setLoading] = useState(false)
  const navigate = useNavigate()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const signuphandler = async (e) => {
    e.preventDefault()
    console.log(input)
    try {
      setLoading(true)
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )

      if (res.data.success) {
        navigate('/')
        toast.success(res.data.message)   // ✅ correct usage
        setInput({
           email: "",
            password: "",
        });
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Something went wrong")  // ✅ safe check
    }
     finally{
    setLoading(false)
  }
  }

  return (
    <div className="flex items-center w-screen h-screen justify-center">
      <form
        onSubmit={signuphandler}
        className="shadow-lg flex flex-col gap-5 p-8 w-96"
      >
        <div className="my-4 text-center">
          <h1 className="text-center font-bold text-xl">LOGO</h1>
          <p className="text-sm text-center">
            Login to see photos & videos from friends
          </p>
        </div>

    

        <div>
          <span className="font-medium">Email</span>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="border border-black p-2 rounded w-full my-2"
          />
        </div>

        <div>
          <span className="font-medium">Password</span>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="border border-black p-2 rounded w-full my-2"
          />
        </div>
        {
          loading ? (
            <Button variant="outline" className="bg-black text-white" >
              <Loader2 className="mr-2 h-4 m-4 animate-spin"/>
              Please wait
            </Button>
          ) : (
               <Button variant="outline" className="bg-black text-white" type="submit">
          LOGIN
        </Button>
          )
        }
       
         <span className="text-center">Dosen't have an account? <Link className="text-blue-600" to="/signup">Signup</Link></span>
      </form>

      {/* ✅ Mount the Toaster component once in your app */}
      <Toaster richColors position="top-center" />
    </div>
  )
}

export default Login
