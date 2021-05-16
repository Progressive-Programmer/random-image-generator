// get the div 
const select = document.querySelector('div');

// create drawing /div element
const element = document.createElement('h2');
// const canvas = document.createElement('canvas');

//  create text node 
const text = document.createTextNode('WHat the FUck!!!')

console.log(window)
// append text to element
element.appendChild(text)

//  append element to selector
select.appendChild(element)

//  append canvs to div
// select.appendChild(canvas)



// ------------------------------------------------

var img = new Image();
img.crossOrigin = 'Anonymous';
// img.src = 'https://www.w3schools.com/html/img_the_scream.jpg';

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

// img.onload = function() {
//     ctx.drawImage(img, 0,0)
// }

var original = function() {
    ctx.drawImage(img, 0, 0)   
}

var invert = function () {
    // ctx.drawImage(img, 0, 0 )
    const imageData = ctx.getImageData(0,0, canvas.width, canvas.height);
    const data = imageData.data
    console.log(imageData)
    console.log(data)
    console.log(data[1])


    for (var i = 0; i < data.length; i +=4) {
        var avg = (data[i] +data[i+1]+ data[i+2])
        data[i]     = data[i+20]; // red // change these to see 
        data[i+1]   =data[i+40]    // change these
        data[i+2]   =data[i+40]    // change these 
        // data[i+2]   =data[i+60]
    }
    
    ctx.putImageData(imageData, 0,0)
}


// =======================================

var randomNumber = function (min,max) {
    return Math.random()* (max-min) + min;
}


var shift = function () {
    // ctx.drawImage(img, 0,0);

    const x = randomNumber(0,canvas.width);
    const y = randomNumber(0,canvas.height);

    const a = randomNumber(0,canvas.width);
    const b = randomNumber(0,canvas.height);

    const g = randomNumber(0,canvas.width);
    const h = randomNumber(0,canvas.height);

     const sectionData = ctx.getImageData(x,y, canvas.width/g , canvas.height/h );   
     ctx.putImageData(sectionData, a,b)

};

const buttons = document.querySelectorAll('[name=color]')
console.log(buttons)

for (const input of buttons ) {
    input.addEventListener("change", function(evt) {
        switch (evt.target.id) {
            case "inverted":
                return invert();
            case "grayscale":
                return grayscale();
            case "shift":
                return shift();
            default:
                return original();
        }
    })
}

const clickButton = document.querySelector('[name=random');

clickButton.addEventListener("click",function(e){
   for (i=0; i<10000; i+=1) {shift()}
   //chnage the number i<10000 to n to repeat the process for n number of times.
   console.log(canvas.width)
})

//  download image

const saveButton = document.getElementById('save_button');
var tmpLink = document.createElement( 'a' ); 


saveButton.addEventListener('click', function(e) {
    const dataURL = canvas.toDataURL('image/png');

    tmpLink.setAttribute("href", dataURL);
    tmpLink.setAttribute("download", "test.png")
    tmpLink.click()

});


// image upload 
var imageLoader = document.getElementById('imageloader')
imageLoader.addEventListener('change', function(e){ handleImage(e)});


var handleImage = function (e) {
    var reader = new FileReader();
    reader.onload = function(e) {

        var img = new Image();
        img.onload = function( ) {
            canvas.width = img.width;
            canvas.height = img.height
            ctx.drawImage(img, 0, 0)
        }

        img.src = e.target.result;
    }
   console.log(e)
    reader.readAsDataURL(e.target.files[0]); 
}




 