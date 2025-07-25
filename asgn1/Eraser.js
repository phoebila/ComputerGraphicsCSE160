//declaring the Eraser class
class Eraser{
  constructor(){
    this.type = 'Eraser';
    this.position = [0.0, 0.0, 0.0];
    this.color = [0.0, 0.0, 0.0, 1.0];
    this.size = 5.0;
    this.segments = 10; //pass variable 
  }
  render() {
    var xy = this.position;
    var rgba = this.color;
    var size = this.size;

    // Quit using the buffer to send the attribute 
    gl.disableVertexAttribArray(a_Position);
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([xy[0], xy[1]]), gl.DYNAMIC_DRAW);

    // Pass the position of a point to a_Position variable
    gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

    // Pass the color of a point to u_Size variable
    gl.uniform1f(u_Size, size);

    // Draw
    gl.drawArrays(gl.POINTS, 0, 1);
    // drawTriangle([0, 0.5,   -0.5, -0.5,   0.5, -0.5]);
    // drawTriangle([0.8, 0.9,   .7, .8,   .8, .7]);
    // drawTriangle([0.0, 0.0,   .5, 0,   .5, .5]);
  }
}