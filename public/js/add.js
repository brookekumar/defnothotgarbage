    // Question: What does this code do?
    $("#add-btn").on("click", function(event) {
        event.preventDefault();
        var newCharacter = {
          // routeName: $("#table").Val().trim();
          name: $("#name").val().trim(),
          email: $("#role").val().trim(),
          Phone: $("#age").val().trim(),
        };
  
        // Question: What does this code do??
        $.post("/api/characters", newCharacter)
          .then(function(data) {
            console.log("add.html", data);
            alert("Adding You name to the list...");
          });
      });