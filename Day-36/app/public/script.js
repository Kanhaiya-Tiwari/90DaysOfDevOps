const form = document.getElementById("userForm");
const usersDiv = document.getElementById("users");

async function fetchUsers() {
  const res = await fetch("/users");
  const users = await res.json();

  usersDiv.innerHTML = "";

  users.forEach(user => {
    const div = document.createElement("div");
    div.className = "user-card";
    div.innerHTML = `<strong>${user.name}</strong><br>${user.email}`;
    usersDiv.appendChild(div);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  await fetch("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email })
  });

  form.reset();
  fetchUsers();
});

fetchUsers();
