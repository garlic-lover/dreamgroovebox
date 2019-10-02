import React from "react";
import DrumRow from "./DrumRow";
import Row from "./Row";
import Grid from "./Grid";
import Tempo from "./Tempo";
import kick from "./samples/909kickbis.wav";

class Main extends React.Component {
  state = {
    tempo: 120,
    activeStep: 0,
    isPlaying: false,
    timerId: "",
    grids: [],
    newGridLength: 16
  };

  sequencerRun = tempo => {
    let movingStep = () => {
      this.setState({ activeStep: this.state.activeStep + 1 });
    };
    let sharingId = timerId => {
      this.setState({ timerId: timerId });
    };
    let timerId = setTimeout(function run() {
      movingStep();
      let timerIdBis = setTimeout(run, 1000 / (tempo / 15));
      sharingId(timerIdBis);
    }, 1000 / (this.state.tempo / 15));
    return timerId;
  };

  sequencerStop = () => {
    clearTimeout(this.state.timerId);
  };

  render = () => {
    return (
      <section>
        <Grid activeStep={this.state.activeStep} length={16} />
        <div>
          {this.state.grids.map((gridLength, index) => {
            return (
              <Grid
                key={index}
                activeStep={this.state.activeStep}
                length={gridLength}
              />
            );
          })}
        </div>
        <div className="sequencerRow">
          <button
            className="addGrid"
            onClick={() => {
              let gridTab = [...this.state.grids];
              gridTab.push(this.state.newGridLength);
              this.setState({ grids: gridTab });
            }}
          >
            Ajouter grille
          </button>
          <input
            type="number"
            value={this.state.newGridLength}
            onChange={event => {
              this.setState({ newGridLength: event.target.value });
            }}
          />
        </div>
        <div className="startRow">
          <button
            className="start"
            onClick={async () => {
              if (this.state.isPlaying === true) {
                return;
              }
              await this.setState({ isPlaying: true });
              this.sequencerRun(this.state.tempo);
            }}
          >
            Start
          </button>
          <button
            className="start"
            onClick={async () => {
              await this.setState({ isPlaying: false });
              this.sequencerStop();
            }}
          >
            Stop
          </button>
          <button
            className="start"
            onClick={() => {
              this.setState({ activeStep: 0 });
            }}
          >
            Reset
          </button>
        </div>
        <Tempo
          decrement={async () => {
            await this.setState({ tempo: this.state.tempo - 5 });
            await this.sequencerStop();
            await this.sequencerRun(this.state.tempo);
          }}
          increment={async () => {
            await this.setState({ tempo: this.state.tempo + 5 });
            await this.sequencerStop();
            await this.sequencerRun(this.state.tempo);
          }}
          tempo={this.state.tempo}
        />
      </section>
    );
  };
}

export default Main;
