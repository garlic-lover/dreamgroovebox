import React from "react";
import Tone from "tone";

class Row extends React.Component {
  state = {
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: "",
    15: ""
  };
  createRow = () => {
    let row = [];
    for (let i = 0; i < this.props.length; i++) {
      row.push(i);
    }
    return row;
  };

  scale = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];

  playAudio = note => {
    /* var rev = new Tone.Freeverb().toMaster();
    var synth = new Tone.PluckSynth().connect(rev); */

    var synth = new Tone.FMSynth().toMaster();

    /* rev.wet.value = 0.5;
    rev.decay = "8n"; */

    synth.modulationIndex.value = 12;

    //play a middle 'C' for the duration of an 8th note
    synth.triggerAttackRelease(note, "8n");
  };

  render = () => {
    let activeStep = this.props.activeStep;
    if (activeStep > this.props.length) {
      let modulo = activeStep % this.props.length;
      let multiplyer = (activeStep - modulo) / this.props.length;
      activeStep = activeStep - this.props.length * multiplyer;
    }
    return (
      <div className="sequencerRow">
        {this.createRow().map((step, index) => {
          return (
            <div key={index}>
              {this.scale.map((note, index) => {
                return (
                  <div key={note}>
                    <button
                      className={
                        this.state[step] === index && activeStep !== step
                          ? "clicked"
                          : this.state[step] === index && activeStep === step
                          ? "clicked activeStep"
                          : activeStep === step
                          ? "activeStep"
                          : ""
                      }
                      onClick={async () => {
                        await this.setState({
                          [step]: this.state[step] === index ? "" : index
                        });
                      }}
                    />
                    {this.state[step] === index &&
                      activeStep === step &&
                      this.playAudio(this.scale[index])}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };
}

export default Row;
