import React from "react";

class Tempo extends React.Component {
  render = () => {
    return (
      <div className="tempoBloc">
        <div className="startRow">
          <div>Tempo</div>
          <div>{this.props.tempo}</div>
        </div>
        <div className="startRow">
          <button
            className="start"
            onClick={() => {
              this.props.decrement();
            }}
          >
            -
          </button>
          <button
            className="start"
            onClick={() => {
              this.props.increment();
            }}
          >
            +
          </button>
        </div>
      </div>
    );
  };
}

export default Tempo;
