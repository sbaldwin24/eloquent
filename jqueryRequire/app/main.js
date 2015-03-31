// to depend on a bower installed component:
// define(['bower_components/componentName/file'])

define(["jquery", "jquery-ui"], function($) {
  $("#tour").on("click", "button", function() {
    // on click toggle photos, using the 'fold' effect for 2 secs
    $(".photos").toggle("fold", 2000);
  });

  $(".photos").on("mouseenter", "li", function() {
    // Traversing down the li, and finding the span tag
    $(this).find("span").toggleClass("makeIn");
  })// Easier for me to read to have the next line
  .on("mouseleave", "li", function() {
    $(this).toggleClass("makeHide");
  });

    $("#tour").on("click", "button", function() {
      $(".photos").toggle();
    });

    function showPhotos() {
      $(this).find("span").toggle();
    }
    $(".photos").on("mouseenter", "li", showPhotos)
                .on("mouseleave", "li", showPhotos);
});
