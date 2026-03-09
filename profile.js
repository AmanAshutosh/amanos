// protect profile page (must login first)

if (!localStorage.getItem("userId")) {
  window.location = "login.html";
}

function saveProfile() {
  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value;
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;
  const mobile = localStorage.getItem("mobile");

  if (!name || !age || !height || !weight) {
    alert("Please fill all fields");
    return;
  }

  const profile = {
    name: name,
    age: Number(age),
    height: Number(height),
    weight: Number(weight),
    mobile: mobile,
  };

  localStorage.setItem("profile", JSON.stringify(profile));

  window.location = "index.html";
}
