# 🚀 Personal Portfolio Website

A modern and responsive personal portfolio website built using HTML, CSS, JavaScript, Node.js, Express.js, and Firebase Realtime Database.

## ✨ Features

- Responsive Portfolio UI
- Machine Learning Projects Section
- Web Development Projects Section
- Firebase Realtime Database Integration
- Add & Display Projects
- GitHub & Live Demo Links
- Coding Profiles Integration
  - LeetCode
  - Codeforces
  - CodeChef
- Contest Statistics
- Problem Solving Statistics
- REST APIs using Express.js

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- Firebase Realtime Database

### APIs
- LeetCode GraphQL
- Codeforces API
- CodeChef API
- Puppeteer

---

## 📂 Project Structure

```
portfolio/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── resume/
│   ├── resume.html
│   ├── style.css
│   └── script.js
│
|──skills
|  ├──academics
|    ├──assets
|      ├──sem1.jpg
|      ├──sem2.jpg
|      ├──sem3.jpg
|      ├──sem4.jpg
|    ├──css
|      ├──style.css
|    ├──js
|      ├──script.js
|    ├──index.html
|  ├──coding
|    ├──css
|      ├──style.css
|    ├──js
|      ├──data.js
|    ├──index.html
|  ├──development
|    ├──css
|      ├──style.css
|    ├──js
|      ├──script.js
|    ├──index.html
|  ├──ml-studio
|    ├──css
|      ├──style.css
|    ├──js
|      ├──script.js
|    ├──index.html
|  ├──outreach
|    ├──css
|      ├──style.css
|    ├──index.html
|  ├──css
|    ├──style.css
|  ├──index.html
|  ├──profile.png
└── README.md
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/PRABHATKUMARARYA/portfolio.git
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
FIREBASE_PROJECT_ID=my-portfolio-8acc9
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-fbsvc@my-portfolio-8acc9.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCq7rad8xsnZCKV\n3/ByLkisvQ7kLPrH0XWsiCutL1REmoeXUekjkuQ/CD5GP2F0ud6xzkpTRoF/ohzf\nUQXN5Cydyo30uECR/goyEbyQc/CxLR+Dr2St31V85BeeVW+Q8g4U2ZJAMn50Zvag\naieOKO1XxmBVekEGl1ZxMAonNSMzO4nSV4NdUIsOwhPdQv0tcuBeHu3xLBXCdWmg\njgZ9ZMdqbc+jYhOUOXy87GAYIo+9lno5qnVBk038n2go4crmqVudVazBUiOb+Vql\n3//NEQm5cYPnHbwdvs+jGaHVIdqdKG80OsNhECozkrXToYJfdC2aiBNhcj5khp77\nRCyJxarZAgMBAAECgf9ofoYlCPkQm6aI+N2E78Z90xXHZ7fnb6UAVD5fIQ/i4JUD\nbI+Zr7LY1bE8QILTWM1K5VGKlw+TdwcvfdiOhW7BB5LAh+LxXNvev/kGVdpOdcdO\nOWrS4DTipI3LvW72rQLuvBMsK7Iids9OQZbs0RhHEH7Twmj+HoY5q6SJU3KxXjSZ\nkjqC7FWOmek+buhI2ifwtDrOd/7PmHmHynYtFDXeLcg60MzzOEt2KPZ0emO/nMsM\nAmZvh04rRisvLnNkZdwxn8m0O3rT9YmpEC/7k2gDkfUBqHL2CW+jbxBL9Vsz7TYo\nAFmJfCiEvKC7MvWf7EfxFtqBI3C/0kdjiVbz48MCgYEA1BJNsI72A4/BDbNB/4mD\nPkk89JEricoGmsMiAum1AyxbDGzqCL2f3U0AO2LCJN65R7bmO01ugwXA8zYtqnSt\ntio8o9W0+9RCp4kKi8i5RUhNeyPkFfR0i1Lz4P2GNBoyqmhl2h78e6eIP3c09vhg\nSHDdpNC5dAwhG42J7qUByOsCgYEAzlblTIlnDNhCgetH5mIUiREFru39mWrJ8dP9\nnJOexsh6Y6tEdy7mGqRXaTkna1FdicOz9IXYVa7Du1rSKvUX3BknyWfmdwRWaH0u\nCMxLrjZKhcZO/Km42bNTOYNUPmAlWLLyWG2yCIJl06cin1IBPOX+MRH2OPG7WI3t\nZSuL6ksCgYEAp/Mu78robn2kiHMUq4l+FQ/vZEir0F3cySgMgX4QysiP+tEur2lt\nd9eJfX6C/qwc0/y3bPOvt7gQzQx1Me9hu0jL6XxP7rh1aTUQ0w9OGt5d7k3ITtLg\nkY5Kcj6V0CGHSomPUCUGE+/j6U9A9O5TYktwXRyoIo2Qkr+PIx4uwa0CgYEAjsnD\nU/uhvFnLbGyNDPjCjTeiXzOCUzB7H0Y8MqZVMep6B471iiSCR92CP+a1SKa9vCAZ\n4BTfaCvQd06aMe/52u3tgorMCYCO6y/1M1Fs7dnUKE7bSi2JJd3aseoX2jJepcrv\nuhHvKcRTAuyeIPJ2uNXP2dU8NpvRsa5FocVIxZECgYBKMy5UXjzxsa+YnBP8D2W0\n3nRgtcXQWoschkKFCveJdXov9+BNe9YwMQnW3XH+JI0wyxOZM4p7bsKriSo/eoqG\nhxr3bMug1JfgmnVln5JfgK9L9GzUQrfQ6kpXC+l6YCZ5sBd3xwymPDvAIZrNpKdO\naKVFneo8AH93js64dC+erw==\n-----END PRIVATE KEY-----\n"
FIREBASE_DATABASE_URL=https://my-portfolio-8acc9-default-rtdb.firebaseio.com
```

Start the server

```bash
npm start dev
```

or

```bash
nodemon server.js
```

---

## 👨‍💻 Author

**Prabhat Kumar Arya**

GitHub: https://github.com/PRABHATKUMARARYA

LinkedIn: https://www.linkedin.com/in/prabhat-kumar-arya-883a79324/

---

## 📜 License

This project is licensed under the MIT License.
