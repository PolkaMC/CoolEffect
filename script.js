function start() {
    let canvas = document.querySelector("canvas")
    let ctx = canvas.getContext("2d");
    let centerX = 0;
    let centerY = 0;

    function init(){
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        centerX = canvas.width/2;
        centerY = canvas.height/2;

    }
    init()
    window.addEventListener("resize", init);
    
    let numberOfRings = 3;
    let ringRadiusOffset = 7;
    let waveOffset = 15;
    const colors = [`#771122`, `#bb1122`, `#ff1122`]
    let startAngle = 0;
    let maxWavesAmplitude = 17;
    let numberOfWaves = 7;
    let ringRadius = 200;

    function updateRigns(){
        for(let i = 0; i < numberOfRings; i++) {
            let radius = i * ringRadiusOffset + ringRadius;
            let offsetAngle = i * waveOffset * Math.PI / 180;
            drawRing(radius, colors[i], offsetAngle)
    }
    startAngle >= 360 ? startAngle = 0 : startAngle++;
}
    function drawRing(radius, color, offsetAngle) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 9
        ctx.beginPath();
        for (let j = -180; j < 180; j++) {
            let currentAngle = (j + startAngle) * Math.PI / 180;
            let displacement = 0
            let now = Math.abs(j)
            if (now > 70) {
                displacement = (now - 70) / 70;
            }
            if(displacement >= 1) { displacement = 1 }
            let waveAmplitude = displacement * Math.sin((currentAngle + offsetAngle) * numberOfWaves) * maxWavesAmplitude
            let x = centerX + Math.cos(currentAngle) * (radius + waveAmplitude);
            let y = centerY + Math.sin(currentAngle) * (radius + waveAmplitude);
            j > -180 ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.closePath()
        ctx.stroke();
    }
   
   
    function loop() {
        requestAnimationFrame(loop)
        requestAnimationFrame(updateRigns)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  
    loop()
}
start()