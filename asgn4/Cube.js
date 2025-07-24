//declaring the Circle class
class Cube{
  constructor(){
    this.type = 'Cube';
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.matrix = new Matrix4();
    this.normalMatrix = new Matrix4();
    this.vertices = null;
    this.cubeBuff = null;

    this.UVbuff = null;
    this.UVvert = null;

    this.textureVal = -2;

    this.buffNorm = null;
    this.normals = null;
  }

  generateCubeSides(){
    this.vertices = new Float32Array([0,0,0, 1,1,0, 1,0,0,  0,0,0, 0,1,0, 1,1,0,    // Front
                                        0,0,1, 1,1,1, 1,0,1,  0,0,1, 0,1,1, 1,1,1,    // Back
                                        0,1,0, 1,1,1, 1,1,0,  0,1,0, 0,1,1, 1,1,1,    // Top
                                        0,0,0, 1,0,1, 1,0,0,  0,0,0, 0,0,1, 1,0,1,    // Bottom
                                        0,0,0, 0,1,1, 0,0,1,  0,0,0, 0,1,0, 0,1,1,    // Left
                                        1,0,0, 1,1,1, 1,0,1,  1,0,0, 1,1,0, 1,1,1]);  // Right
  }

  generateUVcoords(){

    this.UVvert = new Float32Array([0,0, 1,1, 1,0,  0,0, 0,1, 1,1,    // Front
                                1,0, 0,1, 0,0,  1,0, 1,1, 0,1,        // Back
                                0,0, 1,1, 1,0,  0,0, 0,1, 1,1,        // Top
                                0,1, 1,0, 1,1,  0,1, 0,0, 1,0,        // Bottom
                                1,0, 0,1, 0,0,  1,0, 1,1, 0,1,        // Left
                                0,0, 1,1, 1,0,  0,0, 0,1, 1,1]);      // Right

  }
  
  generateNormals() {
    this.normals = new Float32Array([0,0,-1, 0,0,-1, 0,0,-1,  0,0,-1, 0,0,-1, 0,0,-1,    // Front
                                     0,0,1, 0,0,1, 0,0,1,  0,0,1, 0,0,1, 0,0,1,          // Back
                                     0,1,0, 0,1,0, 0,1,0,  0,1,0, 0,1,0, 0,1,0,          // Top
                                     0,-1,0, 0,-1,0, 0,-1,0,  0,-1,0, 0,-1,0, 0,-1,0,    // Bottom
                                     -1,0,0, -1,0,0, -1,0,0,  -1,0,0, -1,0,0, -1,0,0,    // Left
                                     1,0,0, 1,0,0, 1,0,0,  1,0,0, 1,0,0, 1,0,0]);        // Right
  }

  render() {
    var rgba = this.color;

    // pass texture numbr
    gl.uniform1i(u_whichTexture, this.textureVal);

    // Pass the color of a Cube to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

    // // Pass the size of a Circle to u_Size variable
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    // GENERATING VERTICES -------------------------------------------------------------
    if (this.vertices == null){
      this.generateCubeSides();
    }

    if (this.UVvert == null){
      this.generateUVcoords();
    }

    // Generate Normal coords
    if(this.normals == null) {
      this.generateNormals();
    }

    // CREATING CUBE BUFF ---------------------------------------------------------
    if (this.cubeBuff == null){
      this.cubeBuff = gl.createBuffer();
      if (!this.cubeBuff){
        console.log("Failed to cube buffer");
        return -1;
      }
    }

    // CREATING UV BUFF ---------------------------------------------------------
    if (this.UVbuff == null){
      this.UVbuff = gl.createBuffer();
      if (!this.UVbuff){
        console.log("Failed to create uv buffers");
        return -1;
      }
    }

    // CREATING NORMAL BUFF ------------------------------------------------------
    if (this.buffNorm === null) {
      this.buffNorm = gl.createBuffer();
      if (!this.buffNorm) {
        console.log("Failed to create the normal buffer object");
        return -1;
      }
    }

    // Draw Cube with texture mapped by UV Coords
    drawCubeNormal(this.cubeBuff, this.vertices, this.UVbuff, this.UVvert, this.buffNorm, this.normals);


    if (this.textureVal != -3){
      // draw UV mapped cube
      drawCubeUV(this.UVbuff, this.cubeBuff, this.vertices, this.UVvert);
    }
    if (this.textureVal == -3){

      drawCube(this.cubeBuff, this.vertices.slice(0,36));

      //fake lighting
      gl.uniform4f(u_FragColor, rgba[0]+.2, rgba[1]+.2, rgba[2]+.2, rgba[3]);
      drawCube(this.cubeBuff, this.vertices.slice(36,72));
      // draw other sides of triangle

      //fake lighting
      gl.uniform4f(u_FragColor, rgba[0]*.9, rgba[1]*.9, rgba[2]*.9, rgba[3]);
      drawCube(this.cubeBuff, this.vertices.slice(72));
    }
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

function drawCubeUV(uvbuffer, objbuffer, objVert, uv){

  // BUFFER OBJ -----------------------------------
  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, objbuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, objVert, gl.DYNAMIC_DRAW);
 
  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);


  // UV BUFFER -------------------------------------
  // Bind the buffer UV object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, uvbuffer);
  // Write date into the buffer UV object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.DYNAMIC_DRAW);
 
  // Assign the buffer UV object to a_UV variable
  gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_UV variable
  gl.enableVertexAttribArray(a_UV);

  // DRAW
  gl.drawArrays(gl.TRIANGLES, 0, objVert.length/3);

}

function drawCubeNormal(buffer, vertices, uvBuffer, uv, normBuffer, normals) {
  //For Vertices
  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);

  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);


  // For UV
  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);

  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, uv, gl.DYNAMIC_DRAW);

  // Assign the buffer object to a_UV variable
  gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_UV variable
  gl.enableVertexAttribArray(a_UV);


  // For Normals  
  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, normBuffer);

  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, normals, gl.DYNAMIC_DRAW);

  // Assign the buffer object to a_UV variable
  gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_UV variable
  gl.enableVertexAttribArray(a_Normal);


  // Draw Everything
  gl.drawArrays(gl.TRIANGLES, 0, vertices.length/3);
}