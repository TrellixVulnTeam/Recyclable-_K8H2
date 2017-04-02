window.addEventListener("DOMContentLoaded", function(){
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var video = document.getElementById('video');
var photo = document.getElementById('photo');
var mediaConfig = { video:true };
var content;
var errBack = function(e) {
  console.log('An error has occurred!', e)
};

// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia(mediaConfig).then(function(stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
    });
}


else if(navigator.getUserMedia) { // Standard
    navigator.getUserMedia({ video: true }, function(stream) {
        video.src = stream;
        video.play();
    }, errBack);
} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
    navigator.webkitGetUserMedia({ video: true }, function(stream){
        video.src = window.webkitURL.createObjectURL(stream);
        video.play();
    }, errBack);
} else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
    navigator.mozGetUserMedia({ video: true }, function(stream){
        video.src = window.URL.createObjectURL(stream);
        video.play();
    }, errBack);
}


document.getElementById("check").addEventListener('click', function() {
	context.drawImage(video, 0, 0, 500, 400);
  content = canvas.toDataURL('image/png');
  console.log(content);
  photo.setAttribute('src', content);
  var type = "LABEL_DETECTION";
  var json = '{' +
  ' "requests": [' +
    '	{ ' +
    '	  "image": {' +
    '	    "content":"' + content.replace("data:image/png;base64,", "") + '"' +
    '	  },' +
    '	  "features": [' +
    '	      {' +
    '	      	"type": "' + type + '",' +
    '			"maxResults": 200' +
    '	      }' +
    '	  ]' +
    '	}' +
    ']'
    '}';


  $.ajax({
      type: 'POST',
      url: "https://vision.googleapis.com/v1/images:annotate?key=" + "AIzaSyApLjctaIk54npL922wsGgWYaZafQ3yAws",
      dataType: 'json',
      data: json,
      //Include headers, otherwise you get an odd 400 error.
      headers: {
        "Content-Type": "application/json",
      },

      success: function(data, textStatus, jqXHR) {
        displayJSON(data);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('ERRORS: ' + textStatus + ' ' + errorThrown);
      }
    });

});
},false);
/* Imports the Google Cloud client library
<script>var Vision = require('@google-cloud/vision');

// Your Google Cloud Platform project ID
var projectId = 'helpful-aurora-163400';

// Instantiates a client
const visionClient = Vision({
  projectId: projectId
});

// The name of the image file to annotate
const fileName = photo;

// Performs label detection on the image file
visionClient.detectLabels(fileName)
  .then((results) => {
    const labels = results[0];

    console.log('Labels:');
    labels.forEach((label) => console.log(label));
  }); </script> */
