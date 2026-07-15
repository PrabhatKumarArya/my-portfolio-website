const base_url = "https://my-portfolio-website-2-1.onrender.com";
//fetches ratings from various websites
async function loadRatings() {
    try {
        const res = await fetch(`${base_url}/api/ratings`);
        const data = await res.json();

        document.getElementById("maxRating").innerText = data.maxRating || 1282;

        document.getElementById("cf").innerText = data.codeforces;
        document.getElementById("cc").innerText = 1282;
        document.getElementById("lc").innerText = data.leetcode;

    } catch (err) {
        console.error("Ratings error:", err);
    }
}
loadRatings();

//fetches no of questions solved from leetcode
async function getLeetCodeData(){
    // const username = "prabhu_coder";
    // try{
        const response = 
        await fetch(`${base_url}/api/leetcode`);

        // console.log(response);
        const data = await response.json();
        // let total = 0;
        // data.forEach(item => {
        //     // console.log(item);
        //    total += item.count; 
        // });
        // console.log(total);
        document.getElementById("leetcodeSolved").innerText = 
            data[0].count;
    // }
    // catch(error){
    //     console.error(error);
    // }  
}
getLeetCodeData();

async function getCodeForcesSolved() {
    try {
        const res = await fetch(`${base_url}/api/codeforces/solved`);
        const data = await res.json();

        document.getElementById("codeforcesSolved").innerText = data.solvedCount;

    } catch (error) {
        console.log("Error:", error);
    }
}

getCodeForcesSolved();

async function loadCodechefSolved() {
    try {
        const res = await fetch(`${base_url}/api/codechef/solved`);
        const data = await res.json();

        document.getElementById("codechefSolved").innerText = 212;

    } catch (error) {
        console.log("Error:", error);
    }
}

loadCodechefSolved();

async function loadContests() {
    const res = await fetch(`${base_url}/api/contests`);
    const data = await res.json();

    const cf = data.codeforces || 0;
    const lc = data.leetcode || 0;
    const cc = 27;
    
    document.getElementById("cfContest").innerText = cf;
    document.getElementById("lcContest").innerText = lc;
    document.getElementById("ccContest").innerText = cc;

    document.getElementById("totalContests").innerText = cf + lc + cc;
}

loadContests();

// async function loadSolved() {
//     try {
//         const res = await fetch("http://localhost:4000/api/solved");
//         const data = await res.json();

//         console.log("API DATA:", data);

//         document.getElementById("codeforcesSolved").innerText =
//             data.codeforces || 0;

//         document.getElementById("leetcodeSolved").innerText =
//             data.leetcode || 0;

//         document.getElementById("codechefSolved").innerText =
//             data.codechef || 0;

//         document.getElementById("totalSolved").innerText =
//             data.total || 0;

//     } catch (err) {
//         console.log("Fetch error:", err);
//     }
// }

// loadSolved();

async function totalsolved() {
    const cfsolved = Number(document.getElementById("codeforcesSolved").innerText || 0);
    const ccsolved = Number(document.getElementById("codechefSolved").innerText || 0);
    const lcSolved = Number(document.getElementById("leetcodeSolved").innerText || 0);

    document.getElementById("totalSolved").innerText =
        cfsolved + ccsolved + lcSolved;
}

async function initDashboard() {
    await getCodeForcesSolved();
    await getLeetCodeData();
    await loadCodechefSolved();

    totalsolved(); // run AFTER data is ready
}

initDashboard();

async function loadTopics() {
    const res = await fetch(`${base_url}/api/leetcode/topics`);
    const data = await res.json();

    const container = document.querySelector(".topics");
    container.innerHTML = "<h2>Topic Progress</h2>";

    const total = Math.max(...Object.values(data));

    Object.entries(data).forEach(([topic, count]) => {
        const percent = Math.round((count / total) * 100);

        container.innerHTML += `
        <div class="topic">
            <div class="topic-header">
                <span>${topic}</span>
                <span>${percent}%</span>
            </div>
            <div class="bar">
                <div class="fill" style="width:${percent}%"></div>
            </div>
        </div>`;
    });
}

loadTopics();

window.addEventListener("load", () => {
    document.querySelectorAll(".fill").forEach(bar => {
        let value = bar.style.width;

        if (!value) value = "0%";

        bar.style.width = "0%";

        setTimeout(() => {
            bar.style.width = value;
        }, 300);
    });
});

async function loadTopics() {
    const res = await fetch(`${base_url}/api/leetcode/topics`);
    const data = await res.json();

    const container = document.querySelector(".topics");
    container.innerHTML = "<h2>Topic Progress</h2>";

    for (let topic in data) {
        let solved = data[topic];

        let percent = Math.min(100, solved * 5);

        container.innerHTML += `
        <div class="topic-card">
            <div class="topic-header">
                <span>${topic}</span>
                <span>${percent.toFixed(0)}%</span>
            </div>
            <div class="bar">
                <div class="fill" style="width:${percent}%"></div>
            </div>
        </div>`;
    }
}

loadTopics();