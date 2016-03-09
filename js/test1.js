/**
 * Created by beens on 15/11/10.
 */


// 场景
var scene = new THREE.Scene();
// 透视相机
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
// 渲染器
var renderer = new THREE.WebGLRenderer();
// 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
renderer.setSize(window.innerWidth, window.innerHeight);
// 添加
document.body.appendChild(renderer.domElement);



//var geometry = new THREE.CubeGeometry(1,1,1);
//var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
//var cube = new THREE.Mesh(geometry, material);
//scene.add(cube);



//创建几何体
var geometry = new THREE.Geometry();
var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors } );

var color1 = new THREE.Color( 0x444444 ),
    color2 = new THREE.Color( 0xFF0000 );

// 线的材质可以由2点的颜色决定
var p1 = new THREE.Vector3( -100, 0, 100 );
var p2 = new THREE.Vector3(  100, 0, -100 );

geometry.vertices.push(p1);
geometry.vertices.push(p2);
geometry.colors.push( color1, color2 );

var line = new THREE.Line( geometry, material, THREE.LinePieces );
scene.add(line);




camera.position.z = 350;


function render() {
    //cube.rotation.x += 0.1;
    //cube.rotation.y += 0.1;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}


render();




