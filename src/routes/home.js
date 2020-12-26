import React, {useState} from 'react';
import { connect } from "react-redux";
import { actionCreators } from '../store';
import ToDo from '../components/toDo';

function Home({ toDos, addTodo }) {
  const [text, setText] = useState("");
  function onChange(event) {
    setText(event.target.value);
  }
  function onSubmit(event) {
    event.preventDefault();
    addTodo(text);
    setText("");
  }
  return (
    <div>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      <ul>{toDos.map(toDo => <ToDo {...toDo} key={toDo.id} />)}</ul>
    </div>
  );
}

function mapStateToProps(state) {
  return { toDos: state };
}

function mapDispatchToProps(dispatch) {
  return {
    addTodo: text => dispatch(actionCreators.addTodo(text))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
