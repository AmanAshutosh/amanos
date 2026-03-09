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
    name,
    age,
    height,
    weight,
    mobile,
  };

  localStorage.setItem("profile", JSON.stringify(profile));

  // go to dashboard
  window.location.href = "index.html";
}
