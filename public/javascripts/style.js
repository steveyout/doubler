$(document).ready(function(){
    $("#flip").click(function(){
        $("#panel").slideToggle("slow");
    });
});
$(document).ready(function(){
    $("#flip2").click(function(){
        $("#panel2").slideToggle("slow");
    });
});

$(document).ready(function(){
    $("#flip3").click(function(){
        $("#panel3").slideToggle("slow");
    });
});

$(document).ready(function(){
    $("#flip4").click(function(){
        $("#panel4").slideToggle("slow");
    });
});
$(document).ready(function(){
    $("#flip5").click(function(){
        $("#panel5").slideToggle("slow");
    });
});
$(document).ready(function(){
    $("#flip6").click(function(){
        $("#panel6").slideToggle("slow");
    });
});

$(document).ready(function(){
    $(window).resize(function () {
        if ($("#down").css("width")!=="100%") {
            $("#down").css({
                display: "block"
            })

        }
    })
})



$(document).ready(function(){
    $("#drop").click(function () {
        $("#down").slideToggle("slow");


        })
    });

