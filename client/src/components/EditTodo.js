import React, { Fragment, useState, useEffect } from "react";

const EditTodo = ({todo}) => {

    const [description, setDescription] = useState(todo.description);


    //edit description function
    const updateDesc = async(e) => {
        e.preventDefault();             //don't refresh yet, run code first
        try {
            const body = { description };
            const response = await fetch(`http://localhost:2020/todos/${todo.todo_id}`,
            {
                method: "PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });

            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };
            
    
    return (
        <Fragment>
            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id${todo.todo_id}`}>
                Edit
            </button>

            {/*
                //不能只放數字，要有字
                id={`id${todo.todo_id}`}
                =>  id=id10
            */}
            
            <div className="modal" id={`id${todo.todo_id}`} onClick={() => setDescription(todo.description)}>    
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Edit Todo</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setDescription(todo.description)}></button>
                        </div>

                        <div className="modal-body">
                            <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)}/>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={e => updateDesc(e)}>Edit</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => setDescription(todo.description)}>Close</button>
                        </div>

                    </div>
                </div>
            </div>

        </Fragment>
    );
}

export default EditTodo;