/**
 * Created by beens on 15/11/27.
 */



//加载图片资源
// instantiate a loader
//var loader = new THREE.TextureLoader();
//var textures = [];
//
//
//// load a resource
//loader.load(
//    // resource URL
//    'http://www.ituring.com.cn/download/01YdRBbTLpi6',
//    // Function when resource is loaded
//    function ( texture ) {
//
//
//
//        //设定平铺（不平铺不用设置）
//        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
//        //设置平铺次数
//        texture.repeat.set(4, 4);
//
//        //贴图不现实试试下面的方法
//        //texture.magFilter = THREE.LinearFilter;
//        //texture.minFilter = THREE.LinearFilter; //表示差值方式。
//
//
//        textures.push(texture);
//    },
//    // Function called when download progresses
//    function ( xhr ) {
//        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
//    },
//    // Function called when download errors
//    function ( xhr ) {
//        console.log( 'An error happened' );
//    }
//);




var body = document.getElementById("canvas");


var reader = new THREE.WebGLRenderer();
reader.setSize(400,300);
reader.setClearColor(0xffffff);
body.appendChild(reader.domElement);


var scene = new THREE.Scene();


//创建透视相机  (相机张开的角度，相机的长宽比，最近距离，最远距离)
var camera = new THREE.PerspectiveCamera(45,4/3,1,1000);
//正交投影相机
//var camera  = new THREE.OrthographicCamera(-1, 3, 1.5, -1.5, 1, 10);

camera.position.set(-10,10,10);
//相机对准某个点
camera.lookAt(new THREE.Vector3(0,0,0));
scene.add(camera);








var objs = [
    //创建立方体（width, height, depth, widthSegments, heightSegments, depthSegments)
    //           宽      高       深度     宽分段。。。。
    new THREE.BoxGeometry(1,1,1),

    //创建平面（width, height, widthSegments, heightSegments）
    //         宽      高       宽分段           高分段
    new THREE.PlaneGeometry(1,4),

    //创建球体（radius, segmentsWidth, segmentsHeight, phiStart, phiLength, thetaStart, thetaLength）
    //          半径      经度、维度段数（越大越园）       经度开始，幅度长度       维度开始，幅度长度
    //幅度：Math.PI / 6
    new THREE.SphereGeometry(4,10,10),

    //创建圆形（radius, segments, thetaStart, thetaLength）
    //         半径      段数       开始幅度        幅度长度
    new THREE.CircleGeometry(4,20,Math.PI/3,Math.PI),

    //圆柱体 圆台(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)
    //          顶面半径      地面半径       高度     顶底分段            高度分段       是否没有顶底（默认false）
    new THREE.CylinderGeometry(2, 2, 4, 18, 3),

    //正四面体 (radius, detail)
    //         半径
    new THREE.TetrahedronGeometry(3),

    //正八面体 (radius, detail)
    //         半径
    new THREE.OctahedronGeometry(3),

    //正十二面体 (radius, detail)
    //         半径
    new THREE.IcosahedronGeometry(3),

    //圆环 (radius, tube,   radialSegments, tubularSegments, arc)
    //      圆半径  管道半径   圆分段           管道分段        圆环幅度 默认：Math.PI * 2
    new THREE.TorusGeometry(3, 1, 12, 18),

    //圆环 (radius, tube, radialSegments, tubularSegments, p, q,      heightScale)
    //      圆半径  管道半径   圆分段           管道分段        样式参数     在z轴的缩放
    new THREE.TorusKnotGeometry(2, 0.5, 32, 8)
];
var myCreateObj = function(){
    //自定义形状
    //THREE.Geometry()


    // 初始化几何形状
    var geometry = new THREE.Geometry();

    // 设置顶点位置 添加到数组
    // 顶部4顶点
    geometry.vertices.push(new THREE.Vector3(-1, 2, -1));
    geometry.vertices.push(new THREE.Vector3(1, 2, -1));
    geometry.vertices.push(new THREE.Vector3(1, 2, 1));
    geometry.vertices.push(new THREE.Vector3(-1, 2, 1));
    // 底部4顶点
    geometry.vertices.push(new THREE.Vector3(-2, 0, -2));
    geometry.vertices.push(new THREE.Vector3(2, 0, -2));
    geometry.vertices.push(new THREE.Vector3(2, 0, 2));
    geometry.vertices.push(new THREE.Vector3(-2, 0, 2));

    // 设置顶点连接情况  数组中的点连成面
    // 顶面
    geometry.faces.push(new THREE.Face3(0, 1, 2, 3));
    // 底面
    geometry.faces.push(new THREE.Face3(4, 5, 6, 7));
    // 四个侧面
    geometry.faces.push(new THREE.Face3(0, 1, 5, 4));
    geometry.faces.push(new THREE.Face3(1, 2, 6, 5));
    geometry.faces.push(new THREE.Face3(2, 3, 7, 6));
    geometry.faces.push(new THREE.Face3(3, 0, 4, 7));

    return geometry;
};

var Material = [
    //基本材质  不受其他影响(光照 阴影等)
    new THREE.MeshBasicMaterial({
        color:0x000000         //16进制颜色
        //map:"",                 //设置纹理贴图 默认：空
        //visible:"",             //是否可见 默认：true
        //wireframe:true         //只渲染线   默认：false

    }),

    //漫反射材质
    new THREE.MeshLambertMaterial({
        color: 0xff0000            //物体颜色
        //emissive:0xff0000           //自发光颜色
        //map:textures[0]
        //ambient:""                //对环境光的反射能,需要设置AmbientLight
        //transparent:true          //是否使用透明度  貌似都有该属性
        //opacity:1                 //透明度  transparent=true生效  值0-1  貌似都有该属性
    }),

    //镜面反射材质
    new THREE.MeshPhongMaterial({
        color: 0xffff00,             //物体颜色
        //map:"",
        //emissive:0xff0000,           //自发光颜色
        //ambient:""，                //对环境光的反射能,需要设置AmbientLight
        specular:0xffff00,            //镜面反射颜色
        shininess:100                  //光泽度  默认：30
    }),

    //法相材质  主要用于调试
    new THREE.MeshNormalMaterial(),

    //多个面的材质，可以为多个图片或颜色  未测试
    new THREE.MeshFaceMaterial([
        new THREE.MeshLambertMaterial({color: 0xff0000}),
        new THREE.MeshLambertMaterial({color: 0xffdd00}),
        new THREE.MeshLambertMaterial({color: 0xffee00}),
        new THREE.MeshLambertMaterial({color: 0xffcc00}),
        new THREE.MeshLambertMaterial({color: 0xffaa00}),
        new THREE.MeshLambertMaterial({color: 0xff1100})
    ])
];







var obj = new THREE.Mesh(objs[0], Material[1]);
scene.add(obj);


//环境光
//
//var light = new THREE.AmbientLight(0xffffff);
//scene.add(light);



//点光源
//参数:
// 光源颜色  16进制
// 亮度  默认：1
// 照射的距离：默认：0
//var light = new THREE.PointLight(0xffffff, 2, 100);
//light.position.set(0, 3, 2);
//scene.add(light);


//平行光 （太阳光）
//参数：
//光源颜色  16进制 默认：白色？
//光源亮度： 默认：1
//var light = new THREE.DirectionalLight(0xffffff,1);
//light.position.set(-4, -5, 2);
//scene.add(light);






//聚光灯
//参数：
//光源颜色： 16进制
//光源亮度： 光源亮度 默认1
//光源照射距离
//角度    默认：Math.PI/3   最大值 Math.PI/2
//光线衰减度  默认10
var light = new THREE.SpotLight(0xffff00);

//坐标设置
light.position.set(3, 3, 30);
//light.target.position.set(0, 0, 0);
//指定物体为照射方向
light.target = obj;

scene.add(light);





//文字  字体库页面打不开
//THREE.TextGeometry(text, parameters)




//阴影
//能形成阴影的光源只有聚光灯和平行光
//能形成阴影的材质只有漫反射和反射材质
//相机需要设置
//renderer.shadowMapEnabled = true;
//物体和灯光要设置
//xxx.castShadow = true;
//light.castShadow = true;
//显示阴影的平面要设置
//xxx.receiveShadow = true;
//调试显示相机
//light.shadowCameraVisible = true。


//另外平行光还需要设置
//shadowCameraNear
//shadowCameraFar
//shadowCameraLeft
//shadowCameraRight
//shadowCameraTop
//shadowCameraBottom

//另外聚光灯需要设置
//shadowCameraNear
//shadowCameraFar
//shadowCameraFov




reader.render(scene,camera);