# ⚡ TNEB Electricity Bill Calculator

> A modern, interactive web application to calculate Tamil Nadu Electricity Board (TANGEDCO) electricity bills, visualize slab-wise tariff progression, and understand energy costs.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)

🔗 **Live Demo**: [https://tneb-tariff-calculator.vercel.app](https://tneb-tariff-calculator.vercel.app)  
📦 **GitHub Repository**: [https://github.com/sarathy-cloud/TNEB-Tariff-Calculator](https://github.com/sarathy-cloud/TNEB-Tariff-Calculator)

---

## ✨ Features

- **⚡ Slab-Wise Progressive Billing**: Computes electricity charges based on official TANGEDCO slab rates.
- **🔄 Domestic Auto-Tiering**: Automatically switches tariff rates above 500 units according to TNEB LT Tariff I-A guidelines (including 100 free units subsidy).
- **🏪 Multi-Tariff Category Support**: Easily toggle between **Domestic (LT Tariff I-A)** and **Commercial / Shop (LT Tariff V)**.
- **📊 Dynamic Cost Visualization**: Interactive piecewise linear chart built with Recharts showing cost progression against units consumed.
- **📈 Slab Breakdown Bar**: Visual indicator showing unit distribution across active consumption tiers.
- **⚙️ Custom Surcharges & Taxes**: Configure Fixed Costs, Minimum Charges, Welding Surcharges, and Electricity Tax (E-Tax).
- **🌙 Glassmorphism UI & Dark Mode**: Responsive, modern glass UI with dark and light mode toggle.

---

## 📐 TNEB Tariff Slabs Overview

### Domestic (LT Tariff I-A)
- **0 – 100 units**: Free (Subsidized)
- **<= 500 Units Tier**:
  - 101 – 200 units: ₹0.00 / unit
  - 201 – 400 units: ₹4.70 / unit
  - 401 – 500 units: ₹6.30 / unit
- **> 500 Units Tier (Auto-Switched)**:
  - 101 – 400 units: ₹4.70 / unit
  - 401 – 500 units: ₹6.30 / unit
  - 501 – 600 units: ₹8.40 / unit
  - 601 – 800 units: ₹9.45 / unit
  - 801 – 1000 units: ₹10.50 / unit
  - 1001+ units: ₹11.55 / unit

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+ installed

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sarathy-cloud/TNEB-Tariff-Calculator.git
   cd TNEB-Tariff-Calculator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
