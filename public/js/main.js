$(document).ready(function(){
    var video_tab = $(".video-tabs");
    var speaker_tab = $(".speaker-tabs");
    var video_tab_open = $("#video-tab-open");
    var user = $("#email");
    var pass = $("#password");
    var error = $(".error");
    var speakers_list = $(".speakers-list");
    var video_list = $(".video-list");
    var i = 0;
    video_tab_open.click(function () {
        if(i++%2===0){
            video_tab.removeClass("video-tab-gone");
            video_tab_open.text("Speakers");
            video_tab.addClass("video-tab-on");
            speaker_tab.addClass("speaker-tab-gone");
            speaker_tab.removeClass("speaker-tab-on");
        }else {
            video_tab_open.text("Videos");
            video_tab.addClass("video-tab-gone");
            video_tab.removeClass("video-tab-on");
            speaker_tab.addClass("speaker-tab-on");
            speaker_tab.removeClass("speaker-tab-gone");
        }
    });

    $.get("/speakers",{}, function(response){
        for(var i = 0 ; i < response.length ; i++) {
            speakers_list.append(' <div class="col s1 m3">\n' +
                '            <div class="card">\n' +
                '                <div class="card-image">\n' +
                '                    <img  class="images-speakers" src="'+response[i].pic_url+'">' +
                '                    <span class="card-title">'+response[i].name+'</span>' +
                '                </div>' +
                '                <div class="card-content">' +
                '                    <p>'+response[i].description.substr(0 , 40)+'</p>'+
                '                </div>' +
                '                <div class="card-action">' +
                '                    <button class="waves-effect waves-light btn login-btn delete-speakers" name="'+response[i].name+'" >Delete</button>' +
                '                </div>' +
                '            </div>' +
                '        </div>');
            $(".delete-speakers" ).click(function() {
                var data =  {
                    "speakerName" : this.name
                };
                $.post("/delete-speaker" , data ,function(response){
                    location.reload();
                });
            });
        }
    });
    $.get("/videos",{}, function(response){
        for(var i = 0 ; i < response.length ; i++) {
            video_list.append('<div class="col s1 m3">' +
                '            <div class="card">' +
                '                <div class="card-image">' +
                '                    <iframe  src="'+response[i].video_url +'" frameborder="0" allowfullscreen></iframe>' +
                '                    <span class="card-title">'+response[i].title+'</span>' +
                '                </div>' +
                '                <div class="card-action">' +
                '                    <button class="waves-effect waves-light btn login-btn delete-video" name="'+response[i].title+'" >Delete</button>' +
                '                </div>' +
                '            </div>' +
                '        </div>');
            $(".delete-video" ).click(function() {
                var data =  {
                    "videoTitle" : this.name
                };
                $.post("/delete-video" , data ,function(response){
                    location.reload();
                });
            });
        }
    });



    $(".login-btn").click(function(){
        console.log(pass.val());
        var data = {
            "user": user.val(),
            "password": pass.val()
        };
        $.post("/login",data, function(status){
            if(status.result === "NotFound") {
                error.html("Username or password not match");
            }else {
                window.location.href = '/admin';
            }
        });
    });

});