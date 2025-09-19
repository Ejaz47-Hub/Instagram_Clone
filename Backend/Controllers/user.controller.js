import { User } from "../model/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Post from '../model/post.model.js'
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
export const register = async(req,res)=>{
    try {
        const{username,email,password} = req.body;
        if(!username || !email || !password){
            return res.status(401).json({
                message : "Something is missing please check",
                success : false,
            })
        }
        const user = await User.findOne({email})
        if(user){
              return res.status(401).json({
                message : "Try different email id.",
                success : false,
            })
        };
        
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            email,
            password:hashedPassword
        })
          return res.status(201).json({
                message : "Account created sucessfully",
                success : true,
            })
    } catch (error) {
        console.log(error);
        
    }
}

export const login = async(req,res) =>{
    try {
        const {email,password} = req.body;
         if(!email || !password){
            return res.status(401).json({
                message : "Something is missing please check",
                success : false,
            })
        }
    let user = await User.findOne({email});
    if(!user){
        return res.status(400).json({
            message : "Incorrect email or password",
            success:false
        })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if(!isPasswordMatch){
        return res.status(401).json({
            message : "Incorrect email or password",
            success: false,
        })
    };

    
    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
    //populate east post if in the posts array

    const populatedPosts = await Promise.all(
        user.posts.map(async(postId)=>{
          const post = await Post.findById(postId)
          if(post.author.equals(user._id)){
            return post;
          }
          return null;
        })
    )

    
        user = {
        _id:user._id,
        username:user.username,
        email : user.email,
        profilePicture : user.profilePicture,
        followers : user.followers,
        following : user.following,
        posts : populatedPosts
    }


    return res.cookie('token',token,{httpOnly:true, sameSite:'strict', maxAge:1*24*60*60*1000}).json({
        message : `Welcome back ${user.username}`,
        success : true,
        user
    })

    } catch (error) {
        
    }
};
export const logout = async(_,res) => {
    try {
        return res.cookie("toke"|"",{maxAge:0}).json({
            message : "Logout sucessfully.",
            success : true
        })
    } catch (error) {
        console.log(error);      
    }
}
export const getProfile = async(req,res) => {
    try {
        const userid = req.params.id;
        let user = await User.findById(userid).select("-password")
        return res.status(200).json({
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const editProfile = async(req,res) => {
    try {
        const userId = req.id;
        const {bio, gender} = req.body;
        const profilePicture = req.file;

        let cloudResponse;
        if(profilePicture){
            const fileUri = getDataUri(profilePicture)
        cloudResponse = await cloudinary.uploader.upload(fileUri);
        }
        const user = await User.findById(userId).select("-password")
        if(!user){
            return res.status(404).json({
                message : "User Not found",
                success : false
            })
        }

        if(bio) user.bio = bio;
        if(gender) user.gender = gender;
        if(profilePicture) user.profilePicture = cloudResponse.secure_url;

        await user.save();

        return res.status(200).json({
            message : 'Profile Updated',
            success : true,
            user
        })
    } catch (error) {
        console.error(error);
        
    }
}

export const getSuggestedUsers = async(req,res) => {
    try {
        const suggestedUsers = await User.find({_id:{$ne:req.id}}).select("-password")
        if(!suggestedUsers){
            return res.status(400).json({
                message : "Currently donot have any users",
            })
        };

        return res.status(200).json({
            success:true,
            users : suggestedUsers
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const followOrUnfollow = async(req,res)=>{
    try {
        const followKrneWala = req.id;
        const jiskoFollowKrunga = req.params.id
        if(followKrneWala === jiskoFollowKrunga){
            return res.status(400).json({
                message : 'You cannot follow/unfollow your self',
                success:false
            })
        }
        const user = await User.findById(followKrneWala);
        const target = await User.findById(jiskoFollowKrunga);

        if(!user || !target){
             return res.status(400).json({
                message : 'User Not Found',
                success:false
            })
        }
        // now i will check if follow or unfollow
        const isFollowing = user.following.includes(jiskoFollowKrunga)
        if(isFollowing){
            //Unfollow logic
             await Promise.all([
            await User.updateOne({_id:followKrneWala},{$pull:{following:jiskoFollowKrunga}}),            
            await User.updateOne({_id:jiskoFollowKrunga},{$pull:{followers:followKrneWala}}),            

        ])
        return res.status(200).json({
            message : 'Unfollow sucessfully',
            success : true
        })
        }else{
            //Follow logic
        await Promise.all([
            await User.updateOne({_id:followKrneWala},{$push:{following:jiskoFollowKrunga}}),            
            await User.updateOne({_id:jiskoFollowKrunga},{$push:{followers:followKrneWala}}),            

        ])
         return res.status(200).json({
            message : 'followed sucessfully',
            success : true
        })
        }
    } catch (error) {
       console.log(error);
    }
}