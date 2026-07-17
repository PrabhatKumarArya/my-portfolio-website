const API = "https://my-portfolio-website-2-1.onrender.com";
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const puppeteer = require("puppeteer");

const app = express();

app.use(cors({
origin: "https://my-portfolio-website-5-1.vercel.app",
methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
const path = require("path");

app.use(express.static(path.join(__dirname, "../")));
// ================= FIREBASE INIT (NO JSON FILE) =================
const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.database();

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../resume/resume.html"));
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running"
  });
});

// ================= SAMPLE API =================
app.get("/api/test", async (req, res) => {
  await db.ref("test").set({
    message: "Firebase Connected",
    time: Date.now()
  });

  const snap = await db.ref("test").once("value");
  res.json(snap.val());
});

// ================ Web-Dev-Projects TESTING ====
app.post("/api/web-dev-projects", async (req, res) => {
    try {
        const project = req.body;

        const db = admin.database();
        const newProjectRef = db.ref("web-dev-projects").push();

        await newProjectRef.set({
            title: project.title,
            description: project.description,
            github: project.github,
            live: project.live,
            createdAt: Date.now()
        });

        res.status(201).json({
            success: true,
            message: "Project added successfully",
            id: newProjectRef.key
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

app.get("/api/web-dev-projects", async (req, res) => {
    try {
        const db = admin.database();

        const snapshot = await db.ref("web-dev-projects").once("value");

        res.json(snapshot.val() || {});

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
});

app.post("/api/ml-projects", async (req, res) => {
    try {
        const project = req.body;

        const newRef = db.ref("ml-projects").push();

        await newRef.set(project);

        res.json({
            success: true,
            id: newRef.key
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

app.get("/api/ml-projects", async (req, res) => {
    try {
        const snapshot = await db.ref("ml-projects").once("value");

        res.json({
            success: true,
            data: snapshot.val() || {}
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});


app.post("/api/academic", async (req, res) => {
    try {
        const academic = req.body;

        const db = admin.database();
        const newRef = db.ref("academic").push();

        await newRef.set({
            semester: academic.semester,
            sgpa: academic.sgpa,
            cgpa: academic.cgpa,
            image: academic.image,
            createdAt: Date.now()
        });

        res.status(201).json({
            success: true,
            message: "Academic data added successfully",
            id: newRef.key
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

app.get("/api/academic", async (req, res) => {
    try {
        const db = admin.database();

        const snapshot = await db.ref("academic").once("value");

        res.json(snapshot.val() || {});

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
async function getCodeforcesRating(handle){
    try{
        const res = await axios.get(
            `https://codeforces.com/api/user.info?handles=${handle}`
        );
        return res.data.result?.[0].rating ?? 0;
    } catch (err) {
        return 0;
    }
}

async function getCodechefRating(username){
    try{
        const res = await axios.get(
            `https://codechef-api.vercel.app/handle/${username}`
        );
        return res.data.currentRating ?? 0;
    } catch (err) {
        return 0;
    }
}

async function getSolvedProblems(handle){
    try{
        const response = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
        const data = await response.json();

        if(data.status !== "OK"){
            throw new Error("API Error");
        }

        const submissions = data.result;

        let solvedSet = new Set();

        submissions.forEach(sub => {
            if(sub.verdict === "OK" && sub.problem){
                let problemId = sub.problem.contestId + "-" + sub.problem.index;
                solvedSet.add(problemId);
            }
        });

        return {
        solvedCount: solvedSet.size 
        };
    } catch (error) {
        console.log("Error: ",error);
        return null;
    }
}

async function getLeetCodeRating(username){
    try{
        const query = `
        query userContestRankingInfo($username: String!) {
            userContestRanking(username: $username){
                rating 
            }
        }`;

        const res = await axios.post(
            "https://leetcode.com/graphql",
            {
                query,
                variables: { username }
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        return res.data.data.userContestRanking?.rating ?? 0;

    } catch (err) {
        return 0;
    }
}

app.get("/api/ratings",async (req, res) => {
    try{
    const codeforcesHandle = "coder_prabhu";
    const codechefHandle = "coder_prabhu";
    const leetcodeHandle = "code_smasher_prabhu";

   const [cf,cc,lc] = await Promise.all([
    getCodeforcesRating(codeforcesHandle),
    getCodechefRating(codechefHandle),
    getLeetCodeRating(leetcodeHandle)
   ]);
   const maxRating = Math.max(cf,cc,lc);
   res.json({
    codeforces : cf,
    codechef: cc,
    leetcode: lc,
    maxRating
   });
} catch (err) {
    console.log(err);
    res.status(500).json({error: "Server Error"});
}
});

app.get("/api/leetcode", async (req,res) =>{
    const username = "code_smasher_prabhu";

    const query = `
    query getUserProfile($username: String!) {
        matchedUser(username: $username){
            submitStats {
                acSubmissionNum {
                    difficulty
                    count
                }
            }    
        }
    }
    `;

    try {
        const response = await axios.post(
            "https://leetcode.com/graphql",
        {
                query,
                variables : { username }
        });
        const user = 
            response.data.data.matchedUser;
        if(!user){
            return res.status(404).json({
                error : "User not found on Leetcode"
            });
        }
        const stats = user.submitStats.acSubmissionNum;
        res.json(stats);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            error: "Unable to fetch LeetCode data"
        });
    }
    // res.json({
    //     username:"prabhu_coder",
    //     solved:150,
    //     easy:70,
    //     medium:65,
    //     hard:15
    // });
    // res.send("Backend Running");
});

app.get("/api/codeforces/solved", async (req, res) => {
    const handle = "coder_prabhu";

    const data = await getSolvedProblems(handle);

    res.json(data);
});

app.get("/test", async (req, res) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    res.send("ok");
});

app.get("/api/codechef/solved", async (req, res) => {
    const username = "coder_prabhu";

    try {
        const browser = await puppeteer.launch({ 
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();

        await page.goto(`https://www.codechef.com/users/${username}`, {
            waitUntil: "networkidle2"
        });

        const solved = await page.evaluate(() => {
            const elements = Array.from(document.querySelectorAll("*"));

            for (let el of elements) {
                const text = el.innerText;

                if (text && text.includes("Fully Solved Problems")) {
                    const match = text.match(/Fully Solved Problems\s*(\d+)/i);
                    if (match) return parseInt(match[1]);
                }
            }

            return 0;
        });

        await browser.close();

        res.json({ totalSolved: solved });

    } catch (err) {
        console.log(err.message);
        res.json({ totalSolved: 0 });
    }
});

async function getCodeforcesContests(handle) {
    const res = await axios.get(
        `https://codeforces.com/api/user.rating?handle=${handle}`
    );

    return {
        contests: res.data.result.length
    };
}

async function getLeetCodeContests(username) {
    const query = `
    query userContestRankingInfo($username: String!) {
        userContestRanking(username: $username) {
            attendedContestsCount
        }
    }`;

    const res = await axios.post("https://leetcode.com/graphql", {
        query,
        variables: { username }
    });

    return {
        contests: res.data.data.userContestRanking?.attendedContestsCount || 0
    };
}

app.get("/api/contests", async (req, res) => {
    const handle = "coder_prabhu";
    const leetcode = "code_smasher_prabhu";

    try {
        const cf = await getCodeforcesContests(handle);
        const lc = await getLeetCodeContests(leetcode);

        res.json({
            codeforces: cf.contests,
            leetcode: lc.contests,
            codechef: 27 // manual or placeholder
        });

    } catch (err) {
        res.json({
            codeforces: 0,
            leetcode: 0,
            codechef: 27
        });
    }
});

app.get("/api/solved", async (req, res) => {
    const cfHandle = "coder_prabhu";
    const lcHandle = "code_smasher_prabhu";

    try {
        const cf = await getCodeforcesSolved(cfHandle);
        const lc = await getLeetCodeSolved(lcHandle);

        res.json({
            codeforces: cf.solved,
            leetcode: lc.solved,
            codechef: 212,
            total: cf.solved + lc.solved + 212
        });

    } catch (err) {
        res.json({
            codeforces: 0,
            leetcode: 0,
            codechef: 0,
            total: 0
        });
    }
});

async function getProblemTags(slug) {
    const query = `
    query getQuestion($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        topicTags {
          name
        }
      }
    }`;

    const res = await axios.post("https://leetcode.com/graphql", {
        query,
        variables: { titleSlug: slug }
    });

    return res.data.data.question.topicTags.map(t => t.name);
}

async function buildTopicProgress(username) {
    const query = `
    query {
      recentAcSubmissionList(username: "${username}", limit: 50) {
        titleSlug
      }
    }`;

    const res = await axios.post("https://leetcode.com/graphql", { query });

    const submissions = res.data.data.recentAcSubmissionList;

    const topicCount = {};
    const seen = new Set();

    for (let s of submissions) {
        if (seen.has(s.titleSlug)) continue;
        seen.add(s.titleSlug);

        const tags = await getProblemTags(s.titleSlug);

        tags.forEach(tag => {
            topicCount[tag] = (topicCount[tag] || 0) + 1;
        });
    }

    return topicCount;
}

app.get("/api/leetcode/topics", async (req, res) => {
    const username = "code_smasher_prabhu";

    try {
        const data = await buildTopicProgress(username);
        res.json(data);
    } catch (err) {
        res.json({});
    }
});

async function startBrowser() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox","--disable-dev-shm-usage"]
  });
  return browser;
}
// ================= SERVER =================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});