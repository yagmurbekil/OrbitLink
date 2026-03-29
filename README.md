# OrbitLink - Space Industry Ecosystem Platform 🚀

OrbitLink is an intelligent B2B matchmaking platform developed as part of the **TUA Astro Hackathon**. It connects space industry stakeholders including Prime Contractors, Suppliers, R&D Laboratories, and SpaceTech Startups under a unified, data-driven ecosystem. 

By calculating dynamic "Compatibility Scores" based on Technology Readiness Levels (TRL), technical capabilities, and valid certifications, OrbitLink aims to resolve supply chain bottlenecks and accelerate collaborative space missions.

---

## 🌟 Key Features

* **Role-Based Profiling:** Distinct workflows and capability tags organized by 4 primary space ecosystem roles (Prime, Supplier, Lab, Startup).
* **Smart Matchmaking:** A dynamic algorithm that calculates an overall compatibility score considering 4 different axes: Capability, Domain, TRL, and Certifications.
* **Trust & Governance System:** Post-collaboration review and rating mechanisms ensuring reliable partnerships and accountability across the ecosystem.
* **Modern SPA-Like Experience:** Fluid UI transitions with an immersive space-themed visual identity, powered by vanilla HTML/CSS/JS and HTML Canvas.
* **Integrated Assistant:** Built-in floating chat assistant logic designed to guide users through ecosystem metrics and match scoring.

## 🛠️ Technology Stack

* **Backend:** ASP.NET Core 8.0 MVC (Model-View-Controller)
* **Frontend:** Vanilla HTML5, CSS3, JavaScript (No heavy UI frameworks)
* **Design Systems:** Google Fonts (Rajdhani, Share Tech Mono), Glassmorphism UI
* **Architecture:** Server-Side Rendering (SSR) hybridized with Client-Side dynamic DOM manipulation.

## 📂 Project Structure

```text
OrbitLinkApp/
├── Controllers/
│   └── HomeController.cs          # Contains the mocked dataset (COS seeding) and view routing
├── Models/
│   ├── Organization.cs            # Domain model for organizations and technical capabilities
│   └── DashboardViewModel.cs      # ViewModel aggregating data for the main dashboard
├── Views/
│   ├── Home/
│   │   └── Index.cshtml           # Main SPA container hosting the hero, metrics, and lists
│   └── Shared/
│       ├── _Layout.cshtml         # Clean base layout stripped of standard bootstrap footprints
│       ├── _Sidebar.cshtml        # Navigation sidebar partial view
│       ├── _ChatAssistant.cshtml  # Floating chat dock partial view
│       └── _AuthModals.cshtml     # Registration, Login, and Edit partial views
└── wwwroot/
    ├── css/
    │   └── site.css               # Core visual styles and animations
    └── js/
        └── orbitlink.js           # Client-side validation, filtering, and interactions
```

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
* [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) or later installed on your machine.

### Installation & Run

1. Clone the repository:
   ```bash
   git clone https://github.com/yagmurbekil/OrbitLink.git
   ```

2. Navigate into the project directory:
   ```bash
   cd OrbitLink/OrbitLinkApp
   ```

3. Build the project:
   ```bash
   dotnet build
   ```

4. Run the application:
   ```bash
   dotnet run
   ```

5. Open your web browser and navigate to the `localhost` URL provided in your terminal output (typically `http://localhost:5000` or `https://localhost:5001`).

## 🤝 Contribution & Reporting
As this is a hackathon prototype, the currently loaded data is seeded statically in memory via the `HomeController`. To add database support (e.g., Entity Framework Core) or implement the AI-based matching engine, feel free to fork this project and submit a Pull Request!

## 📜 License
Constructed exclusively for the **TUA Astro Hackathon**.
