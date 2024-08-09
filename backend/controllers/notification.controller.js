import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res ) => {
    try{

        const userId = req.user._id  

        const notification = await Notification.find({to: userId}).populate({ 
            path: "from", 
            select: "username profileImg",
        });

        await Notification.updateMany({to: userId}, {read: true})
        res.status(200).json(notification);

    }
    catch(error){
        console.log("Error in getNotifications function : " + error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const deleteNotifications = async (req, res ) => {
    try{
        const userId = req.user._id
        
        await Notification.deleteMany({to: userId})
        
        res.status(200).json({message: "Notifications deleted successfully"});
    }
    catch(error){
        console.log("Error in deleteNotification function : " + error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const deleteOneNotification = async (req, res ) => {
    try{
        const notificationId = req.prams.id
        const userId = req.user._id
        const notification = await Notification.findById(notificationId)
        
        if(!notification || notification.to.toString()!== userId){
            return res.status(404).json({message: "Notification not found or not belong to you"});
        }

        await Notification.findByIdAndDelete(notificationId); 
        res.status(200).json({message: "Notification deleted successfully"});
        
    }
    catch(error){
        console.log("Error in deleteOneNotification function : " + error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}