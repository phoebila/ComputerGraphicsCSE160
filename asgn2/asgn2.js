// Phoebe Royer
// Asgn2

// Vertex shader program
var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotateMatrix;
  void main() {
    gl_Position = u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
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
let u_ModelMatrix;
let u_GlobalRotateMatrix;
var fps;

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

  gl.enable(gl.DEPTH_TEST);
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

  // Get the storage location of u_ModelMatrix
  u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if (!u_ModelMatrix){
    console.log('Failed to get the storage location of u_ModelMatrix');
  }

  // Get the storage location of u_GlobalRotateMatrix
  u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
  if (!u_GlobalRotateMatrix){
    console.log('Failed to get the storage location of u_GlobalRotateMatrix');
  }

  var identityM = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
  
}


// GLOBAL UI ELEMENTS ---------------------------
let g_globalAngle=0;
let g_headAngle = 0;
let g_tailAngle = 0;
let g_globalX = 45;
let g_globalY = 0;
let g_poke = false;
let g_tailTopAngle = false;

let g_tailAnim = false;
let g_headAnim = false;

function addAction4HTML(){

  //animation events
  document.getElementById('on').onclick = function() {g_tailAnim = true; g_headAnim = true; g_tailTopAngle = true;};
  document.getElementById('off').onclick = function() {g_tailAnim = false; g_headAnim = false; g_tailTopAngle = false;};

  document.getElementById('topOn').onclick = function() {g_tailTopAngle = true;};
  document.getElementById('topOff').onclick = function() {g_tailTopAngle = false;};

  document.getElementById('headOn').onclick = function() {g_headAnim = true;};
  document.getElementById('headOff').onclick = function() {g_headAnim = false;};

  document.getElementById('kittyQuiet').onclick = function() {g_poke = false;};

  // slider events
  document.getElementById('headSlide').addEventListener('mousemove', function() {g_headAngle = this.value; renderShapes(); });
  document.getElementById('tailSlide').addEventListener('mousemove', function() {g_tailAngle = this.value; renderShapes(); });

}

function main() {
  
  setupWebGL();
  variable2GLSL();
  
  // setting up actions for html ui elements
  addAction4HTML();

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  canvas.onmousedown = click;
  canvas.onmousemove = function(ev) {if(ev.buttons == 1) {click(ev)}};

  // Clear <canvas>
  // gl.clear(gl.COLOR_BUFFER_BIT);

  requestAnimationFrame(tick); //used for animation
  // renderShapes();
}

var g_startTime = performance.now()/1000;
var g_seconds = performance.now()/1000-g_startTime;

function click(ev){
  g_globalX -= ev.movementX;
  g_globalY -= ev.movementY;
  if (ev.shiftKey){
    g_poke = true;
  }
}

function tick(){

  //print some info
  g_seconds=performance.now()/1000-g_startTime;
  // console.log(performance.now());

  //update animation angles 
  updateAnimationAngles();

  // draw shapes
  renderShapes();

  // tell to update
  requestAnimationFrame(tick);

 }

// Draw every shape thats supposed to be on canvas 
function renderShapes(){

  // Checking time at start
  var startTime = performance.now();

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  var globalRotMat = new Matrix4().rotate(g_globalY, 1, 0, 0); //click n drag camera
  globalRotMat.rotate(g_globalX, 0, 1, 0); //click n drag camera
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

  // DRAW KITTY
  drawKitty();

  // Adding fps
  var duration = performance.now() - startTime;
  document.getElementById("fps").innerHTML = Math.floor(1000/duration);

}

var catMeow = new Audio('S3_sfx_pet_cat_vocal_02.ogg');
function updateAnimationAngles(){
  if (g_tailAnim){
    g_tailAngle = (45*Math.sin(g_seconds));
  }

  if (g_tailTopAngle){
    g_tailTopAngle = (45*Math.sin(2*g_seconds));
  }

  if (g_headAnim){
    g_headAngle = (15*Math.sin(.5*g_seconds));
  }

  if (g_poke){
    catMeow.play();
  }

}

function drawKitty(){
  
  // leftArm.matrix.rotate(-5, 1,0, 0); //backwards/forwards
  
  // leftArm.matrix.rotate(-g_yellowAngle, 0,0, 1); //side to side //NOT USED FOR ANIMATION


  //HEAD -------------------------------------
  var head = new Cube();
  head.color = ( [.97,.62,.23,1] );
  head.matrix.translate(-.1, -.001, -.6);
  head.matrix.rotate(-g_headAngle, -g_headAngle, 1, 0);
  head.matrix.scale(.2, .15, .2);
  var eyesMatrix = new Matrix4(head.matrix);
  head.render();

  // LEFT SIDE EYES -------------------------
  //eye W
  var eyesW = new Cube();
  eyesW.color = [1,1,1,1];
  eyesW.matrix = eyesMatrix;
  eyesW.matrix.translate(-.001,.6,-.01);
  eyesW.matrix.scale(.2, .2, .2);
  eyesW.render();

  // eye G
  var eyesG = new Cube();
  eyesG.color = [.26,.44,.04,1];
  eyesG.matrix = eyesMatrix;
  eyesG.matrix.translate(1,-.001,-.01);
  eyesG.matrix.scale(1.05, 1.05, 1.05);
  eyesG.render();

  // RIGHT SIDE EYES ------------------------
  //eye G
  var eyesWR = new Cube();
  eyesWR.color = [.26,.44,.04,1];
  eyesWR.matrix = eyesMatrix;
  eyesWR.matrix.translate(1.75,.05,-.01);
  eyesWR.matrix.scale(1, 1, 1);
  eyesWR.render();

  // eye W
  var eyesGR = new Cube();
  eyesGR.color = [1,1,1,1];
  eyesGR.matrix = eyesMatrix;
  eyesGR.matrix.translate(1, -.05,-.01);
  eyesGR.matrix.scale(1.05, 1.05, 1.05);
  eyesGR.render();
  
  // EARS ----------------
  var earsMatrix = new Matrix4(head.matrix);

  //left ear
  var leftEar = new Cube();
  leftEar.color = ( [.98,.71,.24,1] );
  leftEar.matrix = earsMatrix; //attaches blocks to other blocks
  leftEar.matrix.translate(.10, 1, .5);
  leftEar.matrix.scale(.3, .3, .5);
  leftEar.render();

  // right ear
  var rightEar = new Cube();
  rightEar.color = ( [.98,.71,.24,1] );
  rightEar.matrix = earsMatrix; //attaches blocks to other blocks
  rightEar.matrix.translate(1.7, 0, .001);
  rightEar.matrix.scale(1, 1, 1.01);
  rightEar.render();

  // MOUTH ----------------------
  var moufMatrix = new Matrix4(head.matrix);
  var mouth = new Cube();
  mouth.color = ( [1,.75,.29,1] );
  mouth.matrix = moufMatrix; //attaches blocks to other blocks
  mouth.matrix.translate(.155, .1, -.18);
  mouth.matrix.scale(.7, .4, .3);
  mouth.render();

  // NOSE -------------------------
  var noseMatrix = new Matrix4(head.matrix);
  var nose = new Cube();
  nose.color = ( [.61,.37,.37,1] );
  nose.matrix = noseMatrix; //attaches blocks to other blocks
  nose.matrix.translate(.37, .35, -.2);
  nose.matrix.scale(.2, .2, .2);
  nose.render();

  // BODY ----------------------
  var body = new Cube();
  body.color = ( [.99,.67,.26,1] );
  body.matrix.translate(-.1, -.15, -.5);
  body.matrix.scale(.2, .15, .55);
  body.render();

  // LEGS -----------------------------
  var fupMatrix = new Matrix4(body.matrix);
  var fRupMatrix = new Matrix4(body.matrix);

  var bupLeftMatrix = new Matrix4(body.matrix);
  var bupRightMatrix = new Matrix4(body.matrix);

  var frontLegLeft = new Matrix4(body.matrix);
  var frontLegRight = new Matrix4(body.matrix);

  var backLegLeft = new Matrix4(body.matrix);
  var backLegRight = new Matrix4(body.matrix);

  var tailMatrix = new Matrix4(body.matrix);

  // FRONT LEGS ---------------------------

  // FRONT UPPER LEFT LEG
  var fupLeftLeg = new Cube();
  fupLeftLeg.color = ( [.99,.71,.24,1] );
  fupLeftLeg.matrix = fupMatrix;
  fupLeftLeg.matrix.translate(.1, -.2, .05);
  fupLeftLeg.matrix.scale(.2, .5, .1);
  fupLeftLeg.render();

  //FRONT UPPER RIGHT LEG
  var fupRightLeg = new Cube();
  fupRightLeg.color = ( [.99,.71,.24,1] );
  fupRightLeg.matrix = fRupMatrix;
  fupRightLeg.matrix.translate(.7, -.2, .05);
  fupRightLeg.matrix.scale(.2, .5, .1);
  fupRightLeg.render();

  // FRONT LEFT LEG
  var leftLeg = new Cube();
  leftLeg.color = ( [.98,.89,.73,1] );
  leftLeg.matrix = frontLegLeft;
  leftLeg.matrix.translate(.1, -.5, .05);
  leftLeg.matrix.scale(.2, .8, .1);
  leftLeg.render();

  // FRONT RIGHT LEG
  var rightLeg = new Cube();
  rightLeg.color = ( [.98,.89,.73,1] );
  rightLeg.matrix = frontLegRight;
  rightLeg.matrix.translate(.7, -.5, .05);
  rightLeg.matrix.scale(.2, .8, .1);
  rightLeg.render();

  // BACK LEG ---------------------------------

  // BACK UPPER LEFT LEG
  var bupLeftLeg = new Cube();
  bupLeftLeg.color = ( [.99,.71,.24,1] );
  bupLeftLeg.matrix = bupLeftMatrix;
  bupLeftLeg.matrix.translate(.1, -.2, .8);
  bupLeftLeg.matrix.scale(.2, .5, .1);
  bupLeftLeg.render();

  //BACK UPPER RIGHT LEG
  var bupRightLeg = new Cube();
  bupRightLeg.color = ( [.99,.71,.24,1] );
  bupRightLeg.matrix = bupRightMatrix;
  bupRightLeg.matrix.translate(.7, -.2, .8);
  bupRightLeg.matrix.scale(.2, .5, .1);
  bupRightLeg.render();

  // BACK LEFT LEG
  var bleftLeg = new Cube();
  bleftLeg.color = ( [.98,.89,.73,1] );
  bleftLeg.matrix = backLegLeft;
  bleftLeg.matrix.translate(.1, -.5, .8);
  bleftLeg.matrix.scale(.2, .8, .1);
  bleftLeg.render();

  // BACK RIGHT LEG
  var brightLeg = new Cube();
  brightLeg.color = ( [.98,.89,.73,1] );
  brightLeg.matrix = backLegRight;
  brightLeg.matrix.translate(.7, -.5, .8);
  brightLeg.matrix.scale(.2, .8, .1);
  brightLeg.render();

  // TAIL ------------------------------
  var bottomTail = new Cube();
  bottomTail.color = ( [.99,.71,.24,1] );
  bottomTail.matrix = tailMatrix;
  bottomTail.matrix.translate(.45, .9, .95);
  bottomTail.matrix.rotate(-g_tailAngle, 0, 0, 1);
  bottomTail.matrix.scale(.2, 1.2, .1);
  bottomTail.render();

  var topTailM = new Matrix4(bottomTail.matrix);

  var topTail = new Cube();
  topTail.color = ( [.98,.89,.73,1] );
  topTail.matrix = topTailM;
  topTail.matrix.translate(.4, .9, .7);
  topTail.matrix.rotate(60, 60, 0, 0);
  topTail.matrix.rotate(-g_tailTopAngle, 0, 0, 1);
  topTail.matrix.scale(.5, 1.5, .3);
  topTail.render();


}