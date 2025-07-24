// create func that places drawing triangles using drawTriangles with specific coords, only when drawPic is hit
function phoebeDrawing(){
  setupWebGL();
  variable2GLSL();

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  var lightYel = [.92, 0.878, 0.68, 1.0]; // light yellow
  var darkYel = [.70, .52, .25, 1.0]; // dark yell
  var brown = [.55, .27, .075, 1.0];
  var gray = [.5, .5, .5, 1.0];
  var lightPink = [1.0, .71, .76, 1.0];
  var triSize = 12; //size of triangle

  // FRONT HIND LEG --------------------------------------------------
  // copy this to make diff shapes ------------
  point = new Triangle();
  //                 x     y     z
  point.position = [-0.4, -0.2, 0.8]; //put in coords
  point.color = lightYel // light yellow
  point.size = triSize; //put in size
  g_shapesList.push(point);
  // --------------------------------------------

  point1 = new Triangle();
  //                 x     y     z
  point1.position = [-0.40, -0.25, 0.8]; //put in coords
  point1.color = lightYel // light yellow
  point1.size = triSize; //put in size
  g_shapesList.push(point1);

  point2 = new Triangle();
  //                 x     y     z
  point2.position = [-0.40, -0.3, 0.8]; //put in coords
  point2.color = lightYel // light yellow
  point2.size = triSize; //put in size
  g_shapesList.push(point2);

  point3 = new Triangle();
  point3.position = [-0.32, -0.3, 0.8]; //put in coords
  point3.color = lightYel // light yellow
  point3.size = triSize; //put in size
  g_shapesList.push(point3);

  pointA = new Triangle();
  pointA.position = [-0.40, -0.15, 0.8]; //put in coords
  pointA.color = lightYel // light yellow
  pointA.size = triSize; //put in size
  g_shapesList.push(pointA);

  pointB = new Triangle();
  pointB.position = [-0.40, -0.07, 0.8]; //put in coords
  pointB.color = lightYel // light yellow
  pointB.size = triSize; //put in size
  g_shapesList.push(pointB);

  pointC = new Triangle();
  pointC.position = [-0.40, 0, 0.8]; //put in coords
  pointC.color = lightYel // light yellow
  pointC.size = triSize; //put in size
  g_shapesList.push(pointC);
  // FRONT HIND LEG --------------------------------------------------

  // BACK HIND LEG ---------------------------------------------------
  point4 = new Triangle();
  point4.position = [-0.65, -0.3, 0.8]; //put in coords
  point4.color = darkYel; // light yellow
  point4.size = triSize; //put in size
  g_shapesList.push(point4);

  point5 = new Triangle();
  point5.position = [-0.73, -0.3, 0.8]; //put in coords
  point5.color = darkYel; // light yellow
  point5.size = triSize; //put in size
  g_shapesList.push(point5);

  point6 = new Triangle();
  point6.position = [-0.73, -0.25, 0.8]; //put in coords
  point6.color = darkYel; // light yellow
  point6.size = triSize; //put in size
  g_shapesList.push(point6);

  point7 = new Triangle();
  point7.position = [-0.73, -0.20, 0.8]; //put in coords
  point7.color = darkYel; // light yellow
  point7.size = triSize; //put in size
  g_shapesList.push(point7);

  point8 = new Triangle();
  point8.position = [-0.70, -0.15, 0.8]; //put in coords
  point8.color = darkYel; // light yellow
  point8.size = triSize; //put in size
  g_shapesList.push(point8);

  point9 = new Triangle();
  point9.position = [-0.64, -0.05, 0.8]; //put in coords
  point9.color = darkYel; // light yellow
  point9.size = triSize; //put in size
  g_shapesList.push(point9);

  point10 = new Triangle();
  point10.position = [-0.58, 0, 0.8]; //put in coords
  point10.color = darkYel; // light yellow
  point10.size = triSize; //put in size
  g_shapesList.push(point10);
  // BACK HIND LEG ---------------------------------------------------

  // BODY ----------------------------------------------------
  point11 = new Triangle();
  point11.position = [-0.58, .06, 0.8]; //put in coords
  point11.color = lightYel; // light yellow
  point11.size = triSize; //put in size
  g_shapesList.push(point11);

  point12 = new Triangle();
  point12.position = [-0.50, .06, 0.8]; //put in coords
  point12.color = lightYel; // light yellow
  point12.size = triSize; //put in size
  g_shapesList.push(point12);

  point13 = new Triangle();
  point13.position = [-0.40, .06, 0.8]; //put in coords
  point13.color = lightYel; // light yellow
  point13.size = triSize; //put in size
  g_shapesList.push(point13);

  point14 = new Triangle();
  point14.position = [-0.30, .06, 0.8]; //put in coords
  point14.color = lightYel; // light yellow
  point14.size = triSize; //put in size
  g_shapesList.push(point14);

  point15 = new Triangle();
  point15.position = [-0.20, .06, 0.8]; //put in coords
  point15.color = lightYel; // light yellow
  point15.size = triSize; //put in size
  g_shapesList.push(point15);

  point16 = new Triangle();
  point16.position = [-0.10, .06, 0.8]; //put in coords
  point16.color = lightYel; // light yellow
  point16.size = triSize; //put in size
  g_shapesList.push(point16);

  point22 = new Triangle();
  point22.position = [0.015,0.13, 0.8]; //put in coords
  point22.color = lightYel; // light yellow
  point22.size = triSize; //put in size
  g_shapesList.push(point22);

  point23 = new Triangle();
  point23.position = [-0.095,0.135, 0.8]; //put in coords
  point23.color = lightYel; // light yellow
  point23.size = triSize; //put in size
  g_shapesList.push(point23);

  point24 = new Triangle();
  point24.position = [-0.2,0.145, 0.8]; //put in coords
  point24.color = lightYel; // light yellow
  point24.size = triSize; //put in size
  g_shapesList.push(point24);

  point25 = new Triangle();
  point25.position = [-0.315,0.14, 0.8]; //put in coords
  point25.color = lightYel; // light yellow
  point25.size = triSize; //put in size
  g_shapesList.push(point25);

  point26 = new Triangle();
  point26.position = [-0.405,0.15, 0.8]; //put in coords
  point26.color = lightYel; // light yellow
  point26.size = triSize; //put in size
  g_shapesList.push(point26);

  point27 = new Triangle();
  point27.position = [-0.535,0.155, 0.8]; //put in coords
  point27.color = lightYel; // light yellow
  point27.size = triSize; //put in size
  g_shapesList.push(point27);

  // BODY ----------------------------------------------------

  // NECK -----------------------------------------------------
  point28 = new Triangle();
  point28.position = [-0.05,0.24, 0.8]; //put in coords
  point28.color = lightYel; // light yellow
  point28.size = triSize; //put in size
  g_shapesList.push(point28);

  point29 = new Triangle();
  point29.position = [0.045,0.28, 0.8]; //put in coords
  point29.color = lightYel; // light yellow
  point29.size = triSize; //put in size
  g_shapesList.push(point29);

  point30 = new Triangle();
  point30.position = [0.025,0.39, 0.8]; //put in coords
  point30.color = lightYel; // light yellow
  point30.size = triSize; //put in size
  g_shapesList.push(point30);

  point31 = new Triangle();
  point31.position = [0.13,0.41, 0.8]; //put in coords
  point31.color = lightYel; // light yellow
  point31.size = triSize; //put in size
  g_shapesList.push(point31);

  point32 = new Triangle();
  point32.position = [0.135,0.35, 0.8]; //put in coords
  point32.color = lightYel; // light yellow
  point32.size = triSize; //put in size
  g_shapesList.push(point32);

  point33 = new Triangle();
  point33.position = [0.155,0.31, 0.8]; //put in coords
  point33.color = lightYel; // light yellow
  point33.size = triSize; //put in size
  g_shapesList.push(point33);

  point34 = new Triangle();
  point34.position = [0.21,0.385, 0.8]; //put in coords
  point34.color = lightYel; // light yellow
  point34.size = triSize; //put in size
  g_shapesList.push(point34);
  // NECK -----------------------------------------------------

  // HEAD -----------------------------------------------------
  point35 = new Triangle();
  point35.position = [0.29,0.38, 0.8]; //put in coords
  point35.color = lightYel; // light yellow
  point35.size = triSize; //put in size
  g_shapesList.push(point35);

  point36 = new Triangle();
  point36.position = [0.24,0.315, 0.8]; //put in coords
  point36.color = lightYel; // light yellow
  point36.size = triSize; //put in size
  g_shapesList.push(point36);

  point37 = new Triangle();
  point37.position = [0.345,0.315, 0.8]; //put in coords
  point37.color = lightYel; // light yellow
  point37.size = triSize; //put in size
  g_shapesList.push(point37);

  point38 = new Triangle();
  point38.position = [0.08,0.505, 0.8]; //put in coords
  point38.color = lightYel; // light yellow
  point38.size = triSize; //put in size
  g_shapesList.push(point38);

  point39 = new Triangle();
  point39.position = [ 0.19,0.51, 0.8]; //put in coords
  point39.color = lightYel; // light yellow
  point39.size = triSize; //put in size
  g_shapesList.push(point39);

  point40 = new Triangle();
  point40.position = [-0.465,0.255, 0.8]; //put in coords
  point40.color = lightYel; // light yellow
  point40.size = triSize; //put in size
  g_shapesList.push(point40);

  point41 = new Triangle();
  point41.position = [-0.335,0.255, 0.8]; //put in coords
  point41.color = lightYel; // light yellow
  point41.size = triSize; //put in size
  g_shapesList.push(point41);

  point42 = new Triangle();
  point42.position = [-0.23,0.26, 0.8]; //put in coords
  point42.color = lightYel; // light yellow
  point42.size = triSize; //put in size
  g_shapesList.push(point42);

  point43 = new Triangle();
  point43.position = [-0.125,0.275, 0.8]; //put in coords
  point43.color = lightYel; // light yellow
  point43.size = triSize; //put in size
  g_shapesList.push(point43);

  point55 = new Triangle();
  point55.position =  [0.03,0.225, 0.8]; //put in coords
  point55.color = lightYel; // light yellow
  point55.size = triSize; //put in size
  g_shapesList.push(point55);
  
  point60 = new Triangle();
  point60.position =  [0.28,0.465, 0.8]; //put in coords
  point60.color = lightYel; // light yellow
  point60.size = triSize; //put in size
  g_shapesList.push(point60);

  point61 = new Triangle();
  point61.position =  [0.33,0.435, 0.8]; //put in coords
  point61.color = lightYel; // light yellow
  point61.size = triSize; //put in size
  g_shapesList.push(point61);

  point62 = new Triangle();
  point62.position =  [0.36,0.4, 0.8]; //put in coords
  point62.color = lightYel; // light yellow
  point62.size = triSize; //put in size
  g_shapesList.push(point62);

  point66 = new Triangle();
  point66.position =  [0.235,0.31, 0.8]; //put in coords
  point66.color = lightYel; // light yellow
  point66.size = triSize; //put in size
  g_shapesList.push(point66);

  point67 = new Triangle();
  point67.position =  [0.28,0.275, 0.8]; //put in coords
  point67.color = lightYel; // light yellow
  point67.size = triSize; //put in size
  g_shapesList.push(point67);

  point68 = new Triangle();
  point68.position =  [0.31,0.24, 0.8]; //put in coords
  point68.color = lightYel; // light yellow
  point68.size = triSize; //put in size
  g_shapesList.push(point68);

  point69 = new Triangle();
  point69.position =  [ 0.355,0.215 , 0.8]; //put in coords
  point69.color = lightYel; // light yellow
  point69.size = triSize; //put in size
  g_shapesList.push(point69);
  // HEAD -----------------------------------------------------

  // FRONT HIND LEG -------------------------------------------
  point18 = new Triangle();
  point18.position = [0, 0, 0.8]; //put in coords
  point18.color = darkYel; // light yellow
  point18.size = triSize; //put in size
  g_shapesList.push(point18);

  point17 = new Triangle();
  point17.position = [0, .06, 0.8]; //put in coords
  point17.color = lightYel; // light yellow
  point17.size = triSize; //put in size
  g_shapesList.push(point17);

  point19 = new Triangle();
  point19.position = [0, -.05, 0.8]; //put in coords
  point19.color = darkYel; // light yellow
  point19.size = triSize; //put in size
  g_shapesList.push(point19);

  point20 = new Triangle();
  point20.position = [0, -.15, 0.8]; //put in coords
  point20.color = darkYel; // light yellow
  point20.size = triSize; //put in size
  g_shapesList.push(point20);

  point21 = new Triangle();
  point21.position = [0, -.25, 0.8]; //put in coords
  point21.color = darkYel; // light yellow
  point21.size = triSize; //put in size
  g_shapesList.push(point21);

  point21 = new Triangle();
  point21.position = [0, -.30, 0.8]; //put in coords
  point21.color = darkYel; // light yellow
  point21.size = triSize; //put in size
  g_shapesList.push(point21);
  // FRONT HIND LEG -------------------------------------------

  // FRONT FRONT LEG  --------------------------------------------
  point47 = new Triangle();
  point47.position = [0.055,0.03, 0.8]; //put in coords
  point47.color = lightYel; // light yellow
  point47.size = triSize; //put in size
  g_shapesList.push(point47);

  point48 = new Triangle();
  point48.position = [0.065,-0.02, 0.8]; //put in coords
  point48.color = lightYel; // light yellow
  point48.size = triSize; //put in size
  g_shapesList.push(point48);

  point49 = new Triangle();
  point49.position = [0.05,-0.075, 0.8]; //put in coords
  point49.color = lightYel; // light yellow
  point49.size = triSize; //put in size
  g_shapesList.push(point49);

  point50 = new Triangle();
  point50.position =  [0.07,-0.16, 0.8]; //put in coords
  point50.color = lightYel; // light yellow
  point50.size = triSize; //put in size
  g_shapesList.push(point50);

  point51 = new Triangle();
  point51.position =  [0.09,-0.26, 0.8]; //put in coords
  point51.color = lightYel; // light yellow
  point51.size = triSize; //put in size
  g_shapesList.push(point51);

  point52 = new Triangle();
  point52.position =  [0.11,-0.28, 0.8]; //put in coords
  point52.color = lightYel; // light yellow
  point52.size = triSize; //put in size
  g_shapesList.push(point52);

  point53 = new Triangle();
  point53.position =  [0.115,-0.295, 0.8]; //put in coords
  point53.color = lightYel; // light yellow
  point53.size = triSize; //put in size
  g_shapesList.push(point53);

  point54 = new Triangle();
  point54.position =  [0.165,-0.285, 0.8]; //put in coords
  point54.color = lightYel; // light yellow
  point54.size = triSize; //put in size
  g_shapesList.push(point54);
  // FRONT FRONT LEG  --------------------------------------------

  // TAIL ----------------------------------------------
  point44 = new Triangle();
  point44.position = [ -0.585,0.185, 0.8]; //put in coords
  point44.color = lightYel; // light yellow
  point44.size = triSize; //put in size
  g_shapesList.push(point44);

  point45 = new Triangle();
  point45.position = [-0.65,0.295 , 0.8]; //put in coords
  point45.color = lightYel; // light yellow
  point45.size = triSize; //put in size
  g_shapesList.push(point45);

  point46 = new Triangle();
  point46.position = [-0.675,0.435, 0.8]; //put in coords
  point46.color = lightYel; // light yellow
  point46.size = triSize; //put in size
  g_shapesList.push(point46);
  // TAIL ----------------------------------------------

  // EAR ------------------------------------------------
  point56 = new Triangle();
  point56.position =  [0.14,0.34, 0.8]; //put in coords
  point56.color = darkYel; // light yellow
  point56.size = triSize; //put in size
  g_shapesList.push(point56);

  point57 = new Triangle();
  point57.position =  [0.105,0.285, 0.8]; //put in coords
  point57.color = darkYel; // light yellow
  point57.size = triSize; //put in size
  g_shapesList.push(point57);

  point57 = new Triangle();
  point57.position =  [0.115,0.24, 0.8]; //put in coords
  point57.color = darkYel; // light yellow
  point57.size = triSize; //put in size
  g_shapesList.push(point57);

  point58 = new Triangle();
  point58.position =  [0.085,0.18, 0.8]; //put in coords
  point58.color = darkYel; // light yellow
  point58.size = triSize; //put in size
  g_shapesList.push(point58);

  point58 = new Triangle();
  point58.position =  [0.095,0.14, 0.8]; //put in coords
  point58.color = darkYel; // light yellow
  point58.size = triSize; //put in size
  g_shapesList.push(point58);

  point59 = new Triangle();
  point59.position =  [0.085,0.39, 0.8]; //put in coords
  point59.color = darkYel; // light yellow
  point59.size = triSize; //put in size
  g_shapesList.push(point59);
  // EAR ------------------------------------------------

  // FACE ------------------------------------------------
  point63 = new Triangle();
  point63.position =  [0.25,0.465, 0.8]; //put in coords
  point63.color = brown; // light yellow
  point63.size = triSize; //put in size
  g_shapesList.push(point63);

  point64 = new Triangle();
  point64.position =  [0.385,0.43, 0.8]; //put in coords
  point64.color = gray; // light yellow
  point64.size = triSize; //put in size
  g_shapesList.push(point64);

  point65 = new Triangle();
  point65.position =  [0.405,0.375, 0.8]; //put in coords
  point65.color = gray; // light yellow
  point65.size = triSize; //put in size
  g_shapesList.push(point65);

  point70 = new Triangle();
  point70.position =  [0.34,0.3, 0.8]; //put in coords
  point70.color = lightPink; // light yellow
  point70.size = triSize; //put in size
  g_shapesList.push(point70);

  point71 = new Triangle();
  point71.position =  [0.395,0.275, 0.8]; //put in coords
  point71.color = lightPink; // light yellow
  point71.size = triSize; //put in size
  g_shapesList.push(point71);

  point72 = new Triangle();
  point72.position =  [ 0.395,0.22, 0.8]; //put in coords
  point72.color = lightPink; // light yellow
  point72.size = triSize; //put in size
  g_shapesList.push(point72);

  point73 = new Triangle();
  point73.position =  [0.395,0.135 , 0.8]; //put in coords
  point73.color = lightPink; // light yellow
  point73.size = triSize; //put in size
  g_shapesList.push(point73);

  // FACE -------------------------------------------------


  renderShapes();

}