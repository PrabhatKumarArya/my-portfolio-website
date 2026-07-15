const API = "https://my-portfolio-website-2-5.onrender.com";
// ================= ADD PROJECT =================
document.getElementById("addMLProject").addEventListener("click", addProject);
async function addProject() {
    try {
        const project = {
            title: document.getElementById("title").value.trim(),
            description: document.getElementById("description").value.trim(),
            github: document.getElementById("github").value.trim(),
            live: document.getElementById("live").value.trim(),
            createdAt: Date.now()
        };

        if (!project.title || !project.description) {
            alert("Title and Description are required ❌");
            return;
        }

        const res = await fetch(`${API}/api/ml-projects`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || "Failed to add project");
        }

        alert("Project Added Successfully ✅");

        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("github").value = "";
        document.getElementById("live").value = "";

        loadProjects();

    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}
// ================= LOAD PROJECTS =================
async function loadProjects() {
    try {

        const res = await fetch(`${API}/api/ml-projects`);

        const response = await res.json();

        if (!res.ok) {
            throw new Error(response.error || "Unable to load projects");
        }

        // Backend returns { success:true, data:{} }
        renderProjects(response.data);

    } catch (err) {

        console.error(err);

    }
}
// ================= RENDER PROJECTS =================
function renderProjects(data) {

    const container = document.querySelector(".project-container");

    container.innerHTML = "";

    if (!data || Object.keys(data).length === 0) {

        container.innerHTML = `
            <h3 style="text-align:center;color:white;">
                No Projects Found
            </h3>
        `;

        return;
    }

    Object.entries(data).forEach(([id, item]) => {

        if (!item || !item.title || !item.description) return;

        const card = document.createElement("div");

        card.className = "project-card";

        card.innerHTML = `
            <div class="project-content">

                <h3>${item.title}</h3>

                <p>${item.description}</p>

                <div class="project-buttons">

                    ${
                        item.github
                            ? `<a href="${item.github}" target="_blank">
                                    <button class="btn github">
                                        GitHub
                                    </button>
                               </a>`
                            : ""
                    }

                    ${
                        item.live
                            ? `<a href="${item.live}" target="_blank">
                                    <button class="btn live">
                                        Live Demo
                                    </button>
                               </a>`
                            : ""
                    }

                </div>

            </div>
        `;

        container.appendChild(card);

    });

}
// ================= PAGE LOAD =================
window.addEventListener("DOMContentLoaded", loadProjects);
document.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

        e.preventDefault();

        document.getElementById("addMLProject").click();

    }

});

(async () => {
    const res = await fetch(`${API}/api/ml-projects`);
    const json = await res.json();
    console.log(json);
})();