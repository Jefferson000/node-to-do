const { argv } = require('./config/yargs');
const toDo = require('./to-do/to-do');
const { deleteTask } = require('./to-do/to-do');
// console.log(`descripcion: ${argv.descripcion}`);
// console.log(`completado: ${argv.completado}`);

const description = argv.descripcion;
const completed  = argv.completado;
let command = argv._[0]

switch ( command ){

   case 'crear':
      toDo.create(description);
   break;

   case 'listar':
      //console.log('Mostrar las tareas por hacer');
      let tasks = toDo.getTasks();
      for(let task of tasks){
         console.log('************************'.blue);
         console.log(`${'Tarea:'.green} ${task.description}`);
         console.log(`${'Estado:'.green} ${task.completed}`);
      }
      console.log('************************'.blue);
   break;

   case 'actualizar':
      let updated = toDo.updateTask(description,completed)
      if(updated){
         console.log('Tarea actualizada'.green);
      } else{
         console.log('Tarea no actualizada'.red);
      }
   break;
   
   case 'borrar':
      let deleted = toDo.deleteTask(description)
      if(deleted){
         console.log('Tarea borrada'.green);
      } else{
         console.log('Tarea no borrada'.red);
      }
   break;   
   default:
      console.log('Comando no conocido');
}
