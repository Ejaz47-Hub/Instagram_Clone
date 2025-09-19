import React, { useState } from "react"
import { Button } from "@/components/ui/button"

const Signup = () => {
const[input,setInput] = useState({
    username:"",
    email:"",
    password:""
})
const changeEventHandler = (e) =>{
    setInput({...input,[e.target.name]:e.target.value})

}
const signuphandler = async(e) =>{
    e.preventDefault()
}

  return (
    <div className="flex items-center w-screen h-screen justify-center">
      <form onSubmit={signuphandler} className="shadow-lg flex flex-col gap-5 p-8 w-96">
        <div className="my-4 text-center">
          <h1 className="text-center font-bold text-xl">LOGO</h1>
          <p className="text-sm text-center">Signup to see photos & videos from friends</p>
        </div>

        <div>
          <span className="font-medium">Username</span>
          <input
            type="text"
            name="username"
            value={input.username}
            onChange={changeEventHandler}
            className="border border-black p-2 rounded w-full my-2"
          />
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

       <Button variant="outline" className="bg-black text-white" type='submit'>Button</Button>
      </form>
    </div>
  )
}

export default Signup
