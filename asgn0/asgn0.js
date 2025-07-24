// Phoebe Royer
// CSE160 Spring 2023
// Asgn 0

let canvas = document.getElementById('example');  
let ctx = canvas.getContext('2d');

var centerX=canvas.width/2;
var centerY=canvas.height/2;

function main() {  
  if (!canvas) { 
    console.log('Failed to retrieve the <canvas> element');
    return false; 
  } 

  // Draw a black rectangle
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to black
  ctx.fillRect(0, 0, 400, 400);        // Fill a rectangle with the color full 400x400

  // v2 = new Vector3(150, 150, 0);
  // drawVector(v2, "green");
}

function drawVector(v, color){
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;


  // beginning path
  ctx.beginPath();
  ctx.moveTo(200,200);

  ctx.lineTo(centerX + v.elements[0] *20, centerY - v.elements[1] *20);
  ctx.stroke();
}

function handleDrawEvent(){

  // console.log("hello");
  // var canvas = document.getElementById('example');  
  // var ctx = canvas.getContext('2d');
  
  // clearing canvas
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to black
  ctx.fillRect(0, 0, 400, 400);        // Fill a rectangle with the color full 400x400

  // getting x and y coords
  var xCord = document.getElementById("x1").value;
  var yCord = document.getElementById("y1").value;

  var xCord2 = document.getElementById("x2").value;
  var yCord2 = document.getElementById("y2").value;

  // drawing new vector
  let v1 = new Vector3([xCord,yCord,0]);
  let v2 = new Vector3([xCord2,yCord2,0]);

  drawVector(v1, "red");
  drawVector(v2, "blue");

}

function handleDrawOperationEvent(){

  // clearing canvas
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to black
  ctx.fillRect(0, 0, 400, 400);        // Fill a rectangle with the color full 400x400

  // getting x and y coords
  var xCord = document.getElementById("x1").value;
  var yCord = document.getElementById("y1").value;

  var xCord2 = document.getElementById("x2").value;
  var yCord2 = document.getElementById("y2").value;

  // drawing new vector
  let v1 = new Vector3([xCord,yCord,0]);
  let v2 = new Vector3([xCord2,yCord2,0]);

  drawVector(v1, "red");
  drawVector(v2, "blue");

  var selection = document.getElementById("operation");
  var selectionOption = selection.options[selection.selectedIndex].text;
  // console.log(selectionOption);

  var scalar = document.getElementById("scalar").value;

  if (selectionOption == "Add"){
    let v3 = v1.add(v2);
    drawVector(v3, "green");
  }
  else if (selectionOption == "Subtract"){
    let v3 = v1.sub(v2);
    drawVector(v3, "green");
  }
  else if (selectionOption == "Multiply"){
    let v3 = v1.mul(scalar);
    drawVector(v3, "green");
    let v4 = v2.mul(scalar);
    drawVector(v4, "green");
  }
  else if (selectionOption == "Divide"){
    let v3 = v1.div(scalar);
    drawVector(v3, "green");
    let v4 = v2.div(scalar);
    drawVector(v4, "green");
  }
  else if (selectionOption == "Magnitude"){
    console.log("Magnitude v1: " + v1.magnitude());
    console.log("Magnitude v2: " + v2.magnitude());
  }
  else if (selectionOption == "Normalize"){
    let v3 = v1.normalize();
    drawVector(v3, "green");
    let v4 = v2.normalize();
    drawVector(v4, "green");
  }
  else if (selectionOption == "Angle between"){
    angleBetween(v1, v2);
  }
  else if (selectionOption == "Area"){
    areaTriangle(v1, v2);
  }
}

function angleBetween(v1, v2){
  // Vector3.dot(v1, v2);
  let theta = Vector3.dot(v1, v2) / (v1.magnitude() * v2.magnitude());
  theta = Math.acos(theta);
  theta = theta * 180 / Math.PI;
  console.log("Angle: " + theta);
}

function areaTriangle(v1, v2){
  let area = Vector3.cross(v1, v2);
  area = (area.magnitude()) / 2;
  console.log("Area: " + area);
}