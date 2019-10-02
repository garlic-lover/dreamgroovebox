import React from "react";

class DrumRow extends React.Component {
  state = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false
  };
  createRow = () => {
    let row = [];
    for (let i = 0; i < 16; i++) {
      row.push(i);
    }
    return row;
  };

  playAudio = () => {
    return <audio ref="audio_tag" src={this.props.sample} autoPlay />;
  };

  render = () => {
    let activeStep = this.props.activeStep;
    return (
      <div className="sequencerRow">
        {this.createRow().map(step => {
          return (
            <div key={step}>
              <button
                className={
                  this.state[step] === true && activeStep !== step
                    ? "clicked"
                    : this.state[step] === true && activeStep === step
                    ? "clicked activeStep"
                    : activeStep === step
                    ? "activeStep"
                    : ""
                }
                onClick={async () => {
                  await this.setState({
                    [step]: this.state[step] === false ? true : false
                  });
                }}
              />
              {this.state[step] === true && activeStep === step && (
                <audio ref="audio_tag" src={this.props.sample} autoPlay />
              )
              /* this.playAudio() */
              }
            </div>
          );
        })}
      </div>
    );
  };
}

export default DrumRow;
