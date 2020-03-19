import React, { Component } from 'react';

function createContainer(props) {
  const { width, height, backgroundColor, ledColor, pml, ledSegments, largeScaleMarks, al, alIndication, signed, smallScaleMarks, peakColor, overLedWidth, overLedText, overLedColor, overLedLabel, linear } = props;
  
  // const dbToMeter = db => - 1 * (Math.log(Math.abs(db - 50)) * 750) + 3650;
  
  const dbToMeter = db => {
    const offsetLeft = 0.10;
    const offsetRight = 0.12;
    const segmentWidth = (1 - (offsetLeft + offsetRight)) * width;
    if (linear) {
      return (Number(db) + Math.abs(Math.min(...largeScaleMarks))) * (segmentWidth / (Math.max(...largeScaleMarks) + Math.abs(Math.min(...largeScaleMarks)))) + (offsetLeft * width);
    }
    return -1 * Math.log(  280 + segmentWidth -    (Number(db) + Math.abs(Math.min(...largeScaleMarks))) * (segmentWidth / (Math.max(...largeScaleMarks) + Math.abs(Math.min(...largeScaleMarks)))) + (offsetLeft * width)) * 625 + 486 * 9;
  }

  var xmlns = "http://www.w3.org/2000/svg";
  const svgElem = document.createElementNS(xmlns, "svg");
  svgElem.setAttribute("width", width);
  svgElem.setAttribute("height", height);
  svgElem.style.display = "block";

  /* Create border */
  const defs = document.createElementNS(xmlns, "defs");

  const gradients = [
    { id: 'grad1', x1: '0%', y1: '0%', x2: '100%', y2: '0%' },
    { id: 'grad2', x1: '100%', y1: '0%', x2: '0%', y2: '0%' },
    { id: 'grad3', x1: '0%', y1: '100%', x2: '0%', y2: '0%' },
    { id: 'grad4', x1: '0%', y1: '0%', x2: '0%', y2: '100%' },
  ];

  gradients.forEach(gradient => {
    const linearGradient = document.createElementNS(xmlns, "linearGradient");
    linearGradient.setAttribute('id', gradient.id);
    linearGradient.setAttributeNS(null, 'x1', gradient.x1);
    linearGradient.setAttributeNS(null, 'y1', gradient.y1);
    linearGradient.setAttributeNS(null, 'x2', gradient.x2);
    linearGradient.setAttributeNS(null, 'y2', gradient.y2);
    const stop1 = document.createElementNS(xmlns,"stop");
    stop1.setAttribute('offset', '0%');
    stop1.style = 'stop-color:rgb(155,155,155);stop-opacity:1';
    linearGradient.appendChild(stop1);
    const stop2 = document.createElementNS(xmlns,"stop");
    stop2.setAttribute('offset', '10%');
    stop2.style = 'stop-color:rgb(0,0,0);stop-opacity:1';
    linearGradient.appendChild(stop2);
    defs.appendChild(linearGradient);
  });

  svgElem.appendChild(defs);

  const polygons = [
    { points: (height / 2) + ',' + (height / 2) + ' 0,0 0,' + height, gradientUrl: 'grad1' },
    { points: (width - 100) + ',' + (height / 2) + ' ' + width + ',0 ' + width + ',' + height, gradientUrl: 'grad2' },
    { points: (height / 2) + ',' + (height / 2) + ' ' + (width - 100) + ',' + (height / 2) + ' ' + width + ',' + height + ' 0,' + height, gradientUrl: 'grad3' },
    { points: (height / 2) + ',' + (height / 2) + ' ' + (width - 100) + ',' + (height / 2) + ' ' + width + ',0 0,0', gradientUrl: 'grad4' }
  ];

  polygons.forEach(polygon => {
    const pol1 = document.createElementNS(xmlns, "polygon");
    pol1.setAttribute('points', polygon.points);
    pol1.style.fill = 'url(#' + polygon.gradientUrl + ')';
    svgElem.appendChild(pol1);
  });

  /* Create background material */
  const pol2 = document.createElementNS(xmlns, "polygon");
  pol2.setAttributeNS(null, 'points', '10,10 ' + (width - 10) + ',10 ' + (width - 10) + ',' + (height - 10) + ' 10,' + (height - 10));
  pol2.setAttributeNS(null, 'fill', backgroundColor);
  svgElem.appendChild(pol2);

  // Create peak markers
  const createPeakMarkers = (tickHeight, offset) => {
    const centerLineHeight = 30 + offset * 2;
  
    const y1 = height/2 - (tickHeight + centerLineHeight/2);
    const y2 = height/2 + (tickHeight + centerLineHeight/2) - tickHeight;
    [y1, y2].forEach(y => {
      const dash = document.createElementNS(xmlns, "rect");
      dash.setAttribute('x', dbToMeter(pml));
      dash.setAttribute('y', y);
      dash.setAttribute('width', dbToMeter(Math.max(...largeScaleMarks)) - dbToMeter(pml));
      dash.setAttribute('height', tickHeight);
      dash.style.fill = peakColor;
      svgElem.appendChild(dash);
    });
  }

  /* Create ticks and labels material */
  const createLabels = (marks) => {
    marks.forEach(mark => {
      const scaleLabel = document.createElementNS(xmlns, "text");
      scaleLabel.setAttribute('x', dbToMeter(mark));
      scaleLabel.setAttribute('y', (height / 2) + 1);
      scaleLabel.style.fill = '#cecece';
      let label = '';
      if (signed) {
        if (mark < 0) {
          label = '-';
        } else {
          label = '+';
        }
      }
      Number(al) === mark ? label = alIndication : label += Math.abs(mark);
      scaleLabel.textContent = label;
      scaleLabel.setAttribute('text-anchor', 'middle');
      scaleLabel.setAttribute('dominant-baseline', 'middle');
      svgElem.appendChild(scaleLabel);
    });
  }

  const createMarks = (marks, tickHeight, tickWidth, offset) => {
    marks.forEach(mark => {
      const centerLineHeight = 30 + offset * 2;
  
      const y1 = height/2 - (tickHeight + centerLineHeight/2);
      const y2 = height/2 + (tickHeight + centerLineHeight/2) - tickHeight;
  
      [y1, y2].forEach(y => {
        const dash = document.createElementNS(xmlns, "rect");
        dash.setAttribute('x', dbToMeter(mark) - tickWidth/2);
        dash.setAttribute('y', y);
        dash.setAttribute('width', tickWidth);
        dash.setAttribute('height', tickHeight);
        dash.style.fill = '#cecece';
        svgElem.appendChild(dash);  
      });
    });
  }

  createPeakMarkers(11, (18-11));
  createLabels(largeScaleMarks);
  createMarks(largeScaleMarks, 18, 3, 0);
  createMarks(smallScaleMarks, 11, 1, (18-11));

  /* Create LEDs */
  const createLeds = (segments, ledHeight, ledWidth, offset, spillOverDb) => {
    const maxX = Math.max(...largeScaleMarks);
    const minX = Math.min(...largeScaleMarks) - spillOverDb;
    const spacing = (dbToMeter(maxX) - dbToMeter(minX)) / segments;
    const centerLineHeight = 30 + offset * 2;
      
    const y1 = height/2 - (ledHeight + centerLineHeight/2);
    const y2 = height/2 + (ledHeight + centerLineHeight/2) - ledHeight;

    [y1, y2].forEach(y => {
      for (let k = 0; k < segments * spacing; k = k + spacing) {
        const led = document.createElementNS(xmlns, "rect");
        led.setAttribute('x', k + dbToMeter(minX)); 
        led.setAttribute('y', y);
        led.setAttribute('width', ledWidth);
        led.setAttribute('height', ledHeight);
        dbToMeter(pml) > k + dbToMeter(minX)  + 2 ? led.style.fill = ledColor : led.style.fill = 'red';
        svgElem.appendChild(led);   
      }
    });
  }

  createLeds(ledSegments, 14, 2, 23, 2);

  const createOverLeds = (ledHeight, ledWidth, offset) => {
    const centerLineHeight = 30 + offset * 2;
    const maxX = Math.max(...largeScaleMarks);
    const y1 = height/2 - (ledHeight + centerLineHeight/2);
    const y2 = height/2 + (ledHeight + centerLineHeight/2) - ledHeight;
    const borderWidth = 0; // TODO: Move border outside of svg as a separate repository

    const overLedTextLineHeight = 18;

    [y1, y2].forEach(y => {
      const led = document.createElementNS(xmlns, "rect");
      led.setAttribute('x', (((width - borderWidth) - dbToMeter(maxX)) / 2) + dbToMeter(maxX) - ledWidth/2); 
      led.setAttribute('y', y);
      led.setAttribute('width', ledWidth);
      led.setAttribute('height', ledHeight);
      led.style.fill = 'darkRed';
      svgElem.appendChild(led);
      if (overLedText) {
        const txt = document.createElementNS(xmlns, "text");
        txt.setAttribute('x', (((width - borderWidth) - dbToMeter(maxX)) / 2) + dbToMeter(maxX)); 
        txt.setAttribute('y', y + overLedTextLineHeight/2);
        txt.setAttribute('font-family', 'Arial');
        txt.setAttribute('font-size', '12');
        txt.style.fill = overLedColor;
        txt.textContent = overLedText;
        txt.setAttribute('text-anchor', 'middle');
        txt.setAttribute('dominant-baseline', 'middle');
        svgElem.appendChild(txt);
      }
    });
    if (overLedLabel) {
      const txt = document.createElementNS(xmlns, "text");
      txt.setAttribute('x', (((width - borderWidth) - dbToMeter(maxX)) / 2) + dbToMeter(maxX)); 
      txt.setAttribute('y', height/2);
      txt.setAttribute('font-family', 'Arial');
      txt.setAttribute('font-size', '12');
      txt.style.fill = 'white';
      txt.textContent = overLedLabel;
      txt.setAttribute('text-anchor', 'middle');
      txt.setAttribute('dominant-baseline', 'middle');
      svgElem.appendChild(txt);      
    }
  }

  createOverLeds(14, overLedWidth, 23);

  return svgElem;
}

class Ppm extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.myPpm = React.createRef();
  }

  componentDidMount() {
    this.myPpm.current.appendChild(createContainer(this.props));
  }

  render() {
    return (
      <div ref={this.myPpm} style={{ margin: this.props.margin }} />
    );
  }
};

export default Ppm;
