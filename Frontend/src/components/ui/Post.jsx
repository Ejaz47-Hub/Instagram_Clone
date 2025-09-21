import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Button } from "./button";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Post = () => {
  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="post_image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1>username</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="bg-white flex flex-col items-stretch text-sm text-center gap-2">
            <Button
              variant="ghost"
              className="cursor-pointer w-full text-[#ED4956] font-bold hover:bg-gray-100"
            >
              Unfollow
            </Button>
            <Button
              variant="ghost"
              className="cursor-pointer w-full hover:bg-gray-100"
            >
              Add to favorites
            </Button>
            <Button
              variant="ghost"
              className="cursor-pointer w-full hover:bg-gray-100"
            >
              Delete
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <img
        className="rounded-sm my-2 w-full aspect-square object-cover"
        src="/1748266394376.jpeg"
        alt=""
      />
      
        <div className="flex items-center justify-between my-2">
          <div className="flex items-center gap-3.5">
            <FaRegHeart size={"22px"} className="cursor-pointer hover:text-gray-600" />
            <MessageCircle
              size={"22px"}
              className="cursor-pointer hover:text-gray-600"
            />
            <Send
              size={"22px"}
              className="cursor-pointer hover:text-gray-600"
            />
          </div>
            <Bookmark className="cursor-pointer hover:text-gray-600"/>
        </div>
        <span className="font-medium block mb-2">1k likes</span>
        <p>
            <span className="font-medium mr-2">username</span>
            caption
        </p>
        <span>View all 10 comments</span>
        <CommentDialog/>
      </div>
  );
};

export default Post;
