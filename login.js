function login() {
  const mobile = document.getElementById("mobile").value.trim();

  // check empty
  if (!mobile) {
    alert("Please enter your mobile number");
    return;
  }

  // check only numbers
  if (!/^[0-9]+$/.test(mobile)) {
    alert("Mobile number must contain only digits");
    return;
  }

  // check length
  if (mobile.length !== 10) {
    alert("Mobile number must be exactly 10 digits");
    return;
  }

  // save mobile
  localStorage.setItem("mobile", mobile);

  // fake login id for now
  localStorage.setItem("userId", Date.now());

  // redirect
  window.location.href = "profile.html";
}


// if already logged in skip login

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

/* show random quote */

const random = quotes[Math.floor(Math.random() * quotes.length)];

document.getElementById("quote").innerText = random;

/* login function */

async function login() {
  const mobile = document.getElementById("mobile").value;

  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mobile }),
  });

  const data = await res.json();

  localStorage.setItem("userId", data.userId);

  window.location = "index.html";
}
