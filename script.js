const API = "http://localhost:3000/api";

// Register
const register = async () => {
    const username = ruser.value;
    const password = rpass.value;

    const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password })
    });

    alert("Registered");
};

// Login
const login = async () => {
    const username = luser.value;
    const password = lpass.value;

    const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    localStorage.setItem("token", data.token);

    window.location = "dashboard.html";
};

// Load Courses
if (window.location.pathname.includes("dashboard")) {
    fetch(`${API}/courses`)
    .then(res => res.json())
    .then(data => {
        const div = document.getElementById("courses");
        data.forEach(c => {
            div.innerHTML += `
                <div class="course">
                    <h3>${c.title}</h3>
                    <p>₹${c.price}</p>
                    <button onclick="enroll('${c._id}')">Enroll</button>
                </div>
            `;
        });
    });
}

// Enroll
const enroll = async (id) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API}/enroll/${id}`, {
        method: "POST",
        headers: { "authorization": token }
    });

    const data = await res.json();
    alert(data.message);
};