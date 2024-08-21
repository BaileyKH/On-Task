import { useState, useEffect } from 'react';
import { Clock } from './components/Clock';
import { db } from '/src/database.js';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';

function App() {
  const [newTask, setNewTask] = useState(false);
  const [taskText, setTaskText] = useState('');
  const [toDo, setToDo] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState({});

  const tasksCollectionRef = collection(db, 'tasks');

  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(tasksCollectionRef);
      const tasks = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return { 
          ...data, 
          id: doc.id, 
          createdAt: data.createdAt ? data.createdAt.toDate() : new Date(0) 
        };
      });
      setToDo(tasks.sort((a, b) => b.createdAt - a.createdAt));
    };
  
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      console.log("task added");
      await addDoc(tasksCollectionRef, { text: taskText, completed: false, createdAt: Timestamp.now() });
      setTaskText('');
      setNewTask(false);
      const querySnapshot = await getDocs(tasksCollectionRef);
      const tasks = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return { 
          ...data, 
          id: doc.id, 
          createdAt: data.createdAt ? data.createdAt.toDate() : new Date(0) 
        };
      });
      setToDo(tasks.sort((a, b) => b.createdAt - a.createdAt));
    }
  };

  const deleteSelectedTasks = async () => {
    const tasksToDelete = toDo.filter((item, index) => selectedTasks[index]);
    await Promise.all(tasksToDelete.map(async (task) => {
      const taskDoc = doc(db, 'tasks', task.id);
      await deleteDoc(taskDoc);
    }));
  
    setSelectedTasks({});
    const querySnapshot = await getDocs(tasksCollectionRef);
    const tasks = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return { ...data, id: doc.id, createdAt: data.createdAt.toDate() };
    });
    setToDo(tasks.sort((a, b) => b.createdAt - a.createdAt));
  };

  const toggleTaskSelection = async (index) => {
    const task = toDo[index];
    const taskDoc = doc(db, 'tasks', task.id);
    await updateDoc(taskDoc, { completed: !selectedTasks[index] });
    setSelectedTasks({
      ...selectedTasks,
      [index]: !selectedTasks[index],
    });
  };

  return (
    <>
      <div className="w-full">
        <div className="title-bar"></div>
        <Clock />
        <div>
          <div className="flex justify-between items-center mx-4 my-3">
            <h3 className="text-white/70 text-xl tracking-wider text-center">To-Do:</h3>
            <div>
              <button 
                onClick={() => setNewTask(true)} 
                className="text-white/70 bg-white/20 px-2 rounded-lg cursor-pointer active:text-green-600">
                +
              </button>
              {Object.values(selectedTasks).some(isSelected => isSelected) && (
              <button 
                onClick={deleteSelectedTasks} 
                className="text-white/70 text-sm bg-red-600 px-2 rounded-md ml-1 cursor-pointer active:bg-red-800">
                Clear
              </button>
              )}
            </div>
          </div>
          <div className="relative custom-scrollbar flex flex-col items-start mt-2 overflow-y-auto overflow-x-hidden h-[165px]">
            {toDo.length !== 0 ? toDo.map((item, index) => (
              <div className="flex justify-start items-center w-[200px] my-1 pb-2 px-2 grad-border" key={index}>
                <input 
                  type="checkbox" 
                  id={index} 
                  name={item} 
                  value={item} 
                  className="mr-3 checkbox flex-shrink-0"
                  checked={!!selectedTasks[index]}
                  onChange={() => toggleTaskSelection(index)}
                />
                <label 
                  htmlFor={index} 
                  className={`text-white/70 tracking-wider text-sm break-words whitespace-normal w-full ${selectedTasks[index] ? 'line-through' : ''}`} 
                  style={{ wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}>
                  {item.text}
                </label>
              </div>
              )) : <h3 className="text-white/70 ml-4 my-4">No Tasks</h3>}
          </div>
        </div>
        {newTask && (
          <div className="absolute z-10 bg-black p-2 w-full rounded-lg top-[150px]">
            <h3 className="text-white/70 mb-2 tracking-wider">Add New Task</h3>
            <form onSubmit={addTask} className="flex flex-col justify-center items-center">
              <input 
                id="newTask" 
                type="text" 
                name="newTask" 
                value={taskText} 
                onChange={(e) => setTaskText(e.target.value)} 
                className="flex-1 px-2 py-1 text-white/70 bg-white/20 rounded-md w-[180px] outline-none focus:outline-1 focus:outline-green-600" 
                placeholder="Enter task..."
              />
              <div className='flex justify-center items-center mt-4 space-x-3'>
                <button onClick={() => setNewTask(false)} className="text-white/70 hover:text-red-600 rounded-md tracking-wider text-sm">Close</button>
                <button type="submit" className=" px-4 py-1 bg-green-600 text-white rounded-md tracking-wider text-sm">Add</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
