
socket.on('mouse-event', function(data) {
    console.log(data);
    if( data.id == socket.id )
        return;

    if( data.mouse_type == 'mousedown')    
    {
        paint = true;
        curColor = data.color;
        addClick(data.x, data.y);
        redraw();

    }

    if( data.mouse_type == 'mousemove')    
    {
        paint = true;
        curColor = data.color;
        addClick(data.x, data.y, true);
        redraw();
    }

    if( data.mouse_type == 'mouseup')    
    {
        paint = false;                
    }

    if( data.mouse_type == 'mouseleave')    
    {
        paint = false;                
    }

});

function onPurple() 
{
    curColor = colorPurple;
}

function onGreen() 
{
    curColor = colorGreen;
}

function onYellow() 
{
    curColor = colorYellow;
}

function onBrown() 
{
    curColor = colorBrown;
}

function onClear()
{
    clearCanvas();

    var data = {};
    data.id = socket.id;
    
    socket.emit('clear-canvas', data);
}

prepareCanvas();

function prepareCanvas()
{
    var slide_div = document.getElementsByClassName('slideshow-container')[0];

    var canvasWidth = slide_div.offsetWidth;
    var canvasHeight = slide_div.offsetHeight;

    canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'canvas');
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);            
    
    slide_div.appendChild(canvas);
    if(typeof G_vmlCanvasManager != 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }

    context = canvas.getContext("2d");            
}

function addClick(x, y, dragging)
{
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
    clickColor.push(curColor);
}

$('#canvas').mousedown(function(e){
    if( drawing_flag == false )
        return;

    var slide_div = document.getElementsByClassName('slideshow-container')[0];

    var mouseX = e.pageX - slide_div.offsetLeft;
    var mouseY = e.pageY - slide_div.offsetTop;
            
    paint = true;
    addClick(mouseX, mouseY);
    redraw();

    var data = {};
    data.id = socket.id;
    data.mouse_type = 'mousedown';
    data.x = mouseX;
    data.y = mouseY;
    data.color = curColor;

    socket.emit('mouse-event', data);
});

$('#canvas').mousemove(function(e){
    if( drawing_flag == false )
        return;

    if(paint){
        var slide_div = document.getElementsByClassName('slideshow-container')[0];

        var mouseX = e.pageX - slide_div.offsetLeft;
        var mouseY = e.pageY - slide_div.offsetTop;

        addClick(mouseX, mouseY, true);
        redraw();

        var data = {};
        data.id = socket.id;
        data.mouse_type = 'mousemove';
        data.x = mouseX;
        data.y = mouseY;
        data.color = curColor;

        socket.emit('mouse-event', data);
    }
});

$('#canvas').mouseup(function(e){
    if( drawing_flag == false )
        return;

    paint = false;

    var data = {};
    data.id = socket.id;
    data.mouse_type = 'mouseup';

    socket.emit('mouse-event', data);
});

$('#canvas').mouseleave(function(e){
    if( drawing_flag == false )
        return;

    paint = false;

    var data = {};
    data.id = socket.id;
    data.mouse_type = 'mouseleave';
    
    socket.emit('mouse-event', data);
});

