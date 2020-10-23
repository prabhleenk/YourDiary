var qrcode = new QRCode("qrcode");

function makeCode(key) {
                qrcode.makeCode(key);
                }
           
function load() {
                myVar = setTimeout(showPage, 1500);
                var url = "http://staging.yourdiary.in/web/sessionKey";
                var request;

                if (window.XMLHttpRequest) {
                    request = new XMLHttpRequest();
                } else if (window.ActiveXObject) {
                    request = new ActiveXObject("Microsoft.XMLHTTP");
                }
                request.onreadystatechange = function () {
                    if (request.readyState == 4) {
                        var jsonObj = JSON.parse(request.responseText);
                        makeCode(jsonObj.key);

                    }
                }

                request.open("GET", url, true);
                request.send();
            }

   var url = "http://localhost/editor/src/public/index.php/web/scanCode?session=your_session";
   var request;

   if(window.XMLHttpRequest){
    request=new XMLHttpRequest(); 
   }    
   else if(window.ActiveXObject){    
    request=new ActiveXObject("Microsoft.XMLHTTP");  
   }    
   request.onreadystatechange  = function(){  
      if (request.readyState == 4  )
      {
          var jsonObj = JSON.parse(request.responseText);//JSON.parse() returns JSON object
          function myFunction() {
              setTimeout(function(){   if(jsonObj.msg=="successfully scanned") {
                  document.getElementById("myAudio").play();
                  console.log("audio was just played");
                  //window.location="editor.html";
                  setTimeout(function(){
                      window.location="editor.html";
                  }, 2000)
              } }, 3000);
              ;
          }
          myFunction();
      }
   }  

   request.open("GET", url, true);  
   request.send(); 