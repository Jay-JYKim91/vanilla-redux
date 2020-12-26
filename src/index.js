import { createStore } from 'redux';

const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addTodo = (text) => {
  return {
    type: ADD_TODO, text
  }
}

const deleteTodo = (id) => {
  return {
    type: DELETE_TODO, id
  }
}

const reducer = (state=[], action) => {
  console.log(action)
  switch (action.type) {
    case ADD_TODO:
      const newTodoObject = { text: action.text, id: Date.now() };
      return [...state, newTodoObject];
    case DELETE_TODO:
      return state.filter(toDo => toDo.id !== action.id);
    default:
      return state;
  }
}

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

const dispatchAddTodo = (text) => {
  store.dispatch(addTodo(text));
}


const dispatchDeleteTodo = (event) => {
  const id = parseInt(event.target.parentNode.id);
  store.dispatch(deleteTodo(id));
}

const paintTodos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach(toDo => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.innerText = "DELETE";
    button.addEventListener('click', dispatchDeleteTodo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(button);
    ul.appendChild(li);
  })
}

store.subscribe(paintTodos); //상태에 변화가 생길때마다 paintTodos를 실행함

const onSubmit = event => {
  event.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddTodo(toDo);
}

form.addEventListener('submit', onSubmit);

// const plus = document.querySelector('#plus');
// const minus = document.querySelector('#minus');
// const number = document.querySelector('span');

// number.innerText = 0;

// const PLUS = "plus";
// const MINUS = "minus";

// const countModifier = (count = 0, action) => {
//   switch (action.type) {
//     case PLUS:
//       return count + 1
//     case MINUS:
//       return count -1
//     default:
//       return count
//   }
// }

// const countStore = createStore(countModifier);
// const onChange = () => {
//   number.innerText = countStore.getState();
// }
// countStore.subscribe(onChange);

// plus.addEventListener('click', () => countStore.dispatch({ type: PLUS }));
// minus.addEventListener('click', () => countStore.dispatch({ type: MINUS }));
