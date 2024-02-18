const User = require('../models/User');

module.exports = {
    Query: {
        async user(_, {ID}) {
            return await User.findById(ID)
        },
        // getUsers is used to get users, search users and sort users
        async getUsers(_,{number,name,sort}){
            let filter = {};
            
            // If name is provided, add it to the filter
            if (name) {
                filter.name = { $regex: name, $options: "i" }; // Case-insensitive search
            }

            return await User.find(filter).sort({createdAt:sort=="asc"?1:-1}).limit(number)
        }
    },
    Mutation: {
        // create new user
        async createUser(_,{userInput: {name,age,bio}}){
            const createdUser = new User({
                name:name,
                age:age,
                bio:bio
            })

            const res = await createdUser.save();//saving to mongodb
            
            return {
                id: res.id,
                ...res._doc
            }
        },
        // deleting user
        async deleteUser(_, {ID}){
            const wasDeleted = (await User.deleteOne({_id: ID})).deletedCount;
            return wasDeleted;//1 if user has been deleted and, 0 if nothing has been deleted!
        },
        //updating user
        async editUser(_, {ID, userInput: {name, age, bio, createdAt}}){
            const wasEdited = (await User.updateOne({_id: ID},{name:name, age:age, bio:bio, createdAt:createdAt})).modifiedCount;
            return wasEdited; //1 if user has been edited and , 0 if nothing has been edited!
        }
    }
}