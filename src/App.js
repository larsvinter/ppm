import React, { Component } from 'react';
import Ppm from './components/Ppm';
import './App.css';
import news from './news.mp3';

class App extends Component {
  constructor(props) {
    super(props);
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new AudioContext();
    this.audioElement1 = React.createRef();
    this.audioElement2 = React.createRef();

    // volume
    this.gainNode1 = this.audioCtx.createGain();
    this.gainNode2 = this.audioCtx.createGain();
    this.gainNodeSum = this.audioCtx.createGain();
  }

  init() {
    this.audioElement1.current.play();
    this.audioElement2.current.play();

            // check if context is in suspended state (autoplay policy)
    if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
    }

    this.track1 = this.audioCtx.createMediaElementSource(this.audioElement1.current);
    this.track2 = this.audioCtx.createMediaElementSource(this.audioElement2.current);
    // track1.connect(gainNode1).connect(audioCtx.destination);
    this.track1.connect(this.gainNode1).connect(this.gainNodeSum);
    this.track2.connect(this.gainNode2).connect(this.gainNodeSum);
    this.gainNodeSum.connect(this.audioCtx.destination);
  }

  con2() {
    for (let k = 0; k < 101; k++) {
      this.gainNode1.gain.value = (100 - k) / 100;
      this.gainNode2.gain.value = k / 100;
    }
  }

  cons1() {
    for (let k = 0; k < 101; k++) {
      this.gainNode2.gain.value = (100 - k) / 100;
      this.gainNode1.gain.value = k / 100;
    }
  }

  render() {
    return (
      <div style={{ width: '100vh', height: '100vh', background: '#333', padding: 100}}>
        <button onClick={this.init.bind(this)}>Load</button>
        <button onMouseDown={this.con1}>Stream 1</button>
        <button onMouseDown={this.con2}>Stream 2</button>
        <audio ref={this.audioElement1} src={news}></audio>
        <audio ref={this.audioElement2} src="armin2.wav"></audio>
        <Ppm width="800" height="140" backgroundColor="black" margin="10px" ledColor = 'lime' pml="6" al="0" alIndication="TEST" ledSegments="220" largeScaleMarks={[12, 6, 0, -6, -12, -18, -24, -30, -36, -42]} smallScaleMarks={[ -39, -33, -27, -21, -15, -9, -3, 3, 9]} signed peakColor="#ab1612" overLedWidth="40" overLedText="OVER" overLedColor="#452112" linear overLedLabel="dB" />
        <Ppm width="800" height="140" backgroundColor="#141414" margin="10px" ledColor = '#fd7d00' al="-18" alIndication="-18" pml="-9" ledSegments="140" largeScaleMarks={[0, -5, -10, -15, -20, -25, -30, -35, -40, -50, -60]} smallScaleMarks={[ -1, -2, -3, -4, -6, -7, -8, -9, -11, -12, -13, -14, -16, -17, -18, -19, -45]} peakColor="#ab1612" overLedWidth="14" overLedColor="#c30200" overLedLabel="OVR" />
        <Ppm width="800" height="140" backgroundColor="#141414" margin="10px" ledColor = '#fd7d00' al="-18" alIndication="-18" pml="0" ledSegments="140" largeScaleMarks={[0, -5, -10, -15, -20, -25, -30, -35, -40, -50, -60]} smallScaleMarks={[-1, -2, -3, -4, -6, -7, -8, -9, -11, -12, -13, -14, -16, -17, -18, -19, -45]} peakColor="#ab1612" overLedWidth="14" overLedColor="#c30200" overLedLabel="OVR" />
      </div>
    );
  }
}

export default App;
