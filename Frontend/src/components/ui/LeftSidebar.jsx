import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { toast } from 'sonner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const sideBarItems = [
  { Icon: <Home />, text: "Home" },
  { Icon: <Search />, text: "Search" },
  { Icon: <TrendingUp />, text: "Explore" },
  { Icon: <MessageCircle />, text: "Messages" },
  { Icon: <Heart />, text: "Notification" },
  { Icon: <PlusSquare />, text: "Create" },
  { Icon: <Heart />, text: "Notification" },
  {
    Icon: (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    text: "Profile",
  },
  { Icon: <LogOut />, text: "Logout" },
]

const LeftSidebar = () => {
  const navigate = useNavigate()
  const logoutHandler = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/user/logout', {
        withCredentials: true
      })
      if (res.data.success) {
        navigate('/login')
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const sidebarHandler = (textType) => {
    if (textType === 'Logout') logoutHandler();
  }

  return (
    <div className='fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen 
    sm:w-[20%] md:w-[18%] lg:w-[16%] 
    flex flex-col'>
      
      {/* Logo */}
      <div className='mt-6 pr-9 flex items-center gap-3'>
        <img src="../../../public/instagram-logo_1199-122.webp" className='w-9 rounded-4xl' alt="" />
        <div className='hidden md:block font-semibold'>
          Instagram
        </div>
      </div>

      {/* Menu Items */}
      <div className='mt-6 flex flex-col gap-1'>
        {sideBarItems.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => sidebarHandler(item.text)}
              className='flex items-center gap-4 ml-2 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3'
            >
              {item.Icon}
              {/* Hide text on small screens */}
              <span className='hidden md:inline'>{item.text}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LeftSidebar
