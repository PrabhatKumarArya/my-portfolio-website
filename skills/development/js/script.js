const API = "https://my-portfolio-website-4-1.onrender.com";
document.getElementById("addProject").addEventListener("click", async () => {
    try {
        const project = {
            title: document.getElementById("title").value.trim(),
            description: document.getElementById("description").value.trim(),
            github: document.getElementById("github").value.trim(),
            live: document.getElementById("live").value.trim(),
            createdAt: Date.now()
        };
        if (!project.title || !project.description) {
            alert("Title and Description required ❌");
            return;
        }
        const res = await fetch(`${API}/api/web-dev-projects`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || "Request failed");
        }

        if (data.success) {
            alert("Project Added Successfully ✅");

            // Clear inputs
            document.getElementById("title").value = "";
            document.getElementById("description").value = "";
            document.getElementById("github").value = "";
            document.getElementById("live").value = "";

            // 🔥 refresh UI
            loadProjects();
        }

    } catch (err) {
        console.error(err);
        alert("Error adding project ❌");
    }
});
async function loadProjects() {
    try {
        const res = await fetch(`${API}/api/web-dev-projects`);
        const data = await res.json();

        renderProjects(data);

    } catch (err) {
        console.error("Error loading projects:", err);
    }
}
function renderProjects(data) {
    const container = document.getElementById("projectsContainer");
    container.innerHTML = "";

    Object.values(data || {}).forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("project-card");

        card.innerHTML = `
            <div class="project-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>

                <div class="project-buttons">
                    <a href="${item.github}" target="_blank">
                        <button class="btn github">GitHub</button>
                    </a>

                    <a href="${item.live}" target="_blank">
                        <button class="btn live">Live Demo</button>
                    </a>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}
window.addEventListener("DOMContentLoaded", loadProjects);
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        document.getElementById("addProject").click();
    }
});