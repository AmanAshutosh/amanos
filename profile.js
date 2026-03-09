function saveProfile() {
  const profile = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    height: document.getElementById("height").value,
    weight: document.getElementById("weight").value,
    mobile: document.getElementById("mobile").value,
  };

  localStorage.setItem("profile", JSON.stringify(profile));

  window.location = "index.html";
}
