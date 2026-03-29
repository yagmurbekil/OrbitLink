using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using OrbitLinkApp.Models;
using System.Collections.Generic;

namespace OrbitLinkApp.Controllers;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        var companies = new List<Organization>
        {
            new Organization {
                Id = 1,
                Name = "Nova Aero Components",
                Type = "Supplier / Manufacturer",
                Country = "Turkey 🇹🇷",
                Tags = new string[] { "RF Systems","PCB Manufacturing","Embedded Systems" },
                Certs = new string[] { "ISO 9001","AS9100" },
                Trl = "TRL 4–7",
                Rating = 4.7,
                Reviews = 23,
                Reports = 0,
                UnderReview = false,
                OverallMatch = 0,
                Scores = new MatchScores {
                    CapabilityMatch = 95,
                    DomainMatch = 90,
                    TrlMatch = 90,
                    CertMatch = 100
                }
            },
            new Organization {
                Id = 2,
                Name = "CosmoLab Istanbul",
                Type = "R&D / Test Laboratory",
                Country = "Turkey 🇹🇷",
                Tags = new string[] { "Thermal Analysis","EMC/EMI Testing","Clean Room" },
                Certs = new string[] { "Clean Room","Thermal Vacuum" },
                Trl = "TRL 3–7",
                Rating = 4.5,
                Reviews = 17,
                Reports = 0,
                UnderReview = false,
                OverallMatch = 0,
                Scores = new MatchScores {
                    CapabilityMatch = 88,
                    DomainMatch = 82,
                    TrlMatch = 95,
                    CertMatch = 90
                }
            },
            new Organization {
                Id = 3,
                Name = "TurkSpace Defense",
                Type = "Project Owner / Prime Contractor",
                Country = "Turkey 🇹🇷",
                Tags = new string[] { "Systems Engineering","Avionics","Payload Integration" },
                Certs = new string[] { "AS9100","ISO 9001" },
                Trl = "TRL 7–9",
                Rating = 4.9,
                Reviews = 41,
                Reports = 0,
                UnderReview = false,
                OverallMatch = 0,
                Scores = new MatchScores {
                    CapabilityMatch = 85,
                    DomainMatch = 88,
                    TrlMatch = 80,
                    CertMatch = 100
                }
            },
            new Organization {
                Id = 4,
                Name = "SatSens Technologies",
                Type = "SpaceTech Startup",
                Country = "Turkey 🇹🇷",
                Tags = new string[] { "Antenna Systems","RF Systems","Telemetry" },
                Certs = new string[] { "IPC Standards","ISO 9001" },
                Trl = "TRL 3–6",
                Rating = 4.1,
                Reviews = 6,
                Reports = 0,
                UnderReview = false,
                OverallMatch = 0,
                Scores = new MatchScores {
                    CapabilityMatch = 78,
                    DomainMatch = 72,
                    TrlMatch = 80,
                    CertMatch = 80
                }
            },
            new Organization {
                Id = 5,
                Name = "Roketsan Prime",
                Type = "Project Owner / Prime Contractor",
                Country = "Turkey 🇹🇷",
                Tags = new string[] { "Mission Architecture","Systems Engineering","Risk Management" },
                Certs = new string[] { "AS9100","MIL-STD" },
                Trl = "TRL 6–9",
                Rating = 4.8,
                Reviews = 32,
                Reports = 0,
                UnderReview = false,
                OverallMatch = 0,
                Scores = new MatchScores {
                    CapabilityMatch = 90,
                    DomainMatch = 92,
                    TrlMatch = 88,
                    CertMatch = 95
                }
            },
            new Organization {
                Id = 6,
                Name = "BilimTech Labs",
                Type = "R&D / Test Laboratory",
                Country = "Turkey 🇹🇷",
                Tags = new string[] { "Vibration Testing","Materials Characterization","Simulation & Modelling" },
                Certs = new string[] { "ISO 9001","ECSS Standards" },
                Trl = "TRL 2–6",
                Rating = 4.3,
                Reviews = 11,
                Reports = 0,
                UnderReview = false,
                OverallMatch = 0,
                Scores = new MatchScores {
                    CapabilityMatch = 82,
                    DomainMatch = 78,
                    TrlMatch = 90,
                    CertMatch = 85
                }
            },
            new Organization {
                Id = 7,
                Name = "OrbitalEdge GmbH",
                Type = "SpaceTech Startup",
                Country = "Germany 🇩🇪",
                Tags = new string[] { "AI / Data Analytics","Telemetry","Ground Station" },
                Certs = new string[] { "IPC Standards" },
                Trl = "TRL 5–8",
                Rating = 4.2,
                Reviews = 9,
                Reports = 0,
                UnderReview = false,
                OverallMatch = 0,
                Scores = new MatchScores {
                    CapabilityMatch = 80,
                    DomainMatch = 75,
                    TrlMatch = 85,
                    CertMatch = 70
                }
            },
            new Organization {
                Id = 8,
                Name = "PropulTech GmbH",
                Type = "Supplier / Manufacturer",
                Country = "Germany 🇩🇪",
                Tags = new string[] { "Propulsion Hardware","Composite Materials","CNC Precision" },
                Certs = new string[] { "ISO 9001","AS9100" },
                Trl = "TRL 4–6",
                Rating = 3.8,
                Reviews = 12,
                Reports = 2,
                UnderReview = false,
                OverallMatch = 0,
                Scores = new MatchScores {
                    CapabilityMatch = 72,
                    DomainMatch = 70,
                    TrlMatch = 75,
                    CertMatch = 65
                }
            },
            new Organization {
                Id = 9,
                Name = "Astro Systems AG",
                Type = "R&D / Test Laboratory",
                Country = "Germany 🇩🇪",
                Tags = new string[] { "Optical Testing","EMC/EMI Testing","Thermal Vacuum" },
                Certs = new string[] { "ISO 9001","ECSS Standards" },
                Trl = "TRL 3–8",
                Rating = 4.6,
                Reviews = 28,
                Reports = 0,
                UnderReview = false,
                OverallMatch = 0,
                Scores = new MatchScores {
                    CapabilityMatch = 86,
                    DomainMatch = 84,
                    TrlMatch = 92,
                    CertMatch = 88
                }
            },
            new Organization {
                Id = 10,
                Name = "SpaceForge Europa",
                Type = "Project Owner / Prime Contractor",
                Country = "Germany 🇩🇪",
                Tags = new string[] { "Mission Architecture","Budget & Schedule Mgmt","Regulatory Compliance" },
                Certs = new string[] { "AS9100","ISO 9001" },
                Trl = "TRL 6–9",
                Rating = 4.7,
                Reviews = 19,
                Reports = 0,
                UnderReview = false,
                OverallMatch = 0,
                Scores = new MatchScores {
                    CapabilityMatch = 88,
                    DomainMatch = 86,
                    TrlMatch = 82,
                    CertMatch = 92
                }
            },
            new Organization {
                Id = 11,
                Name = "Apex Aerospace Inc.",
                Type = "Project Owner / Prime Contractor",
                Country = "USA 🇺🇸",
                Tags = new string[] { "Systems Engineering","PDR/CDR Leadership","Payload Integration" },
                Certs = new string[] { "AS9100","DO-178C" },
                Trl = "TRL 7–9",
                Rating = 4.9,
                Reviews = 55,
                Reports = 0,
                UnderReview = false,
                OverallMatch = 0,
                Scores = new MatchScores {
                    CapabilityMatch = 92,
                    DomainMatch = 94,
                    TrlMatch = 90,
                    CertMatch = 98
                }
            },
            new Organization {
                Id = 12,
                Name = "NovaStar Composites",
                Type = "Supplier / Manufacturer",
                Country = "USA 🇺🇸",
                Tags = new string[] { "Composite Materials","3D Printing / AM","Structural Analysis" },
                Certs = new string[] { "AS9100","ISO 9001" },
                Trl = "TRL 5–8",
                Rating = 4.5,
                Reviews = 22,
                Reports = 0,
                UnderReview = false,
                OverallMatch = 0,
                Scores = new MatchScores {
                    CapabilityMatch = 85,
                    DomainMatch = 80,
                    TrlMatch = 85,
                    CertMatch = 88
                }
            },
            new Organization {
                Id = 13,
                Name = "DataOrbit Labs",
                Type = "SpaceTech Startup",
                Country = "USA 🇺🇸",
                Tags = new string[] { "AI / Data Analytics","ML / Deep Learning","Data Processing" },
                Certs = new string[] { "ISO 9001" },
                Trl = "TRL 4–7",
                Rating = 4.3,
                Reviews = 14,
                Reports = 0,
                UnderReview = false,
                OverallMatch = 0,
                Scores = new MatchScores {
                    CapabilityMatch = 82,
                    DomainMatch = 76,
                    TrlMatch = 80,
                    CertMatch = 72
                }
            },
            new Organization {
                Id = 14,
                Name = "TechTest USA",
                Type = "R&D / Test Laboratory",
                Country = "USA 🇺🇸",
                Tags = new string[] { "Vibration Testing","Thermal Vacuum","Non-Destructive Testing" },
                Certs = new string[] { "MIL-STD","AS9100" },
                Trl = "TRL 4–8",
                Rating = 4.6,
                Reviews = 31,
                Reports = 0,
                UnderReview = false,
                OverallMatch = 0,
                Scores = new MatchScores {
                    CapabilityMatch = 87,
                    DomainMatch = 83,
                    TrlMatch = 91,
                    CertMatch = 90
                }
            },
            new Organization {
                Id = 15,
                Name = "ArianeGroup Suppliers",
                Type = "Supplier / Manufacturer",
                Country = "France 🇫🇷",
                Tags = new string[] { "Propulsion Hardware","Thermal Management","Optical Fabrication" },
                Certs = new string[] { "ECSS Standards","AS9100" },
                Trl = "TRL 5–9",
                Rating = 4.8,
                Reviews = 38,
                Reports = 0,
                UnderReview = false,
                OverallMatch = 0,
                Scores = new MatchScores {
                    CapabilityMatch = 90,
                    DomainMatch = 88,
                    TrlMatch = 94,
                    CertMatch = 96
                }
            },
            new Organization {
                Id = 16,
                Name = "CNES Innovation Hub",
                Type = "R&D / Test Laboratory",
                Country = "France 🇫🇷",
                Tags = new string[] { "Optical Calibration","Materials Research","Clean Room" },
                Certs = new string[] { "ECSS Standards","ISO 9001" },
                Trl = "TRL 3–8",
                Rating = 4.7,
                Reviews = 25,
                Reports = 0,
                UnderReview = false,
                OverallMatch = 0,
                Scores = new MatchScores {
                    CapabilityMatch = 88,
                    DomainMatch = 90,
                    TrlMatch = 88,
                    CertMatch = 92
                }
            },
            new Organization {
                Id = 17,
                Name = "Thales Alenia Partners",
                Type = "Project Owner / Prime Contractor",
                Country = "France 🇫🇷",
                Tags = new string[] { "Mission Architecture","Supply Chain Integration","Safety Assessment" },
                Certs = new string[] { "AS9100","ISO 9001" },
                Trl = "TRL 7–9",
                Rating = 4.9,
                Reviews = 47,
                Reports = 0,
                UnderReview = false,
                OverallMatch = 0,
                Scores = new MatchScores {
                    CapabilityMatch = 94,
                    DomainMatch = 92,
                    TrlMatch = 90,
                    CertMatch = 98
                }
            },
            new Organization {
                Id = 18,
                Name = "SkyTech Paris",
                Type = "SpaceTech Startup",
                Country = "France 🇫🇷",
                Tags = new string[] { "Earth Observation Data","Cloud Infrastructure","API Integration" },
                Certs = new string[] { "ISO 9001" },
                Trl = "TRL 4–7",
                Rating = 4.2,
                Reviews = 8,
                Reports = 0,
                UnderReview = false,
                OverallMatch = 0,
                Scores = new MatchScores {
                    CapabilityMatch = 78,
                    DomainMatch = 80,
                    TrlMatch = 78,
                    CertMatch = 70
                }
            },
            new Organization {
                Id = 19,
                Name = "Leonardo Space Solutions",
                Type = "Project Owner / Prime Contractor",
                Country = "Italy 🇮🇹",
                Tags = new string[] { "Systems Engineering","Payload Integration","Regulatory Compliance" },
                Certs = new string[] { "AS9100","ECSS Standards" },
                Trl = "TRL 6–9",
                Rating = 4.8,
                Reviews = 36,
                Reports = 0,
                UnderReview = false,
                OverallMatch = 0,
                Scores = new MatchScores {
                    CapabilityMatch = 91,
                    DomainMatch = 89,
                    TrlMatch = 88,
                    CertMatch = 95
                }
            },
            new Organization {
                Id = 20,
                Name = "SpaceRoma Components",
                Type = "Supplier / Manufacturer",
                Country = "Italy 🇮🇹",
                Tags = new string[] { "Avionics","PCB Manufacturing","Quality Assurance" },
                Certs = new string[] { "ISO 9001","AS9100" },
                Trl = "TRL 4–7",
                Rating = 4.4,
                Reviews = 18,
                Reports = 0,
                UnderReview = false,
                OverallMatch = 0,
                Scores = new MatchScores {
                    CapabilityMatch = 84,
                    DomainMatch = 80,
                    TrlMatch = 82,
                    CertMatch = 86
                }
            },
            new Organization {
                Id = 21,
                Name = "Politecnico Aerospace Lab",
                Type = "R&D / Test Laboratory",
                Country = "Italy 🇮🇹",
                Tags = new string[] { "Structural Testing","Simulation & Modelling","Materials Characterization" },
                Certs = new string[] { "ECSS Standards","ISO 9001" },
                Trl = "TRL 2–7",
                Rating = 4.5,
                Reviews = 21,
                Reports = 0,
                UnderReview = false,
                OverallMatch = 0,
                Scores = new MatchScores {
                    CapabilityMatch = 85,
                    DomainMatch = 86,
                    TrlMatch = 88,
                    CertMatch = 84
                }
            },
            new Organization {
                Id = 22,
                Name = "OrbitalMilano Startup",
                Type = "SpaceTech Startup",
                Country = "Italy 🇮🇹",
                Tags = new string[] { "In-Space Propulsion","Autonomous Systems","Software Development" },
                Certs = new string[] { "ISO 9001" },
                Trl = "TRL 3–6",
                Rating = 4.0,
                Reviews = 7,
                Reports = 0,
                UnderReview = false,
                OverallMatch = 0,
                Scores = new MatchScores {
                    CapabilityMatch = 76,
                    DomainMatch = 74,
                    TrlMatch = 76,
                    CertMatch = 68
                }
            },
            new Organization {
                Id = 23,
                Name = "SSTL Partners Ltd",
                Type = "Supplier / Manufacturer",
                Country = "UK 🇬🇧",
                Tags = new string[] { "RF & Antenna Hardware","Embedded Systems","Optical Systems" },
                Certs = new string[] { "AS9100","ISO 9001" },
                Trl = "TRL 5–8",
                Rating = 4.6,
                Reviews = 29,
                Reports = 0,
                UnderReview = false,
                OverallMatch = 0,
                Scores = new MatchScores {
                    CapabilityMatch = 88,
                    DomainMatch = 84,
                    TrlMatch = 86,
                    CertMatch = 90
                }
            },
            new Organization {
                Id = 24,
                Name = "Harwell Space Labs",
                Type = "R&D / Test Laboratory",
                Country = "UK 🇬🇧",
                Tags = new string[] { "Environmental Testing","EMC/EMI Testing","Thermal Vacuum" },
                Certs = new string[] { "ISO 9001","ECSS Standards" },
                Trl = "TRL 3–8",
                Rating = 4.5,
                Reviews = 24,
                Reports = 0,
                UnderReview = false,
                OverallMatch = 0,
                Scores = new MatchScores {
                    CapabilityMatch = 86,
                    DomainMatch = 82,
                    TrlMatch = 90,
                    CertMatch = 88
                }
            },
            new Organization {
                Id = 25,
                Name = "OneSpace UK",
                Type = "SpaceTech Startup",
                Country = "UK 🇬🇧",
                Tags = new string[] { "Space Debris Solutions","On-Orbit Servicing","ML / Deep Learning" },
                Certs = new string[] { "ISO 9001" },
                Trl = "TRL 4–7",
                Rating = 4.3,
                Reviews = 12,
                Reports = 0,
                UnderReview = false,
                OverallMatch = 0,
                Scores = new MatchScores {
                    CapabilityMatch = 80,
                    DomainMatch = 78,
                    TrlMatch = 82,
                    CertMatch = 72
                }
            },
            new Organization {
                Id = 26,
                Name = "BAE Space Prime",
                Type = "Project Owner / Prime Contractor",
                Country = "UK 🇬🇧",
                Tags = new string[] { "Mission Architecture","Systems Engineering","Defense & Security Space" },
                Certs = new string[] { "AS9100","MIL-STD" },
                Trl = "TRL 7–9",
                Rating = 4.8,
                Reviews = 43,
                Reports = 0,
                UnderReview = false,
                OverallMatch = 0,
                Scores = new MatchScores {
                    CapabilityMatch = 92,
                    DomainMatch = 90,
                    TrlMatch = 88,
                    CertMatch = 96
                }
            },
            new Organization {
                Id = 27,
                Name = "Mohamed bin Rashid Space",
                Type = "Project Owner / Prime Contractor",
                Country = "UAE 🇦🇪",
                Tags = new string[] { "Mission Architecture","Systems Engineering","Deep Space Exploration" },
                Certs = new string[] { "AS9100","ISO 9001" },
                Trl = "TRL 6–9",
                Rating = 4.9,
                Reviews = 28,
                Reports = 0,
                UnderReview = false,
                OverallMatch = 0,
                Scores = new MatchScores {
                    CapabilityMatch = 91,
                    DomainMatch = 93,
                    TrlMatch = 86,
                    CertMatch = 94
                }
            },
            new Organization {
                Id = 28,
                Name = "Emirates Avionics",
                Type = "Supplier / Manufacturer",
                Country = "UAE 🇦🇪",
                Tags = new string[] { "Avionics","Embedded Systems","RF Systems" },
                Certs = new string[] { "AS9100","ISO 9001" },
                Trl = "TRL 5–8",
                Rating = 4.5,
                Reviews = 15,
                Reports = 0,
                UnderReview = false,
                OverallMatch = 0,
                Scores = new MatchScores {
                    CapabilityMatch = 85,
                    DomainMatch = 82,
                    TrlMatch = 84,
                    CertMatch = 88
                }
            },
            new Organization {
                Id = 29,
                Name = "Khalifa University Lab",
                Type = "R&D / Test Laboratory",
                Country = "UAE 🇦🇪",
                Tags = new string[] { "Materials Research","Simulation & Modelling","Optical Calibration" },
                Certs = new string[] { "ECSS Standards","ISO 9001" },
                Trl = "TRL 2–7",
                Rating = 4.4,
                Reviews = 11,
                Reports = 0,
                UnderReview = false,
                OverallMatch = 0,
                Scores = new MatchScores {
                    CapabilityMatch = 83,
                    DomainMatch = 85,
                    TrlMatch = 86,
                    CertMatch = 82
                }
            },
            new Organization {
                Id = 30,
                Name = "Bayanat Space Analytics",
                Type = "SpaceTech Startup",
                Country = "UAE 🇦🇪",
                Tags = new string[] { "AI / Data Analytics","Earth Observation Data","Cloud Infrastructure" },
                Certs = new string[] { "ISO 9001" },
                Trl = "TRL 4–7",
                Rating = 4.2,
                Reviews = 9,
                Reports = 0,
                UnderReview = false,
                OverallMatch = 0,
                Scores = new MatchScores {
                    CapabilityMatch = 79,
                    DomainMatch = 81,
                    TrlMatch = 78,
                    CertMatch = 72
                }
            }
        };

        var model = new DashboardViewModel
        {
            Companies = companies
        };

        return View(model);
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
