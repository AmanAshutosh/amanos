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

async function login() {
  const mobile = document.getElementById("mobile").value.trim();

  // validation
  if (!mobile) {
    alert("Please enter mobile number");
    return;
  }

  if (!/^[0-9]{10}$/.test(mobile)) {
    alert("Mobile number must be exactly 10 digits");
    return;
  }

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobile }),
    });

    const data = await res.json();

    localStorage.setItem("userId", data.userId);
    localStorage.setItem("mobile", mobile);

    window.location = "index.html";
  } catch (err) {
    alert("Login failed");
    console.error(err);
  }
}


document.getElementById("mobile").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    login();
  }
});