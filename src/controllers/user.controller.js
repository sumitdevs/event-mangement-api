import { 
    createUser,
    getAllUsers,
    getUserByEmail,
    getUserById,
    deleteUserById
} from "../models/user.model.js";

export const addUser = async (req,res) =>{
    try{
        const {name,email} = req.body;
        if(!name || !email)
            return res.status(400).json({message:'name and email are required'});
        const user = await getUserByEmail(email);
        if(user)
            return res.status(400).json({message:'user already exist'});
        const newUser = await createUser(name,email);
        res.status(201).json(newUser);
    } catch(err){
        res.status(500).json({message: 'Error creating user',error: err.message});
    }
}

export const fetchAllUser = async (req,res) =>{
    try{
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch(err){
        res.status(500).json({message:'error fetching users',error: err.message});
    }
}

export const fetchUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};

export const removeUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await deleteUserById(id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};