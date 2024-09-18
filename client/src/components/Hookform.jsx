import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
// import { fetchTodos, addTodo } from './todoSlice';
import './css/hookformcss.css'

const Hookform = () => {
//   const dispatch = useDispatch();
  const [todos,settodos] = useState([{task:"compltethis",lastDate:new Date(),isImportant:true}])
  const { register, handleSubmit, reset } = useForm();


  const onSubmit = (data) => {
    settodos([...todos,data])
    console.log("data",data)
    reset(); // Reset the form after submission
  };

  return (
    <div>
      <h2>Todo List</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Task:</label>
          <input
            {...register('task', { required: true })}
            placeholder="What to do?"
          />
        </div>

        <div>
          <label>Last Date:</label>
          <input
            type="date"
            {...register('lastDate', { required: true })}
          />
        </div>

        <div>
          <label>Is Important?</label>
          <input type="checkbox" {...register('isImportant')} />
        </div>

        <button type="submit">Add Todo</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <strong>{todo.task}</strong> - {new Date(todo.lastDate).toLocaleDateString()}
            {todo.isImportant && <span> (Important)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hookform;
