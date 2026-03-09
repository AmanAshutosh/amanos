function saveProfile() {
  const name = document.getElementById("name").value.trim();
  const age = parseInt(document.getElementById("age").value);
  const height = parseInt(document.getElementById("height").value);
  const weight = parseInt(document.getElementById("weight").value);
  const mobile = localStorage.getItem("mobile");

  if (!name) {
    alert("Please enter your name");
    return;
  }

  if (age < 10 || age > 100) {
    alert("Enter valid age");
    return;
  }

  if (height < 100 || height > 250) {
    alert("Enter valid height in cm");
    return;
  }

  if (weight < 30 || weight > 200) {
    alert("Enter valid weight");
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

  window.location = "profile.html";
}
