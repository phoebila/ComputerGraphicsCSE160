//declaring the Circle class
class Cube{
  constructor(){
    this.type = 'Cube';
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.matrix = new Matrix4();
    this.vertices = null;
    this.cubeBuff = null;

    this.UVbuff = null;
    this.UVvert = null;

    this.textureVal = -2;

  }

  generateCubeSides(){
    let verts = [];

    // front
    verts = verts.concat([0,0,0, 1,1,0, 1,0,0]);
    verts = verts.concat([0,0,0, 0,1,0, 1,1,0]);

    //back
    verts = verts.concat([1,1,1, 0,0,1, 0,1,1]);
    verts = verts.concat([1,0,1, 1,1,1, 0,0,1]);

    //top
    verts = verts.concat([0,1,0, 0,1,1, 1,1,1]);
    verts.push(0,1,0, 1,1,1, 1,1,0);

    //bottom
    verts = verts.concat([0,0,0, 0,0,1, 1,0,1]);
    verts = verts.concat([1,0,1, 0,0,0, 1,0,0]);

    //left
    verts = verts.concat([0,0,1, 0,1,1, 0,0,0]);
    verts = verts.concat([0,1,0, 0,0,0, 0,1,1]);

    //right
    verts = verts.concat([1,0,1, 1,1,1, 1,0,0]);
    verts = verts.concat([1,1,0, 1,0,0, 1,1,1]);

    this.vertices = new Float32Array(verts);
  }

  generateUVcoords(){

    this.UVvert = new Float32Array([0,0, 1,1, 1,0,  0,0, 0,1, 1,1,    // Front of Cube
                                1,0, 0,1, 0,0,  1,0, 1,1, 0,1,        // Back of Cube
                                0,0, 1,1, 1,0,  0,0, 0,1, 1,1,        // Top of Cube
                                0,1, 1,0, 1,1,  0,1, 0,0, 1,0,        // Bottom of Cube
                                1,0, 0,1, 0,0,  1,0, 1,1, 0,1,        // Left of Cube
                                0,0, 1,1, 1,0,  0,0, 0,1, 1,1]);      // Right of Cube

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