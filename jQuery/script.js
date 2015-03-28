$(function() {
  $("#tour").on("click", "button", function() {
    $(".photos").slideToggle();
  });
  $(".photos").on("mouseenter", "li", function() {
    // Traversing down from the li, and finding the span tag
    $(this).find("span").slideToggle();
  }).on("mouseleave", "li", function() {
    $(this).find("span").slideToggle();
  });
});
$("#tour").on("click", "button", function() {
    $(".photos").slideToggle();
  });

  function showPhotos() {
    $(this).find("span").slideToggle();
  }
  $(".photos").on("mouseenter", "li", showPhotos)
              .on("mouseleave", "li", showPhotos);
});
