const fs = require('fs');
const colors = require('colors');
//const json = require('../tasks/data.json')

let toDoList = [];

const create = (description) => {
    loadTasks();
    let toDo = {
        description,
        completed: false
    };

    toDoList.push(toDo);
    saveTasks();
}


const saveTasks = () => {
    let data = JSON.stringify(toDoList);
    fs.writeFile('tasks/data.json', data,(err)=>{
        if(err) throw new Error('No se pudo grabar', err);
    }) 
}

const loadTasks = () =>{
    try{
        toDoList = require('../tasks/data.json');
    } catch(error){
        toDoList = [];
    }
}

const getTasks = () =>{
    loadTasks();
    return toDoList;
}

const updateTask = (description, completed) =>{
    loadTasks();
    let index = toDoList.findIndex( task =>{
        return task.description ===description;
    })
    if(index>=0){
        toDoList[index].completed = completed;
        saveTasks();
        return true;
    } else{
        return false;
    }
}

const deleteTask = (description) =>{
    loadTasks();
    let newToDoList = toDoList.filter(task =>{
        return task.description !== description;
    })
    if (newToDoList.length === toDoList.length){
        return false;
    } else{
        toDoList = newToDoList;
        saveTasks();
        return true;
    }
}
module.exports = {
    create,
    getTasks,
    updateTask,
    deleteTask
}