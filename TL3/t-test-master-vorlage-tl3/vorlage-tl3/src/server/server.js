const express = require("express");
const app = express();
const port = 3000;
const BodyParser = require('body-parser');

// Start Server at Port 3000
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

let mongoose = require('mongoose');

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true}));


// stellt Verbindung zur Datenbank her
mongoose.connect("mongodb://localhost:27017/todolist", {useNewUrlParser: true, useCreateIndex: true});

// speichert Verbindung zur Rrefenz in Variable
let db = mongoose.connection;

// Überprüft, ob Datenbank angebunden ist und gibt auf der Konsole Rückmeldung
db.once('open', function(){
    console.log('DB connected!');
})


let todoitemSchema = new mongoose.Schema({
  title: {type: String, unique: true, required: true},
  date: {type: Date, unique: false, required: true},
  description: {type: String, unique: false, required: true},
  state: {type: Boolean, unique: false, required: true}
})


const Todoitem = mongoose.model('Todoitem', todoitemSchema, "myCollection");

/* var todoitem = new Todoitem({title: "pipi",
                                date: new Date('December 17, 1995 03:24:00'),
                                description: "geh auf klo",
                                state: false});
    await todoitem.save(function(err, doc) {
    if (err) return console.error(err);
      console.log("Document inserted succussfully!");
    }); */


// CRUD Operations
//CREATE
app.post('/backend/addtodo', async (request, response) => {
  try{
    console.log("lksdhaoi")
    var todoitem = new Todoitem(request.body);
    var result = await todoitem.save();
    response.send(result);
  } catch (error) {
    responde.status(500).send(error);
  }
});

//READ
app.get('/backend/todo_list', async (request, response) => {
  try {
    var result = await todoitem.find().exec();

    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});
//DELETE
app.delete('/todoitem/:id', async (request, response) => {
  try {
    var result = await todoitem.deleteOne({_id: request.params.id}).exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});






// localhost:3000/backend/test delivers an array of strings "Hello", "World", "!"
app.get("/backend/test", (req, res) => res.send(["Hello", "World", "!"]));
