
function load()
{
    var url = "http://localhost/editor/src/public/index.php/web/checkSessionKey?session=your_session";
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
            var jsonObj = JSON.parse(request.responseText);
            document.getElementsByClassName("note-editable")[0].innerHTML=jsonObj.Data;
            document.getElementsByClassName("child")[0].innerHTML=jsonObj.docName;
            document.getElementById("key").innerHTML=jsonObj.encryptKey;
            localStorage.setItem('token',jsonObj.token);
            localStorage.setItem('type',jsonObj.type);
            localStorage.setItem('docName',jsonObj.docName);

        }
    }

    request.open("GET", url, true);
    request.send();
}


function showData() {
    var data =CryptoJS.AES.encrypt(document.getElementsByClassName('note-editable')[0].innerHTML, document.getElementById("key").innerHTML);
    var token=localStorage.getItem('token');
    var type=localStorage.getItem('type');
    var docKey=localStorage.getItem('docName');
    var myPost = "data="+(data)+"&type="+(type)+"&token="+(token)+"&docKey="+(docKey);//check this
    //var myPost=JSON.parse(myPost);
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            console.log(httpRequest);
            console.log(httpRequest.responseText);
            var data=httpRequest.responseText;
            var jsonResponse = JSON.parse(data);
            if(jsonResponse["data"]["msg"]=="Data saved successfully")
            {
                getConfirmation();
                function getConfirmation() {
                    var Val = confirm("Data saved successfully. Do you want to continue editing ?");
                    if( Val != true ) {
                        document.write ("User does not wants to continue!");
                    }
                }
            }
            else{
                alert("Server not responding!");
            }
        }
    };
    httpRequest.open('POST','http://localhost/editor/src/public/index.php/web/saveWebContent',true);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.send(myPost);
}
