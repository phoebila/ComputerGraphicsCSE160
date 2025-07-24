//declaring the Circle class
class Circle{
  constructor(){
    this.type = 'Circle';
    this.position = [0.0, 0.0, 0.0];
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.size = 5.0;
    this.segments = 10; //pass variable 
  }
  render() {
    var xy = this.position;
    var rgba = this.color;
    var size = this.size;

    // Pass the position of a Circle to a_Position variable
    // gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);

    // Pass the color of a Circle to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

    // Pass the size of a Circle to u_Size variable
    gl.uniform1f(u_Size, size);

    // Draw
    var d = this.size/200;
    let angleStep = 360/this.segments;
    for (var angle = 0; angle < 360; angle = angle+angleStep){

      let centerPt = [xy[0], xy[1]];

      let angle1 = angle;
      let angle2 = angle + angleStep;

      let v1 = [Math.cos(angle1*Math.PI/180)*d,  Math.sin(angle1*Math.PI/180)*d];
      let v2 = [Math.cos(angle2*Math.PI/180)*d,  Math.sin(angle2*Math.PI/180)*d];

      let p1 = [centerPt[0]+v1[0], centerPt[1]+v1[1]];
      let p2 = [centerPt[0]+v2[0], centerPt[1]+v2[1]];

      drawTriangle([ xy[0], xy[1], p1[0], p1[1], p2[0], p2[1]] );
    }

  }
}