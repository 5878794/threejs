/**
 * Created by beens on 15/12/2.
 */



var DEVICE = {};


//需要挂载jq
DEVICE.three = {
    //创建渲染器
    //dom:原生dom对象
    //clearColor:16进制颜色  默认：黑色
    createReader:function(dom,clearColor){
        var reader =  new THREE.WebGLRenderer(),
            width = parseInt($(dom).width()),
            height = parseInt($(dom).height());
        clearColor = clearColor || 0x000000;

        reader.setSize(width,height);
        reader.setClearColor(clearColor);
        dom.appendChild(reader.domElement);

        return reader;
    },
    //创建场景
    createScene:function(){
        return new THREE.Scene();
    },
    //创建相机  默认创建透视相机
    //deg:相机视野的角度
    //canvasWidth:
    //canvasHeight:
    //far:相机能查看的最远距离
    //position:相机的位置    {x,y,z}
    //lookAt:相机对准哪个方向  {x,y,z}
    createCamera:function(deg,canvasWidth,canvasHeight,far,position,lookAt){
        //相机张开的角度，相机的长宽比，最近距离，最远距离)
        var camera = new THREE.PerspectiveCamera(deg,canvasWidth/canvasHeight,1,far);
        //正交投影相机
        //var camera  = new THREE.OrthographicCamera(-1, 3, 1.5, -1.5, 1, 10);

        camera.position.set(position.x,position.y,position.z);
        //相机对准某个点
        camera.lookAt(new THREE.Vector3(lookAt.x,lookAt.y,lookAt.z));

        return camera;
    },
    animate:function(fn){
        window.requestAnimationFrame = window.requestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.msRequestAnimationFrame;

        var a = function(){
            fn();
            requestAnimationFrame(a);
        };
        a();

    }
};





