const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());    //req.body

//ROUTES

//Create a todo

app.post("/todos", async(req, res) => {
    try {
        //console.log(req.body);    印出傳進來的json內容
        const {description} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *"
            , [description]   //$代表變數，可傳入後面的值（desc）
        );

        res.json(newTodo.rows[0]);      //顯示指定內容，只有輸入的內容，不然很多雜項
    } catch (err) {
        console.error(err.message);
    }
});


//get all todos

app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);        //顯示資料
    } catch (err) {
        console.error(err.message);
    }
})


//get a todo

app.get("/todos/:id", async(req, res) => {
    try {
        //console.log(req.params);        //印出在postman指定:id的內容 ex: {id: 'abc'}，可動態指定
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//update a todo

app.put("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);

        res.json("Todo was updated!");
    } catch (err) {
        console.error(err.message);
    }
});


//delete a todo

app.delete("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        
        res.json("Todo was deleted!");
    } catch (err) {
        console.error(err.message);
    }
})


//設定port

app.listen(2020, () => {
    console.log("Server has started on port 2020");
});