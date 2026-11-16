# Assignment 8 — Study Programme Information Server

A lightweight back-end server built with **Node.js (ES Modules)** and **Express 5** for the **BSc in Applied Web Systems** study programme. It serves a static browser interface to test all endpoints, provides structured JSON/plain-text/redirect responses, tracks server traffic via custom middleware, and handles unknown routes cleanly.

---

## Table of Contents
1. [Installation & Running](#installation--running)
2. [File Organization](#file-organization)
3. [API & Route Overview](#api--route-overview)
4. [Middleware Design & Counting Rules](#middleware-design--counting-rules)
5. [Testing Evidence (`curl --include`)](#testing-evidence-curl---include)
6. [Reasoning Questions](#reasoning-questions)
7. [Self-Study Notes](#self-study-notes)
8. [Challenges Faced](#challenges-faced)

---

## Installation & Running

### Prerequisites
- **Node.js** (LTS, v20+ or v22+)
- **npm**

### Setup
1. Clone the repository and enter the project directory:
   ```bash
   git clone <your-repo-url>
   cd assignment8