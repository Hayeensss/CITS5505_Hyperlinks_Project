localStorage.setItem("theme", "light");
$("#themedark").addClass("d-none");
$("html").attr("data-bs-theme", "light");

function handleClick() {
  if (localStorage.getItem("theme") !== "light") {
    console.log("try light");
    $("#themedark").addClass("d-none");
    $("#themelight").removeClass("d-none");
    $("html").attr("data-bs-theme", "light");
    localStorage.setItem("theme", "light");
  } else {
    console.log("try dark");
    $("#themelight").addClass("d-none");
    $("#themedark").removeClass("d-none");
    $("html").attr("data-bs-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
  console.log("last print");
}
