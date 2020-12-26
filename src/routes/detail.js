import React, {useState} from 'react';
import { connect } from "react-redux";

function Detail({toDo}) {
  return (
    <div>
      <h1>{toDo?.text}</h1>
      <p>created at: {toDo?.id}</p>
    </div>
  );
}

function mapDispatchToProps(state, ownProps) {
  const {match: {params: {id}}} = ownProps;
  return { toDo: state.find(toDo => toDo.id === parseInt(id))};
}

export default connect(mapDispatchToProps)(Detail);
