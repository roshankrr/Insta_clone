const upload=document.querySelector( ".submit" );
const  fileInput = document.querySelector('.mleft');
const takefile=document.querySelector('.takefile') ;
fileInput.addEventListener('click',function(){

    takefile.click();
})

takefile.addEventListener('change',function(){
    upload.click();
})