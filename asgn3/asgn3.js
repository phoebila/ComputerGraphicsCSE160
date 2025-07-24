// Phoebe Royer
// Asgn3

// Vertex shader program
var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotateMatrix;

  attribute vec2 a_UV;
  varying vec2 v_UV;

  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;

  void main() {
    gl_Position =  u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
    v_UV = a_UV;
  }`

// Fragment shader program
var FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;

  varying vec2 v_UV;

  uniform sampler2D u_Sampler0;
  uniform sampler2D u_Sampler1;
  uniform sampler2D u_Sampler2;

  uniform int u_whichTexture;
  void main() {
    // Use Color
    if (u_whichTexture == -2 || u_whichTexture == -3) {
      gl_FragColor = u_FragColor;
    }
    // Use UV Debug Color
    else if (u_whichTexture == -1) {
      gl_FragColor = vec4(v_UV,1.0,1.0);
    }
    // Use Textures
    else if (u_whichTexture == 0) {
      gl_FragColor = texture2D(u_Sampler0, v_UV);
    }
    else if (u_whichTexture == 1){
      gl_FragColor = texture2D(u_Sampler1, v_UV);
    }
    else if (u_whichTexture == 2){
      gl_FragColor = texture2D(u_Sampler2, v_UV);
    }
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

let a_UV;
let u_Sampler0;
let u_Sampler1;
let u_Sampler2;
let u_whichTexture;

// Camera Globals
var camera = new Camera();
let c_Forward = false;
let c_Backward = false;
let c_Left = false;
let c_Right = false;
let c_PanLeft = false;
let c_PanRight = false;

function setupWebGL(){
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  // gl = getWebGLContext(canvas);
  gl = canvas.getContext("webgl", {perserveDrawingBuffer: true});
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

  a_UV = gl.getAttribLocation(gl.program, 'a_UV');
  if (a_UV < 0) {
    console.log('Failed to get the storage location of a_UV');
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

  // Get the storage location of u_Sampler0
  u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
  if (!u_Sampler0) {
    console.log('Failed to get the storage location of u_Sampler0');
    return false;
  }

  // Get the storage location of u_Sampler1
  u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
  if (!u_Sampler1) {
    console.log('Failed to get the storage location of u_Sampler1');
    return false;
  }

  // Get the storage location of u_Sampler2
  u_Sampler2 = gl.getUniformLocation(gl.program, 'u_Sampler2');
  if (!u_Sampler2) {
    console.log('Failed to get the storage location of u_Sampler2');
    return false;
  }

  u_whichTexture = gl.getUniformLocation(gl.program, 'u_whichTexture');
  if (!u_whichTexture) {
    console.log('Failed to get the storage location of u_whichTexture');
    return false;
  }

    // Get the storage location of u_ProjectionMatrix
    u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
    if (!u_ProjectionMatrix) {
      console.log('Failed to get the storage location of u_ProjectionMatrix');
      return;
    }
  
    // Get the storage location of u_ViewMatrix
    u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
    if (!u_ViewMatrix) {
      console.log('Failed to get the storage location of u_ViewMatrix');
      return;
    }

  var identityM = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
  
}

function initTextures() {
  var image = new Image();  // Create the image object
  if (!image) {
    console.log('Failed to create the image object');
    return false;
  }
  var imageGround = new Image();
  if (!imageGround) {
    console.log('Failed to create the imageGround object');
    return false;
  }
  var imageFur = new Image();
  if (!imageFur) {
    console.log('Failed to create the imageGround object');
    return false;
  }

  // Register the event handler to be called on loading an image
  image.onload = function(){ loadTexture0(image); };
  imageGround.onload = function() {loadTexture1(imageGround); };
  imageFur.onload = function() {loadTexture2(imageFur); };

  // Tell the browser to load an image
  image.src = 'Dirt_Block.jpg';
  imageGround.src = 'Grass_Block.jpg';
  imageFur.src = 'Orange_Wool_29_JE3_BE3.jpg'

  return true;
}

function loadTexture0(image) {
  var texture0 = gl.createTexture();   // Create a texture0 object
  if (!texture0) {
    console.log('Failed to create the texture0 object');
    return false;
  }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
  // Enable texture unit0
  gl.activeTexture(gl.TEXTURE0);
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture0);

  // Set the texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Set the texture image
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  
  // Set the texture unit 0 to the sampler
  gl.uniform1i(u_Sampler0, 0);
}

function loadTexture1(image) {
  var texture1 = gl.createTexture();   // Create a texture0 object
  if (!texture1) {
    console.log('Failed to create the texture1 object');
    return false;
  }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
  // Enable texture unit0
  gl.activeTexture(gl.TEXTURE1);
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture1);

  // Set the texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  // Set the texture image
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  
  // Set the texture unit 1 to the sampler
  gl.uniform1i(u_Sampler1, 1);
}

function loadTexture2(image) {
  var texture2 = gl.createTexture();   // Create a texture0 object
  if (!texture2) {
    console.log('Failed to create the texture0 object');
    return false;
  }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
  // Enable texture unit0
  gl.activeTexture(gl.TEXTURE2);
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture2);

  // Set the texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Set the texture image
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  
  // Set the texture unit 0 to the sampler
  gl.uniform1i(u_Sampler2, 2);
}

// GLOBAL UI ELEMENTS ---------------------------
let g_globalAngle=0;
let g_headAngle = 0;
let g_tailAngle = 0;
let g_globalX = 0; //-2
let g_globalY = 0;
let g_poke = false;
let g_tailTopAngle = true;

let g_tailAnim = true;
let g_headAnim = true;

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

  // init textures
  initTextures(gl, 0);

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // camera movement
  canvas.onmousedown = click;
  canvas.onmousemove = function(ev) {if(ev.buttons == 1) {click(ev)}};

  document.onkeydown = keydown;
  document.onkeyup = keyup;

  // starting camera overlook
  camera.eye.elements = ([-2, 0, -4]);
  camera.at.elements = ([8, 0, -4]);
  camera.up.elements = ([0, 1, 0]);

  // Clear <canvas>
  // gl.clear(gl.COLOR_BUFFER_BIT);

  requestAnimationFrame(tick); //used for animation
  // renderShapes();
}

var g_startTime = performance.now()/1000;
var g_seconds = performance.now()/1000-g_startTime;

function click(ev){
  // console.log("eye", camera.eye.elements, "\nat", camera.at.elements, "\nup", camera.up.elements);
  // console.log("global x", g_globalX, "\nglobal y", g_globalY);

  if(ev.buttons == 1) {
    g_globalX = -ev.movementX;
    camera.mousePan(g_globalX);
  }
  if (ev.shiftKey){
    g_poke = true;
  }
}

function keydown(ev){
  if(ev.keyCode == 87) { // W
    c_Forward = true;
  }
  if(ev.keyCode == 83) { // S
    c_Backward = true;
  }
  if(ev.keyCode == 65) { // A
    c_Left = true;
  }
  if(ev.keyCode == 68) { // D
    c_Right = true;
  }
  if(ev.keyCode == 81) { // Q
    c_PanLeft = true;
  }
  if(ev.keyCode == 69) { // E
    c_PanRight = true;
  }

}

function keyup(ev){
  if(ev.keyCode == 87) { // W
    c_Forward = false;
  }
  if(ev.keyCode == 83) { // S
    c_Backward = false;
  }
  if(ev.keyCode == 65) { // A
    c_Left = false;
  }
  if(ev.keyCode == 68) { // D
    c_Right = false;
  }
  if(ev.keyCode == 81) { // Q
    c_PanLeft = false;
  }
  if(ev.keyCode == 69) { // E
    c_PanRight = false;
  }
}

function updateCamera(){
  // Pass the projection matrix
  var projMat = new Matrix4();
  projMat.setPerspective(camera.fov, canvas.width/canvas.height, 0.1, 2000);
  gl.uniformMatrix4fv(u_ProjectionMatrix, false, projMat.elements);

  // Pass the view matrix
  var viewMat = new Matrix4();
  viewMat.setLookAt(camera.eye.elements[0],camera.eye.elements[1],camera.eye.elements[2], camera.at.elements[0],camera.at.elements[1],camera.at.elements[2], camera.up.elements[0],camera.up.elements[1],camera.up.elements[2]);
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMat.elements);

  if(c_Forward == true) {
    camera.moveForward();
  }
  if(c_Backward == true) {
    camera.moveBackward();
  }
  if(c_Left == true) {
    camera.moveLeft();
  }
  if(c_Right == true) {
    camera.moveRight();
  }
  if(c_PanLeft == true) {
    camera.panLeft();
  }
  if(c_PanRight == true) {
    camera.panRight();
  }
}

function tick(){

  //print some info
  g_seconds=performance.now()/1000-g_startTime;
  // console.log(performance.now());

  //update animation angles 
  updateAnimationAngles();

  //update camera 
  updateCamera();

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

  // global matrix
  var globalRotMat = new Matrix4().rotate(g_globalY, 1, 0, 0); //click n drag camera
  globalRotMat.rotate(g_globalX, 0, 1, 0); //click n drag camera
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

  // DRAW KITTY
  drawKitty();

  // DRAW WORLD
  drawWorld();

  // DRAW MAP
  drawMap();

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

function drawWorld(){

  // drawing ground
  var ground = new Cube();
  ground.color = [.33, .42, .18, 1];
  ground.textureVal = 1;
  ground.matrix.translate(-15,-.28,-25);
  ground.matrix.scale(130,0,130);
  ground.render();

  //drawing skybox
  var skyBox = new Cube();
  skyBox.color = [.43, .69, 1, 1];
  skyBox.matrix.translate(-10.5, -15,-13.65);
  skyBox.matrix.scale(620,320,620);
  skyBox.render();
}


var g_map = [
  // [1, 1, 1, 1, 1, 1, 1, 1], //front
  // [1, 0, 0, 0, 0, 0, 0, 1],
  // [1, 0, 0, 0, 0, 0, 0, 1],
  // [1, 0, 0, 2, 1, 0, 0, 1],
  // [1, 0, 0, 0, 0, 0, 0, 1],
  // [1, 0, 0, 0, 0, 0, 0, 1],
  // [1, 0, 0, 0, 1, 0, 0, 1],
  // [1, 0, 0, 0, 0, 0, 0, 1], //back
  
  [1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //1
  [1,0,1,0,0,0,1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //2
  [1,0,1,0,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //3
  [1,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //4
  [1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //5
  [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //6
  [2,1,0,1,1,0,1,1,1,1,0,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //7
  [0,1,0,1,1,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //8
  [0,1,0,1,1,0,1,0,0,1,0,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //9
  [0,1,0,1,1,0,1,1,0,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //10
  [0,1,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //11
  [0,1,1,1,1,1,1,1,0,0,0,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //12
  [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //13
  [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //14
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //15
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //16
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //17
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //18
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //19
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //20
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //21
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //22
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //23 
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //24
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //25
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //26
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //27
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //28
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //29
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //30
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //31
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //32
];

function drawMap(){
  // var wall2 = new Cube();
  // var wall = new Cube();
  for (x = 0; x < 32; x++ ){
    for (y = 0; y < 32; y++){
      if (g_map[x][y] > 0){
        let z = g_map[x][y];
        for (i = 0; i < z; i++){
          var wall = new Cube();
          wall.matrix.scale(1,1,1);
          wall.textureVal = 0;
          wall.matrix.translate(x + -1.5, -.5, y + -5.5);
          if (g_map[x][y] > 1){
            var wall2 = new Cube();
            wall2.matrix.scale(1,1,1);
            wall2.textureVal = 0;
            wall2.matrix.translate(x + -1.5, .5, y + -5.5 );
            wall2.render();
          }
          wall.render();
        }
      }
    }
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
  leftEar.textureVal = 2;
  leftEar.matrix = earsMatrix; //attaches blocks to other blocks
  leftEar.matrix.translate(.10, 1, .5);
  leftEar.matrix.scale(.3, .3, .5);
  leftEar.render();

  // right ear
  var rightEar = new Cube();
  rightEar.color = ( [.98,.71,.24,1] );
  rightEar.textureVal = 2;
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
  body.textureVal = 2;
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