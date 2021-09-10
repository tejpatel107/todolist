//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb//localhost:27017/todolistDB");

const itemSchema = {
  name : String
};

const Item = mongoose.model("Item",itemSchema);

const item1 = new Item({name : "Welcome to your todolist"});
const item2 = new Item({name : "Updated todolist with mongoDB"});
const item3 = new Item({name : "Complete the modules asap, uni gonna start soon"});

const defualtItems = [item1,item2,item3];

const customListSchema = {
  name: String,
  items: [itemSchema]
};

const List = mongoose.model("List",customListSchema);

app.get("/", function(req, res) {
  
  Item.find({}, function(err,foundItems){
    if(err){
      console.log(err);
    } else {
      if(foundItems.length === 0) {
        Item.insertMany(defualtItems,function(err) {
          if(err){
            console.log(err);
          }else {
          }});
        res.redirect("/");
      } else {
        res.render("list", {listTitle: "Today", newListItems: foundItems});
      }
    }
  });
});

app.get("/:listName",function(req,res){
  const customListName = _.capitalize(req.params.listName);

  List.findOne({name : customListName}, function(err,foundList){
    if(err){
      console.log(err);
    } else {

      if(foundList){
        res.render("list",{listTitle: foundList.name, newListItems: foundList.items});
      } else {
        const list = new List({
          name: customListName,
          items: defualtItems
        });
        
        list.save();
        res.redirect("/" + customListName);
      }
    }
  });

});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({name:itemName});
  
  if(listName === "Today"){
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name : listName}, function(err,foundList){
      if(err){
        console.log(err);
      } else {
        foundList.items.push(item);
        foundList.save();
        res.redirect("/" + listName);
      }
    });
  }
});

app.post("/delete",function(req,res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if(listName === "Today"){
    Item.findByIdAndRemove(checkedItemId,function(err){
      if(err){
        console.log(err);
      } else {
        console.log("Successfully deleted the checked item");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate({name:listName},{$pull : {items : {_id : checkedItemId}}},function(err,foundList){
      if(err){
        console.log(err);
      } else {
        res.redirect("/" + listName);
      }
    });
  }
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port 3000");
});
