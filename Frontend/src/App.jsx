import { Button } from "@/components/ui/button"
import React from "react"
import Signup from "./components/ui/signup"
import { Label } from "./components/ui/label"
import { createBrowserRouter , RouterProvider} from "react-router-dom"
import Login from "./components/ui/login"
import MainLayout from "./components/ui/MainLayout"
import Home from "./components/ui/Home"


const browserRouter = createBrowserRouter(
  [
    {
      path : '/',
      element:<MainLayout/>,
      children:[
        {
          path : '/',
          element:<Home/>
        }
      ]
    },
{
  path : '/login',
  element: <Login/>
},
{
  path : 'signup',
  element : <Signup/>
}
 ])
function App() {
  return (
    <div>

    <RouterProvider router={browserRouter}/>

    </div>
  )
}

export default App