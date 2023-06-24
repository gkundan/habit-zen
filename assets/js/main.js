const deleteButtons = document.querySelectorAll(".delete-btn");
deleteButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    if (confirm("Are you sure you want to delete this habit?")) {
      const habitId = event.target.dataset.habitId;
      fetch(`/habit/${habitId}/delete`, { method: "DELETE" })
        .then((res) => {
          if (res.status === 200) {
            window.location.reload();
          } else {
            alert("Could not delete habit. Please try again later.");
          }
        })
        .catch((err) => {
          console.error(err);
          alert("Could not delete habit. Please try again later.");
        });
    }
  });
});

/// log creation
