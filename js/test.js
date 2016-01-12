/**
 * Created by beens on 15/12/2.
 */





$(document).ready(function(){
    init();
});



var init = function(){
    reader = DEVICE.three.createReader($("#test").get(0));
    scene = DEVICE.three.createScene();
    camera = DEVICE.three.createCamera(45,600,400,1000,{x:0,y:5,z:10},{x:0,y:0,z:0});
    light = createLight();
    light1 = createLight1();
    mesh = createMesh();

    scene.add(camera);
    scene.add(mesh);
    scene.add(light);


    var deg = 0;
    DEVICE.three.animate(function(){
        deg++;
        deg = (deg>=360)? 0 : deg;
        mesh.rotation.y = Math.PI*deg/180;
        reader.render(scene,camera);
    });

};

var createLight = function(){
    var light = new THREE.DirectionalLight(0xffffff,1);
    light.position.set(5,5,10);

    return light;
};

var createLight1 = function(){
    return new THREE.AmbientLight(0xffffff);
};

var createMesh = function(){
    return new THREE.Mesh(
        new THREE.CubeGeometry(1,1,1),
        new THREE.MeshLambertMaterial({
            color: 0xff0000
        })
    );
};
