// change theme
$(document).ready(function () {
  localStorage.setItem("theme", "light");
  $("#themedark").addClass("d-none");
  $("html").attr("data-bs-theme", "light");
});

function handleClick() {
  if (localStorage.getItem("theme") !== "light") {
    $("#themedark").addClass("d-none");
    $("#themelight").removeClass("d-none");
    $("html").attr("data-bs-theme", "light");
    localStorage.setItem("theme", "light");
  } else {
    $("#themelight").addClass("d-none");
    $("#themedark").removeClass("d-none");
    $("html").attr("data-bs-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
}

// Read more handlers (show more/less content)
function handleReadMoreClick() {
  if (
    document.getElementById("collapsemorehttp").classList.contains("d-none")
  ) {
    document.getElementById("collapsemorehttp").classList.remove("d-none");
  } else {
    document.getElementById("collapsemorehttp").classList.add("d-none");
  }
}

// feedback form event handlers
function handleFeedback() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  const data = `Hi, ${name}.<br>Your Email is ${email} , \
  <br>and phone is ${phone}. <br>Would you like to proceed and submit the message?`;

  document.getElementById("feedback_info").innerHTML = data;
}

function handleConfirm() {
  const success = "Your message has been sent successfully!";
  alert(success);
}

// ajax: fetch gavatar image using a get request
async function handleAvatar() {
  const email = document.getElementById("email").value;
  if (email === "") {
    return;
  }

  // create gavatar url
  const gavartar_url = await getGavatarUrl(email);

  // fetch gavatar image
  try {
    const gavatar_data = await fetchGavatar(gavartar_url);
    if (gavatar_data instanceof Blob) {
      const blobUrl = URL.createObjectURL(gavatar_data);
      // display gavatar image
      document.getElementById("avatarImg").src = blobUrl;
    } else {
      console.error("Invalid gravatar image data:", gavatar_data);
    }
  } catch (error) {
    console.error("Error fetching gravatar image:", error);
  }
}

async function getGavatarUrl(email) {
  const address = email.trim().toLowerCase();
  const data = new TextEncoder().encode(address);

  try {
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
    return `https://www.gravatar.com/avatar/${hashHex}?d=identicon`;
  } catch (error) {
    console.error(error);
  }
}

async function fetchGavatar(url) {
  try {
    const response = await fetch(url);
    return await response.blob();
  } catch (error) {
    console.error("Error fetching gravatar image:", error);
  }
}

// email input to lower case
function toLowerCase() {
  const emailInput = document.getElementById("email");
  emailInput.value = emailInput.value.toLowerCase();
}

// ajax: fecth message from api
const message_api =
  "https://fakerapi.it/api/v1/texts?_quantity=1&_characters=100";
async function fetchMessage() {
  console.log("fetching message...");
  try {
    const response = await fetch(message_api);
    const info = await response.json();
    const message = info.data[0].content;
    return message;
  } catch (error) {
    console.error("Error fetching message:", error);
  }
}

// generate message
async function handleMessage() {
  const message = await fetchMessage();
  console.log("??message:", message);
  document.getElementById("GenerateMessage").value = message;
}

// click to github repo
function handlePjClick(id) {
  let url = "";
  if (id === 1) {
    url = "https://github.com/Hayeensss/fpl_analysis_2223";
  }

  window.open(url, "_blank");
}
