$(document).ready(function() {
  $("#tour").on("click", "button", function() {
    $(".photos").slideToggle();
  });
  $(".photos").on("mouseenter", "li", function() {
    // Traversing down from the li, and finding the span tag
    $(this).find("span").slideToggle();
  });
});
