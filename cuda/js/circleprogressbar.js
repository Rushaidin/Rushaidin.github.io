var el = document.getElementsByClassName("chart"); // get canvas

var i;
for (i = 0; i < el.length; i++) {

    var options = {
        percent:  el[i].getAttribute('data-percent') || 25,
        size: el[i].getAttribute('data-size') || 220,
        lineWidth: el[i].getAttribute('data-line') || 15,
        rotate: el[i].getAttribute('data-rotate') || 0,
        color: el[i].getAttribute('bar-color'),
        base: el[i].getAttribute('base-color')
       
    }

    var canvas = document.createElement('canvas');
    var span = document.createElement('span');
    span.textContent = options.percent + '%';
        
    if (typeof(G_vmlCanvasManager) !== 'undefined') {
        G_vmlCanvasManager.initElement(canvas);
    }

    var ctx = canvas.getContext('2d');
    canvas.width = canvas.height = options.size;

    el[i].appendChild(span);
    el[i].appendChild(canvas);

    ctx.translate(options.size / 2, options.size / 2); // change center
    ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

    //imd = ctx.getImageData(0, 0, 240, 240);
    var radius = (options.size - options.lineWidth) / 2;

    var drawCircle = function(color, lineWidth, percent) {
            percent = Math.min(Math.max(0, percent || 1), 1);
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
            ctx.strokeStyle = color;
            ctx.lineCap = 'round'; // butt, round or square
            ctx.lineWidth = lineWidth
            ctx.stroke();
    };

    drawCircle(options.base, options.lineWidth, 100 / 100);
    drawCircle(options.color, options.lineWidth, options.percent / 100);
    
}


