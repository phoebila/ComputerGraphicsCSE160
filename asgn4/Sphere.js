class Sphere {
  constructor() {
    this.type='Sphere';
    this.color=[1.0, 1.0, 1.0, 1.0];
    this.matrix = new Matrix4();
    this.cubeBuff = null;
    this.uvBuff = null;

    this.buffNorm = null;
    this.vertices = null;
    this.UVvert = null;
    this.normals = null;
    this.textureVal = -2;
    this.renderType = 0;
  }

  generateSphere() {
  var v = [];
  var UVvert = [];
  var d = Math.PI/25;
  var dd = Math.PI/25;
  for (var t = 0; t < Math.PI; t+=d) {
      for (var r = 0; r < (2 * Math.PI); r+= d) {
          // Bottom Right Triangle 
          // Vertices + Normals
          v.push(sin(t) * cos(r), sin(t) * sin(r), cos(t));
          v.push(sin(t+dd) * cos(r+dd), sin(t+dd) * sin(r+dd), cos(t+dd));
          v.push(sin(t) * cos(r+dd), sin(t) * sin(r+dd), cos(t));
          // UVs
          UVvert.push(t/Math.PI,r/(2*Math.PI));
          UVvert.push((t+dd)/Math.PI,(r+dd)/(2*Math.PI));
          UVvert.push(t/Math.PI,(r+dd)/(2*Math.PI));

          // Top Left Triangle
          // Vertices + Normals
          v.push(sin(t) * cos(r), sin(t) * sin(r), cos(t));
          v.push(sin(t+dd) * cos(r), sin(t+dd) * sin(r), cos(t+dd));
          v.push(sin(t+dd) * cos(r+dd), sin(t+dd) * sin(r+dd), cos(t+dd));
          // UVs
          UVvert.push(t/Math.PI,r/(2*Math.PI));
          UVvert.push((t+dd)/Math.PI,r/(2*Math.PI));
          UVvert.push((t+dd)/Math.PI,(r+dd)/(2*Math.PI));
      }
  }
  this.vertices = new Float32Array(v);
  this.UVvert = new Float32Array(UVvert);
  this.normals = new Float32Array(v);
  }

  genereateUVCoords() {
    this.UVvert = new Float32Array([0,0, 1,1, 1,0,  0,0, 0,1, 1,1,    // Front 
                                1,0, 0,1, 0,0,  1,0, 1,1, 0,1,    // Back 
                                0,0, 1,1, 1,0,  0,0, 0,1, 1,1,    // Top 
                                0,1, 1,0, 1,1,  0,1, 0,0, 1,0,    // Bottom 
                                1,0, 0,1, 0,0,  1,0, 1,1, 0,1,    // Left 
                                0,0, 1,1, 1,0,  0,0, 0,1, 1,1]);  // Right 
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

    // Pass the texture number
    gl.uniform1i(u_whichTexture, this.textureNum);

    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

    // Pass the matrix
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    // Creating vertex cubeBuff
    if (this.cubeBuff === null) {
      this.cubeBuff = gl.createBuffer();
      if (!this.cubeBuff) {
        console.log("Failed to create the vertex cubeBuff object");
        return -1;
      }
    }

    // Creating UVvert cubeBuff
    if (this.uvBuff === null) {
      this.uvBuff = gl.createBuffer();
      if (!this.uvBuff) {
        console.log("Failed to create the UVvert cubeBuff object");
        return -1;
      }
    }

    // Creating Normal cubeBuff
    if (this.buffNorm === null) {
      this.buffNorm = gl.createBuffer();
      if (!this.buffNorm) {
        console.log("Failed to create the normal cubeBuff object");
        return -1;
      }
    }

    // Generate Sphere
    if(this.vertices == null) {
      this.generateSphere();
    }

    if (this.textureNum != -3) {
      // Draw Cube with texture mapped by UVvert Coords
      drawCubeNormal(this.cubeBuff, this.vertices, this.uvBuff, this.UVvert, this.buffNorm, this.normals);
    }

    if (this.textureNum == -3) {
      // Draw Front and Back of Cube
      drawCube(this.cubeBuff, this.vertices.slice(0,36));

      // Draw Top and Bottom of Cube
      gl.uniform4f(u_FragColor, rgba[0]*0.9, rgba[1]*0.9, rgba[2]*0.9, rgba[3]);
      drawCube(this.cubeBuff, this.vertices.slice(36, 72));

      // Draw Left and Right of Cube
      gl.uniform4f(u_FragColor, rgba[0]*.8, rgba[1]*.8, rgba[2]*.8, rgba[3]);
      drawCube(this.cubeBuff, this.vertices.slice(72));
    }
  }
}

function drawCube(cubeBuff, matrix) {
  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuff);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, matrix, gl.DYNAMIC_DRAW);

  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  gl.drawArrays(gl.TRIANGLES, 0, matrix.length/3);
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


function sin(angle) {
  return Math.sin(angle);
}

function cos(angle) {
  return Math.cos(angle);
}