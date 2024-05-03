const upload=document.querySelector( ".submit" );
const  fileInput = document.querySelector('.uploadkelie');
const takefile=document.querySelector('.takefile') ;
fileInput.addEventListener('click',function(){

    takefile.click();
})

takefile.addEventListener('change',function(){
    upload.click();
})


const mheart=document.querySelector('#mheart');
const heart=document.querySelector("#heart");
const pic=document.querySelectorAll("#pic");
pic.forEach((p)=>{
    p.addEventListener('dblclick',()=>{
        mheart.style.opacity="1";
        mheart.style.fontSize="4rem";
        mheart.style.transition=".5s";
        setTimeout(()=>{
            mheart.style.opacity="0";
            mheart.style.fontSize="1rem";
        },1000)
    
    
        heart.style.color='red';
    })
})


heart.addEventListener('click',()=>{
    if(heart.style.color=='red'){
        heart.style.color='white';
    }
    else{
        heart.style.color='red';
    }
})

