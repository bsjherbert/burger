
$(function () {
  $(".create-form").on("submit", function (event) {
    event.preventDefault();

    var newBurger = {
      author: $("#auth").val().trim(),
      quote: false
    };

    // Send the POST request.
    $.ajax("/api/burger", {
      type: "POST",
      data: newBurger
    }).then(
      function () {
        console.log("created new quote");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".devour").on("click", function (event) {
    event.preventDefault();

    var id = $(this).attr("data-id");

    var updatedBurger = {
      burger_name: $(this).attr("data-burger"),
      devoured: true,
      id: id
    };

    console.log(updatedBurger);

    // Send the POST request.
    $.ajax("/api/burger/" + id, {
      type: "PUT",
      data: updatedBurger
    }).then(
      function () {
        console.log("updated burger");
        // Reload the page to get the updated list
        location.assign("/");
      }
    );
  });
});
