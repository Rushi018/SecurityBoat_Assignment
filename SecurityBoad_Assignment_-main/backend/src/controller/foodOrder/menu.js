import {Menu} from '../../model/foodSchema.js';

const addMenu = async(req , res) => {
    const {name} = req.body
    try {
        const checkItem = await Menu.findOne({name})

        if(checkItem){
            return res.status(400).json({error:"Item is alreay available "})
        }
        
        const submit = new Menu(req.body)
        await submit.save()
        res.status(201).json({message:"Item add successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"server errror in add menu"})
    }
}

const viewMenu = async (req, res) => {
    try {
        const getMenu = await Menu.find({})
        res.status(200).json(getMenu);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error in get Seat function' });
    }
}


const updatedMenu = async (req, res) => {
    try {
        const {name} = req.body;

        const updatedMenu = await Menu.findOneAndUpdate(
            {name},{ $set: {...req.body} },
            { new: true}
        );

        if (!updatedMenu) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json(updatedMenu);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const deletedMenu = async (req, res) => {
    const { name } = req.body
    try {
        const deletedMenu = await Menu.findOneAndDelete({ name });
        if (!deletedMenu) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export {addMenu , viewMenu , updatedMenu , deletedMenu}