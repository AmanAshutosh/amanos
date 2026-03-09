/* skip login if already logged in */

if (localStorage.getItem("userId")) {
  window.location = "index.html";
}

/* motivation quotes */

const quotes = [
  "Discipline beats motivation.",
  "Small daily wins build unstoppable momentum.",
  "Your future body is built today.",
  "Consistency is the real superpower.",
  "Greatness is built on boring daily habits.",
  "Do today what others won't.",
  "Progress > perfection.",
  "One more rep. One more hour.",
  "Your habits define your destiny.",
  "Stay hard.",
];

const random = quotes[Math.floor(Math.random() * quotes.length)];
document.getElementById("quote").innerText = random;

/* login function */

function login() {
  const mobile = document.getElementById("mobile").value.trim();

  if (!mobile) {
    alert("Please enter mobile number");
    return;
  }

  if (!/^[0-9]{10}$/.test(mobile)) {
    alert("Mobile number must be exactly 10 digits");
    return;
  }

  const userId = Date.now();

  localStorage.setItem("userId", userId);
  localStorage.setItem("mobile", mobile);

  window.location = "profile.html";
}

/* enter key login */

document.getElementById("mobile").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    login();
  }
});
