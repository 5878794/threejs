/**
 * Created by beens on 15/12/2.
 */


//var map = [
//    [0,0,0,0,0,0,0,0,0,0,0,0,0],
//    [0,1,0,0,0,0,0,0,0,0,0,1,0],
//    [0,1,1,0,0,0,0,0,0,0,0,1,0],
//    [0,1,0,1,0,0,0,0,0,0,0,1,0],
//    [0,1,0,0,1,0,0,0,0,0,0,1,0],
//    [0,1,0,0,0,1,0,0,0,0,0,1,0],
//    [0,1,0,0,0,0,1,0,0,0,0,1,0],
//    [0,1,0,0,0,0,0,1,0,0,0,1,0],
//    [0,1,0,0,0,0,0,0,1,0,0,1,0],
//    [0,1,0,0,0,0,0,0,0,1,0,1,0],
//    [0,1,0,0,0,0,0,0,0,0,1,1,0],
//    [0,1,0,0,0,0,0,0,0,0,0,1,0],
//    [0,1,0,0,0,0,0,0,0,0,0,0,0]
//];
var map = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,0],
    [0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0],
    [0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0],
    [0,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,1,1,1,1,0,0,0],
    [0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0],
    [0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,0],
    [0,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,1,0,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];




$(document).ready(function(){
    init();
});



var init = function(){
    reader = DEVICE.three.createReader($("#test").get(0));
    scene = DEVICE.three.createScene();
    camera = DEVICE.three.createCamera(90,600,400,1000,{x:0,y:0,z:100},{x:0,y:0,z:0});
    light = createLight();
    light1 = createLight1();
    light2 = createLight2();
    mesh = createMesh();
    mesh1 = createMesh1();

    scene.add(camera);
    //scene.add(mesh);
    //scene.add(mesh1);
    scene.add(light);


    boxs = addBoxs(scene);

    var camera_z = 100,
        n = 0;
    DEVICE.three.animate(function(){
        n++;
        if(n>100){
            if(camera_z>70){
                camera_z -= 1;
            }else{
                camera_z -= 0.2;
            }
            camera_z = (camera_z<0)? 0 : camera_z;

            camera.position.z = camera_z;
        }


        for(var i= 0,l=boxs.length;i<l;i++){
            var this_box = boxs[i],
                o = this_box.material.opacity,
                notAdd = this_box.notAdd;
            if(notAdd){
                o -= 0.05;
                if(o<0.2){
                    o=0.2;
                    this_box.notAdd = false;
                }
            }else{
                o += 0.05;
                if(o>1){
                    o=1;
                    this_box.notAdd = true;
                }
            }
            if(n<100){
                this_box.material.opacity = o;
                var z = this_box.position.z;
                z+= 0.5;
                z = (z>=10)? 0 : z;
                this_box.position.z = z;
            }else{
                this_box.material.opacity = 1;
            }



        }







        reader.render(scene,camera);
    });

};

var createLight = function(){
    var light = new THREE.DirectionalLight(0xffffff,1);
    light.position.set(0,0,10);

    return light;
};

var createLight1 = function(){
    var light =  new THREE.PointLight(0xffffff,1,1000);
    light.position.set(0,0,10);
    return light;
};

var createLight2 = function(){
    var light = new THREE.AmbientLight(0xffffff);
    return light;
};

var createMesh = function(){
    return new THREE.Mesh(
        new THREE.CubeGeometry(1,1,1),
        new THREE.MeshLambertMaterial({
            color: 0xff0000,
            transparent:true
        })
    );
};

var createMesh1 = function(){
    return new THREE.Mesh(
        new THREE.CubeGeometry(1,1,1),
        new THREE.MeshLambertMaterial({
            color: 0xffff00,
            transparent:true
        })
    );
};

var addBoxs = function(scene){
    var objs = [];

    for(var y= 0,yl=map.length;y<yl;y++){
        var _map =map[y];
        for(var x= 0,xl=_map.length;x<xl;x++){
            var val = map[y][x];
            if(val == 1){
                var this_box = new THREE.Mesh(
                    //new THREE.CubeGeometry(1,1,1),
                    new THREE.SphereGeometry(1,10,10),
                    new THREE.MeshLambertMaterial({
                        color: 0xff0000,
                        transparent:true
                    })
                    ),
                    z = parseInt(Math.random()*10),
                    o = parseInt(Math.random()*10)/10;

                this_box.position.set(x*5-100,38-y*5,z);
                this_box.material.opacity = o;

                objs.push(this_box);
                scene.add(this_box);
            }
        }
    }

    return objs;
};