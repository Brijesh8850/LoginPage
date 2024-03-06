// // const express=require('express');
// // const mongoose=require('mongoose');
// // const body_parser=require('body-parser');
// // const dotenv=require('dotenv');
// // const app= express();
// // dotenv.config();
// // const port=process.env.PORT || 3000;

// // const username="Brijesh098";
// // const userpassword="Brijesh@123";


// // mongoose.connect(`mongodb+srv://${username}:${userpassword}@cluster0.3m6ppsj.mongodb.net/registraionFormdb`,{
// //     useNewURLParser:true,
// //     useUnifiedTopology:true,
// // });
// //  const registrationschema=new mongoose.Schema({
// //     name:String,
// //     email:String,
// //     password:String
// //  });
// //  const Registration=mongoose.Model("Registraion",registrationschema);

// //  app.use(body_parser.urlencoded({extended:true}));
// //  app.use(body_parser.json());

 
// // app.get("/",(req,res)=>{
// //     res.sendFile(__dirname+"/registrationpage.html");
// // });

// // app.post("/register",async(req,res)=>{
// //  try{
// //     const {name,email,password}=req.body;
// //     const registraiondata=new Registraion({
// //         name,
// //         email,
// //         password
// //     });
// //     await registraiondata.save();
// //     res.redirect('/success');
// //  }
// //  catch (error){
// //     console.log(error);
// //     res.redirect('/error');
// //  }
// // });
// // app.get("/success",(req,res)=>{
// //     res.sendFile(__dirname+"/success.html");
// // });
// // app.get("/error",(req,res)=>{
// //     res.sendFile(__dirname+"/error.html");
// // });
// // app.listen(port,()=>{
// //     console.log(`server is running o port ${port}`);
// // });
// const express = require('express');
// const mongoose = require('mongoose');
// const body_parser = require('body-parser');
// const dotenv = require('dotenv');
// const app = express();
// dotenv.config();
// const port = process.env.PORT || 3000;

// const username = "Brijesh098";
// const userpassword = "Brijesh@123";

// mongoose.connect(`mongodb+srv://${username}:${encodeURIComponent(userpassword)}@cluster0.3m6ppsj.mongodb.net/registraionFormdb`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });


// const registrationSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String
// });

// const Registration = mongoose.model("Registration", registrationSchema); // Fix typo and case here

// app.use(body_parser.urlencoded({ extended: true }));
// app.use(body_parser.json());

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/registrationpage.html");
// });

// app.post("/register", async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         const registrationData = new Registration({
//             name,
//             email,
//             password
//         });
//         await registrationData.save();
//         res.redirect('/success');
//     } catch (error) {
//         console.log(error);
//         res.redirect('/error');
//     }
// });

// app.get("/success", (req, res) => {
//     res.sendFile(__dirname + "/success.html");
// });

// app.get("/error", (req, res) => {
//     res.sendFile(__dirname + "/error.html");
// });

// app.listen(port, () => {
//     console.log(`server is running on port ${port}`);
// });

const express = require('express');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { error } = require('console');

const app = express ();
dotenv.config();
app.use(express.static('public'));

const username = process.env.MONGODB_USERNAME
const password = process.env.MONGODB_PASSWORD

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.u5ldmik.mongodb.net/Registrationdb`);

const port = 3000;

const RegistrationSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const Registration = mongoose.model("Registration",RegistrationSchema);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/registrationpage.html");
})

app.post("/register", async (req,res)=>{
    try{
        const {name,email, password}=req.body;
        const existinguser= await Registration.findOne({email:email});
        if(!existinguser){
            const RegistrationData = new Registration({
                name,email,password
            })
        }
        else{
            alert("user already exist");
            res.redirect('/error');
        }
        const RegistrationData = new Registration({
            name,email,password
        })
      await RegistrationData.save();
      res.redirect('/success');

    }catch{
        console.log(error);
        res.redirect("error");
 
    }
    app.get("/success",(req,res)=>{
        res.sendFile(__dirname+"/success.html");
    }) ;
    app.get("/error",(req,res)=>{
        res.sendFile(__dirname+"/error.html");
    });
})

app.listen(port,()=>(
    console.log(`server is running on port ${port}`)
))