//declaring the Circle class
class Cube{
  constructor(){
    this.type = 'Cube';
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.matrix = new Matrix4();
    this.vertices = null;
    this.frontBackBuff = null;
    this.leftRightBuff = null;
    this.topBottomBuff = null;
  }

  generateCubeSides(){
    let verts = [];

    // front
    verts.push(0,0,0, 1,1,0, 1,0,0);
    verts.push(0,0,0, 0,1,0, 1,1,0);

    //back
    verts.push(1,1,1, 0,0,1, 0,1,1);
    verts.push(1,0,1, 1,1,1, 0,0,1);

    //top
    verts.push(0,1,0, 0,1,1, 1,1,1);
    verts.push(0,1,0, 1,1,1, 1,1,0);

    //bottom
    verts.push(0,0,0, 0,0,1, 1,0,1);
    verts.push(1,0,1, 0,0,0, 1,0,0);

    //left
    verts.push(0,0,1, 0,1,1, 0,0,0);
    verts.push(0,1,0, 0,0,0, 0,1,1);

    //right
    verts.push(1,0,1, 1,1,1, 1,0,0);
    verts.push(1,1,0, 1,0,0, 1,1,1);

    this.vertices = new Float32Array(verts);
  }

  render() {
    // var xy = this.position;
    var rgba = this.color;
    // var size = this.size;

    // Pass the color of a Cube to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

    // // Pass the size of a Circle to u_Size variable
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    if (this.vertices == null){
      this.generateCubeSides();
    }

    //creating cube side buffers
    if (this.frontBackBuff == null){
      this.frontBackBuff = gl.createBuffer();
      if (!this.frontBackBuff){
        console.log("Failed to create front and back buffer");
        return -1;
      }
    }

    if (this.leftRightBuff == null){
      this.leftRightBuff = gl.createBuffer();
      if (!this.leftRightBuff){
        console.log("Failed to create side buffers");
        return -1;
      }
    }

    if (this.topBottomBuff == null){
      this.topBottomBuff = gl.createBuffer();
      if (!this.topBottomBuff){
        console.log("Failed to create side buffers");
        return -1;
      }
    }

    drawCube(this.frontBackBuff, this.vertices.slice(0,36));

    //fake lighting
    gl.uniform4f(u_FragColor, rgba[0]+.2, rgba[1]+.2, rgba[2]+.2, rgba[3]);
    drawCube(this.topBottomBuff, this.vertices.slice(36,72));
    // draw other sides of triangle

    //fake lighting
    gl.uniform4f(u_FragColor, rgba[0]*.9, rgba[1]*.9, rgba[2]*.9, rgba[3]);
    drawCube(this.leftRightBuff, this.vertices.slice(72));
    
  }
}

function drawCube(buffer, matrix){

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, matrix, gl.DYNAMIC_DRAW);
 
  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  gl.drawArrays(gl.TRIANGLES, 0, matrix.length/3);
}