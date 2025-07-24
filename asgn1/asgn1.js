// Phoebe Royer
// Asgn1

// Vertex shader program
var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform float u_Size;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = u_Size;
  }`

// Fragment shader program
var FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }`

// GLOBAL VARIABLES ------------------------
let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_Size;

function setupWebGL(){
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  gl = getWebGLContext(canvas);
  // gl = canvas.getContext("webgl", {perserveDrawingBuffer: true});
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
}

function variable2GLSL(){
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  // Get the storage location of u_Size
  u_Size = gl.getUniformLocation(gl.program, 'u_Size');
  if (!u_Size) {
    console.log('Failed to get the storage location of u_Size');
    return;
  }
}

// setting up actions for html ui elements

// CONSTANTS -----------
const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;
const ERASER = 3;

// GLOBAL UI ELEMENTS ---------------------------
let g_selectedColor = [1.0, 1.0, 1.0, 1.0];
let g_Selectedsize = 5;
let g_SelectedSeg = 10;
let g_selectedType=POINT;

function addAction4HTML(){
  // button events
  // document.getElementById('green').onclick = function() {g_selectedColor = [0.0, 1.0, 0.0, 1.0]; };
  // document.getElementById('red').onclick = function() {g_selectedColor = [1.0, 0.0, 0.0, 1.0]; };

  //clear button event
  document.getElementById('clear').onclick = function() {g_shapesList = []; renderShapes()};

  // addition
  document.getElementById('eraser').onclick = function() {g_selectedType = ERASER};

  // Shape buttons
  document.getElementById('triangles').onclick = function() {g_selectedType = TRIANGLE};
  document.getElementById('squares').onclick = function() {g_selectedType = POINT};
  document.getElementById('circles').onclick = function() {g_selectedType = CIRCLE};


  // slider events
  document.getElementById('redSlide').addEventListener('mouseup', function() {g_selectedColor[0] = this.value/100; });
  document.getElementById('greenSlide').addEventListener('mouseup', function() {g_selectedColor[1] = this.value/100; });
  document.getElementById('blueSlide').addEventListener('mouseup', function() {g_selectedColor[2] = this.value/100; });

  //shape size event
  document.getElementById('sizeSlide').addEventListener('mouseup', function() {g_Selectedsize = this.value; });
  document.getElementById('segmentsSlide').addEventListener('mouseup', function() {g_SelectedSeg = this.value; });

}

function main() {
  
  setupWebGL();
  variable2GLSL();
  
  // setting up actions for html ui elements
  addAction4HTML();

  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = click;
  canvas.onmousemove = function(ev) {if(ev.buttons == 1) {click(ev)}};

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
}

var g_shapesList = []

// var g_points = [];  // The array for the position of a mouse press
// var g_colors = [];  // The array to store the color of a point
// var g_sizes = [];   // The array to store the size of a point

function click(ev) {
  
  // extracting the event click and return the WebGL coords
  let [x, y] = convertCoords(ev);

  // Store the coordinates to g_points array
  let point;
  if (g_selectedType == POINT){
    point = new Point();
  }
  else if (g_selectedType == TRIANGLE){
    point = new Triangle();
  }
  else if (g_selectedType == ERASER){
    point = new Eraser();
  }
  else{
    point = new Circle();
  }
  point.position = [x, y];
  point.color = g_selectedColor.slice();
  
  if (g_selectedType == ERASER){
    point.color = [0.0, 0.0, 0.0, 1.0];
  }

  point.size = g_Selectedsize;
  point.segments = g_SelectedSeg;
  g_shapesList.push(point);

  // //pushing selected color from buttons
  // g_colors.push(g_selectedColor.slice());

  // // pushing selected size
  // g_sizes.push(g_Selectedsize);

  // Draw every shape thats supposed to be on canvas
  renderShapes();
  
}

// extracting the event click and return the WebGL coords
function convertCoords(ev){
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
  return([x,y]);
}

// Draw every shape thats supposed to be on canvas 
function renderShapes(){

  // Checking time at start
  var startTime = performance.now();

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  var len = g_shapesList.length;
  for(var i = 0; i < len; i++) {
    g_shapesList[i].render();
  }

  // Checking time at the end, shown in console! commented out since it lags the page
  var duration = performance.now() + startTime;
  // console.log("numdot: " + len + ", ms: " + Math.floor(duration) + ", fps: " + Math.floor(1000/duration));
}

