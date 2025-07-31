function updateFooterClock() {
  const now = new Date();

  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const timeOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit" };

  const formattedDate = now.toLocaleDateString("en-US", dateOptions);
  const formattedTime = now.toLocaleTimeString("en-US", timeOptions);

  document.getElementById("footerDate").textContent = formattedDate;
  document.getElementById("footerTime").textContent = formattedTime;
}

// Run once immediately
updateFooterClock();

// Then update every second
setInterval(updateFooterClock, 1000);

//for user accounts backend logic

fetch("/api/get-logged-in-user.php")
  .then((res) => res.json())
  .then((data) => {
    document.getElementById(
      "managerName"
    ).textContent = `Manager: ${data.name}`;
  });
