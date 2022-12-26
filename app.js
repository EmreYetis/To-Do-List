const express = require("express");
const bodyParser = require("body-parser");
const getDate = require("./date");
const date = require(__dirname + "/date.js");


const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems= [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

    /****** /MAİN PAGE *******/ 

app.get("/", function(req, res){

    const day = date.getDate();

    res.render("list", {
        listTitle: day, 
        newListItems: items
    });
});
      /****** / and /WORK Push *******/        // req.body.list ile value karşılaştırarak if,else kullandık.
app.post("/", function(req, res) {
    const item = req.body.newItem;

     if (req.body.list === "Work List") {
         workItems.push(item);
         res.redirect("/work");    
     } else {
         items.push(item);
         res.redirect("/");
     }

})

    /****** /WORK *******/ 

app.get("/work", function(req, res){
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems
    });
});

    /****** /ABOUT *******/ 

app.get("/about", function(req, res){
    res.render("about");
    });
;


    /****** LİSTEN *******/ 

app.listen(3000, function(){
	console.log("Server started on port 3000");
});





