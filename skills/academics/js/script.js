import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
let chartInstance = null;
const firebaseConfig = {
   apiKey: "AIzaSyDiTC5375XSss5dGjzTBuo5IcfKXiJMhXw",
  authDomain: "my-portfolio-8acc9.firebaseapp.com",
  projectId: "my-portfolio-8acc9",
  storageBucket: "my-portfolio-8acc9.appspot.com",
  messagingSenderId: "454847859893",
  appId: "1:454847859893:web:cfdc217fb96f0b52b142fc"
};
const app = initializeApp(firebaseConfig);
async function uploadImage(file) {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "my_preset"); // ✅ real preset

    const res = await fetch(
        "https://api.cloudinary.com/v1_1/ddhz4v3ei/image/upload",
        {
            method: "POST",
            body: formData
        }
    );

    const data = await res.json();

    console.log("Cloudinary response:", data); // 🔥 DEBUG

    if (!res.ok || !data.secure_url) {
        throw new Error(data.error?.message || "Upload failed");
    }

    return data.secure_url;
}
let selectedFile = null;
let isUploading = false;
window.addEventListener("DOMContentLoaded", () => {

    const fileInput = document.getElementById("file");
    const fileInfo = document.getElementById("fileInfo");
    const fileName = document.getElementById("fileName");
    const removeFile = document.getElementById("removeFile");

    fileInput.addEventListener("change", function () {
        if (this.files.length > 0) {
            selectedFile = this.files[0];
            fileName.innerText = selectedFile.name;
            fileInfo.style.display = "flex";
        }
    });

    removeFile.addEventListener("click", function () {
        fileInput.value = "";
        selectedFile = null;
        fileInfo.style.display = "none";
        fileName.innerText = "";
    });

    document.getElementById("addSemesterBtn")
        .addEventListener("click", function(e) {
            addSemester();
        });

    renderCards();
    renderGraph();
});
async function addSemester() {
    if (isUploading) return;
    isUploading = true;

    try {
        const sem = document.getElementById("semester").value.trim();

        // ✅ FIX: convert to number properly
        const sgpaInput = document.getElementById("sgpa").value.trim();
        const cgpaInput = document.getElementById("cgpa").value.trim();

        const file = selectedFile;

        // ❌ Empty check first
        if (!sem || !sgpaInput || !cgpaInput) {
            alert("All fields required ❌");
            return;
        }

    const sgpa = parseFloat(sgpaInput);
    const cgpa = parseFloat(cgpaInput);

    if (isNaN(sgpa) || isNaN(cgpa)) {
        alert("Enter valid numbers ❌");
        return;
    }

    if (sgpa < 0 || sgpa > 10 || cgpa < 0 || cgpa > 10) {
        alert("Range must be 0–10 ❌");
        return;
    }

        // ❌ File check
        if (!file) {
            alert("Please upload an image ❌");
            return;
        }

        let imageURL;

        try {
            imageURL = await uploadImage(file);
        } catch (err) {
            console.error("Upload failed", err);
            alert("Image upload failed ❌");
            return;
        }

        if (!imageURL) {
            alert("No image URL received ❌");
            return;
        }

        const res = await fetch("http://localhost:4000/api/academic", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                semester: sem,
                sgpa,
                cgpa,
                image: imageURL
            })
        });

        const data = await res.json();

        if (data.success) {
            alert("Added Successfully 🚀");
            renderCards();
            renderGraph();
        } else {
            alert("Failed to add ❌");
        }

    } catch (err) {
        console.error(err);
        alert("Something broke ❌ Check console");
    } finally {
        isUploading = false;
    }
}
async function getAcademicData() {
    const res = await fetch("http://localhost:4000/api/academic");
    return await res.json();
}
async function renderCards() {
    const container = document.querySelector(".container");
    container.innerHTML = "";

    let dataObj = await getAcademicData();
    let data = Object.values(dataObj || {});

    data.sort((a, b) => {
        const semA = parseInt(a.semester.match(/\d+/)?.[0] || 0);
        const semB = parseInt(b.semester.match(/\d+/)?.[0] || 0);
        return semA - semB;
    });

    data.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.dataset.sgpa = item.sgpa;
        card.dataset.cgpa = item.cgpa;

        const imgSrc = item.image && item.image.startsWith("http") ? item.image : "https://via.placeholder.com/150";
        
        card.innerHTML = `
            <img src="${imgSrc}">
            <div class="card-content">
                <span>${item.semester}</span>

                <p>SGPA: ${item.sgpa}</p>
                <div class="bar">
                    <div class="fill sgpa-fill"></div>
                </div>

                <p>CGPA: ${item.cgpa}</p>
                <div class="bar">
                    <div class="fill cgpa-fill"></div>
                </div>
            </div>
        `;

        console.log("IMAGE FROM DB:", item.image);
        container.appendChild(card);
    });


    highlightBest();
    animateBars();
}
async function renderGraph() {

    let dataObj = await getAcademicData();
    let data = Object.values(dataObj || {});

    data.sort((a, b) => {
        return parseInt(a.semester.match(/\d+/)[0]) - parseInt(b.semester.match(/\d+/)[0]);
    });

    let labels = data.map(item => item.semester);
    let cgpaValues = data.map(item => item.cgpa);

    const ctx = document.getElementById("cgpaChart").getContext("2d");

    // 🔥 DESTROY OLD CHART
    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance =new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [{
                label: "CGPA Trend",
                data: cgpaValues,
                borderColor: "#0015ff",
                backgroundColor: "rgba(0, 255, 170, 0.2)",
                tension: 0,
                fill: true,
                pointRadius: 5
            }]
        }
    });
}
async function highlightBest() {
    const cards = document.querySelectorAll(".card");

    let max = -1;
    let bestCard = null;

    cards.forEach(card => {
        const sgpa = parseFloat(card.dataset.sgpa);

        if (sgpa > max) {
            max = sgpa;
            bestCard = card;
        }
    });

    cards.forEach(c => c.classList.remove("best"));

    if (bestCard) {
        bestCard.classList.add("best");
    }
}
async function animateBars() {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {

        setTimeout(() => {
            card.classList.add("show");

            let sgpa = parseFloat(card.dataset.sgpa);
            let cgpa = parseFloat(card.dataset.cgpa);

            let sgpaPercent = (sgpa / 10) * 100;
            let cgpaPercent = (cgpa / 10) * 100;

            let sgpaFill = card.querySelector(".sgpa-fill");
            let cgpaFill = card.querySelector(".cgpa-fill");

            setTimeout(() => {
                if (sgpaFill) sgpaFill.style.width = sgpaPercent + "%";
                if (cgpaFill) cgpaFill.style.width = cgpaPercent + "%";
            }, 200);

        }, index * 200);

    });
}
// ❌ remove file
removeFile.addEventListener("click", function () {
    fileInput.value = "";
    selectedFile = null;

    fileInfo.style.display = "none";
    fileName.innerText = "";
});
async function deleteSemester(id) {
    const res = await fetch(`http://localhost:4000/api/academic/${id}`, {
        method: "DELETE"
    });

    const data = await res.json();

    if (data.success) {
        renderCards();
        renderGraph();
    }
}