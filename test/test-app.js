const ENV = $("#env-data");
/*const TESTCASES =[
    {name: 'status'         , code:'status'},
    {name: 'tristate'       , code:'tristate'},
    {name: 'size'           , code:'size'},
    {name: 'custom size'    , code:'custom-size'},
    {name: 'outline on'     , code:'outline-on'},
    {name: 'outline off'    , code:'outline-off'},
    {name: 'color on'       , code:'color-on'},
    {name: 'color off'      , code:'color-off'},
    {name: 'custom text'    , code:'custom-text'},
    {name: 'custom style'   , code:'custom-style'},
    {name: 'layout'         , code:'layout'},
    {name: 'API contructor' , code:'api-constructor'},
    {name: 'API methods' , code:'api-methods'}
];*/
function appStartup(test) {
  /*MAIN.html('');
    DESCRIPTION.html('');
    switch (test) {
    
        default:
            throw new DOMException('Unknown test case: '+ test, "NotSupportedError");
    }
    switch (INTERFACE) {
        case 'ECMAS':
            document.querySelectorAll('input[type=checkbox][data-toggle="toggle"]').forEach(function(ele) {
                ele.bootstrapToggle();
            });
            break;
        case 'JQUERY':
            $('input[data-toggle="toggle"]').bootstrapToggle();
            break;
    
        default:
            throw new DOMException('Unknown interface: '+ INTERFACE, "NotSupportedError");
    }
    
    setTimeout(function () {
        switch (test) {
    
        default:
            throw new DOMException('Unknown test case: '+ test, "NotSupportedError");
    }
    }, 500);*/
}
$(function () {
  $.getJSON("../package-lock.json", function (data) {
    let Bootstrap = DOMPurify.sanitize(
      data.packages["node_modules/bootstrap"].version
    );
    let plugin = DOMPurify.sanitize(data.version);
    ENV.html("");
    ENV.append(
      $("<div>").append($("<code>").html("Bootstrap v" + Bootstrap)),
      $("<div>").append($("<code>").html("bs-darkmode v" + plugin)),
      $("<div>").append($("<code>").html("Interface " + INTERFACE))
    );
  });

  $("section[data]").each(function (_index, section) {
    let request = new XMLHttpRequest();
    request.open("GET", $(section).attr("data"), true);
    request.send(null);
    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 200) {
        $(section).html(DOMPurify.sanitize(request.responseText));
      }
      if (request.readyState === 4 && request.status != 200) {
        $(section).html(
          $("<div></div>")
            .addClass("alert alert-warning")
            .attr("role", "alert")
            .html("Ouups! We can't load this section.")
        );
      }
    };
  });

  /*TESTCASES.forEach((testCase)=>{
        $('#test-selector').append(
            $('<button type="button">')
                .addClass("btn btn-secondary text-capitalize")
                .attr('data-test',testCase.code)
                .html(testCase.name)
        )
    });
    
    $('#test-selector button[data-test]').click(function() {
        appStartup($(this).attr('data-test'))
    });*/
});
