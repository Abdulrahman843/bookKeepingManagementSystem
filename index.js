const express = require("express");

const {users} = require("./data/users.json")

const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/", (req,res)=>{
    res.status(200).json({
        message: "Server is up and running"
    })
})

/**
 * Route: /users
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameter: None
 */

app.get("/users", (req,res)=>{
   res.status(200).json({
    success: true,
    data: users
   })
})

/**
 * Route: /users/:id
 * Method: GET
 * Description: Get user with id
 * Access: Public
 * Parameter: id
 */

app.get("/users/:id", (req,res)=>{
    const {id} = req.params;

    const user = users.find((each)=> (each.id === id))
        if (!user){
            return res.status(404).json({
                success: false,
                message: "User is not found"
            })
        }
    return res.status(200).json({
        success: true,
        data: user
    })
})

/**
 * Route: /users
 * Method: POST
 * Description: Create a new user
 * Access: Public
 * Parameter: None
 */
app.post("/users", (req,res)=>{
    const {id, name, surname, email, subscriptionType, subscriptionDate} = req.body;
    const user = users.find((each)=> (each.id ===id));
    if (user){
        return res.status(404).json({
            success: false,
            message: "User exists with the given ID"
        })
    }
    users.push({id, name, surname, email, subscriptionType, subscriptionDate});
        return res.status(201).json({
            success: true,
            data: users
        })
})

/**
 * Route: /users/:id
 * Method: PUT
 * Description: Updating a user
 * Access: Public
 * Parameter: id
 */
app.put("/users/:id", (req,res)=>{
    const {id} = req.params;
    const {data} = req.body;

   const user = users.find((each)=>(each.id === id));
    if (!user){
        return res.status(404).json({
            success: false,
            message: "User is not found"
        })
    }

    const updateUser = users.map((each)=>{
        if (each.id === id){
            return{
                ...each,
                ...data
            }
        }
        return each
    })

    return res.status(200).json({
        success: true,
        data: updateUser
    })
   }) 

app.all("*", (req,res)=>{
    res.status(404).json({
        message: "This route doesn't exist"
    })
})
app.listen(PORT, ()=>{
    console.log(`Server is runnung on port ${PORT}`)
})