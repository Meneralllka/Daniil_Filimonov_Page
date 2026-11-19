// English content. Everything here mirrors the CV — rewrite freely (copy pass pending).
// **double asterisks** render as bold.
window.CONTENT = window.CONTENT || {};
window.CONTENT.en = {
  name: "Daniil Filimonov",
  title: "Daniil Filimonov — robotics researcher & engineer",
  nav: { home: "home", cv: "cv", experience: "experience", projects: "projects", consulting: "consulting", mentorship: "mentorship" },
  ui: {
    shotAlt: "screenshot of the website",
    linkedin: "LinkedIn", contactTitle: "contact", detailsSoon: "details coming soon",
    dark: "dark", light: "light", photoSoon: "photo coming soon",
    sheet: "Sheet", pitch: "Pitch", fig: "Fig.", alt: "alt", summit: "summit", drawn: "Drawn by", rev: "Rev", role: "Robotics · NYU", detail: "Detail", clips: { slope: "slope test", step: "step climbing", swim: "swimming", climb: "wall climbing", walk: "walking gait", demo: "terrain demo", drop: "drop test" },
    theme: "Switch theme", downloadCv: "Download CV (PDF)", email: "Email me", watch: "play", open: "Open",
    hoverHint: "hover a robot — they move", footer: "Built with my own robots. Footage: PREMA Lab (NYU), CREATE Lab (EPFL), ISSAI (NU).",
    paper: "Published in", with: "with", draft: "draft"
  },

  home: {
    kicker: "robots that crawl, climb, roll and survive a fall",
    lead: "PhD student in Mechanical Engineering at **New York University**. I design, prototype and control unconventional mobile robots — from first sketch to a machine that works on real terrain.",
    sub: "Open to **research**, **tech industry** and **consulting** internships.",
    cta: [
      { to: "experience", label: "Research experience" },
      { to: "projects", label: "Projects" },
      { to: "mentorship", label: "Mentorship" }
    ],
    shelfTitle: "the robots",
    shelf: { ciri: "CIRI — climbing robot", worma: "WorMa — amphibious", flexiv: "FLEXIV — shape-shifting track", tensegrity: "Tensegrity — drops from height" },
    // ARCHIVED 2026-11-19: the numbers grid is not rendered (see R.home). Kept here to bring back later.
    numbersTitle: "in numbers",
    numbers: [
      { n: "1.5", u: "months", t: "CIRI: from idea to a climbing prototype" },
      { n: "33", u: "%", t: "lower Cost of Transport on inclines (WorMa)" },
      { n: "16", u: "g", t: "impact survived by the tensegrity robot" },
      { n: "50", u: "°", t: "inclines climbed by FLEXIV without vision" },
      { n: "3", u: "papers", t: "Advanced Robotics Research · IEEE RAM · IECON" },
      { n: "$20k", u: "", t: "education grant co-authored for Kazakhstan" }
    ],
    tracksTitle: "what I am looking for",
    tracks: [
      { to: "experience", h: "Research internships", p: "Mechanism design, locomotion, soft and bio-inspired robots. Research at NYU, EPFL and Nazarbayev University, three publications." },
      { to: "projects", h: "Tech industry internships", p: "Hardware from CAD to a working prototype: Fusion 360, SOLIDWORKS, 3D printing, ESP32 / Raspberry Pi, C++ and Python." },
      { to: "projects", h: "Consulting internships", p: "Taking a hardware idea to a prototype that works, quickly — and building tools teams adopt, like premacontroller." }
    ]
  },

  cv: {
    h: "Curriculum vitae",
    educationTitle: "Education",
    education: [
      { what: "**New York University (NYU)** — PhD in Mechanical Engineering", when: "Aug 2026 – Present" },
      { what: "**Nazarbayev University (NU)** — BSc in Robotics Engineering", when: "Aug 2020 – Jun 2025" }
    ],
    pubsTitle: "Selected publications",
    pubs: [
      { authors: "**Filimonov, D.**, Obayashi, N.", url: "https://advanced.onlinelibrary.wiley.com/doi/10.1002/adrr.70163", title: "WorMa: An Undulatory Robot With Center of Mass Regulation via Internal Fluid Redistribution for Amphibious Locomotion.", venue: "Advanced Robotics Research, 2026", note: "" },
      { authors: "Kim, S.¹, **Filimonov, D.**¹, Hughes, J.", url: "https://ieeexplore.ieee.org/document/11075546", title: "FLEXIV: Adaptive Locomotion via Morphological Changes in a Flexible Track Vehicle.", venue: "IEEE Robotics & Automation Magazine, 2025", note: "¹Equal contribution. Oral and poster presenter at IROS 2025. Invention Disclosure EPFL TTO, 6.2604" },
      { authors: "**Filimonov, D.**, Zhakatayev, A., Varol, H.A.", title: "A Tensegrity Hybrid Mobile Robot with Mechanical Impact Resistance.", venue: "IECON 2024 Conference, Chicago, USA, 2024", note: "Oral presenter" }
    ],
    honorsTitle: "Honors, fellowships & service",
    honors: [
      { h: "Yessenov Foundation Grant", sub: "Program for Scientific Internships in Leading Global Laboratories", items: [
        "Selected from top **7%** of applicants; program supports high-potential Kazakhstani researchers",
        "Awarded a **$9,700 grant** to conduct research at CREATE Lab, EPFL, Switzerland",
        "Secured additional **$1,500 funding** to attend IROS 2025, Hangzhou, China",
        "**Review Committee Member**, reviewed 40 applications for Data Lab and Launch Pad programs" ] },
      { h: "U.S. Embassy Educational Projects Grant — Beyond Robotics Project", sub: "Chevron LLC & U.S. Embassy in Kazakhstan Partnership", items: [
        "Co-authored **$20,000 grant** proposal as a member of Beyond Curriculum Foundation",
        "Headed the project and developed **free robotics education materials** in Kazakh and Russian" ] }
    ],
    skillsTitle: "Technical skills",
    skills: [
      { h: "Programming", v: "C, C++, Python, GitHub" },
      { h: "Hardware", v: "Arduino, ESP, Raspberry Pi, FPGA" },
      { h: "Software", v: "MATLAB, Fusion 360, SOLIDWORKS, Figma, Linux, ROS" },
      { h: "Specialized", v: "Signal Processing, CNNs, Image Processing, Soldering, 3D Printing, LaTeX, Markdown" }
    ]
  },

  experience: {
    h: "Research experience",
    jobs: [
      { org: "PREMA Lab, NYU", role: "Research Assistant", pi: "Professor Nana Obayashi", when: "Feb 2026 – Present", items: [
        "Spearheaded the end-to-end design and rapid prototyping of **WorMa** (amphibious undulatory robot) and **CIRI** (climbing robot) in 3.5 and 1.5 months respectively, achieving 19.5° slope climbing and 15 cm step clearance",
        "Architected and deployed **premacontroller**, a lab-wide WiFi telemetry and tuning dashboard adopted as the primary data-logging standard for microcontroller projects across the laboratory",
        "Designed open-loop control systems and Python simulations, utilizing internal fluid redistribution (shifting 28% of total body mass via peristaltic pumps) to reduce Cost of Transport by 33% on inclines",
        "Managed 3D printing infrastructure, equipment procurement, and lab budgets while mentoring two Master's students on soft robotics and wearable actuators" ] },
      { org: "Institute of Smart Systems and Artificial Intelligence, NU", role: "Research Assistant", pi: "Professor Huseyin Atakan Varol", when: "May 2022 – Dec 2025", items: [
        "Engineered a hybrid mobile robot with tensegrity constructions, capable of withstanding mechanical impact with **acceleration up to 16g**",
        "Designed the switchable wheeled/legged modes (**Fusion 360**) and integrated the full embedded system (**ESP32/Raspberry Pi**), enabling bidirectional communications",
        "Developed the orientation control system using a gyroscope for a **10 kg body in free fall**, demonstrating real-time sensor fusion and control expertise" ] },
      { org: "CREATE Lab, EPFL, Switzerland", role: "Summer Research Intern", pi: "Professor Josie Hughes", when: "May 2024 – Aug 2024", items: [
        "Resolved flexible track slippage by implementing a gear-driven locomotion system in **Fusion 360**",
        "Designed a caterpillar robot with **adjusting wheelbase (6–17.5 cm)**, achieving stable navigation across diverse geometries like **50° inclines, 38 cm drops, and steps** without vision-based sensors",
        "Built a terrain-adaptive control system using **IMU orientation** real-time data" ] }
    ]
  },

  projects: {
    h: "Projects",
    intro: "Every robot below was designed, built and tested hands-on. The clips are real experiments.",
    list: [
      { id: "worma", name: "WorMa", tag: "Amphibious undulatory robot · PREMA Lab, NYU · 2026",
        p: "An undulatory robot that regulates its centre of mass by pumping fluid inside its own body. Peristaltic pumps shift 28% of total body mass, cutting Cost of Transport by 33% on inclines. Designed and prototyped end-to-end in 3.5 months.",
        specs: ["19.5° slope", "15 cm step", "28% mass shifted", "−33% CoT", "land + water"],
        pub: "Advanced Robotics Research, 2026",
        links: [{ label: "paper", url: "https://advanced.onlinelibrary.wiley.com/doi/10.1002/adrr.70163" }] },
      { id: "ciri", name: "CIRI", tag: "Climbing robot · PREMA Lab, NYU · 2026",
        p: "A climbing robot. Details coming soon.",
        specs: [] },
      { id: "flexiv", name: "FLEXIV", tag: "Flexible track vehicle · CREATE Lab, EPFL · 2024",
        p: "A caterpillar robot that changes its own shape: the wheelbase adjusts from 6 to 17.5 cm, morphing the track between circular and oblong. A gear-driven drive removed track slippage, and IMU-based terrain-adaptive control handles obstacles without any vision sensors.",
        specs: ["50° inclines", "38 cm drops", "6–17.5 cm wheelbase", "no vision"],
        pub: "IEEE Robotics & Automation Magazine, 2025 · IROS 2025 oral · Invention Disclosure EPFL TTO",
        links: [{ label: "paper", url: "https://ieeexplore.ieee.org/document/11075546" }] },
      { id: "tensegrity", name: "Tensegrity hybrid robot", tag: "Impact-resistant mobile robot · ISSAI, NU · 2022–2025",
        p: "A hybrid mobile robot built on tensegrity structures that survives mechanical impacts up to 16 g. Switchable wheeled and legged modes, full embedded stack on ESP32 / Raspberry Pi, and gyroscope-based orientation control for a 10 kg body in free fall.",
        specs: ["16 g impact", "10 kg", "wheeled ⇄ legged", "ESP32 + RPi"],
        pub: "IECON 2024, Chicago" },
      { id: "prema", name: "premacontroller", tag: "ESP32 control & telemetry dashboard · PREMA Lab, NYU",
        p: "An end-to-end setup for controlling and tuning ESP32 robots over WiFi. The robot describes its signals and settings, and the browser dashboard builds itself from that: live plots, sliders that change parameters on the robot in real time, recording to CSV, and Bluetooth gamepad control. Adopted as the data-logging standard for microcontroller projects across the lab. Available to anyone: the code is on GitHub and the dashboard runs in the browser with nothing to install.",
        specs: ["ESP32 + PlatformIO", "WiFi / WebSocket", "live plots + tuning", "CSV logging", "gamepad"],
        links: [{ label: "GitHub", url: "https://github.com/Prema-Lab/PremaController_ESP32" }, { label: "open the dashboard", url: "https://prema-lab.github.io/PremaController_Web/" }] },
      { id: "beyond", name: "Beyond Robotics", tag: "Free robotics education · Beyond Curriculum Foundation",
        p: "Headed a project funded by a $20,000 U.S. Embassy & Chevron grant: free robotics education materials in Kazakh and Russian.",
        specs: ["$20,000 grant", "Kazakh + Russian", "open materials"],
        links: [{ label: "robotics.bc-pf.org", url: "https://robotics.bc-pf.org/" }] }
    ]
  },

  // ARCHIVED 2026-11-19: the consulting page is out of the nav (see ROUTES in js/app.js). Kept to bring back later.
  consulting: {
    h: "Tech consulting",
    intro: "I take hardware ideas from a sketch to a prototype that works outside the lab — quickly. The same process that produced a climbing robot in 1.5 months and an amphibious one in 3.5.",
    servicesTitle: "what I can help with",
    services: [
      { h: "Rapid robotic prototyping", p: "End-to-end: concept, CAD (Fusion 360, SOLIDWORKS), 3D printing, assembly, testing. Working prototypes in weeks, not quarters." },
      { h: "Embedded systems & telemetry", p: "ESP32, Arduino, Raspberry Pi, FPGA. WiFi dashboards for live data and tuning — like premacontroller, now a lab-wide standard." },
      { h: "Locomotion & mechanism design", p: "Tracks, legs, wheels, claws, compliant and tensegrity structures. Robots that handle 50° inclines, 38 cm drops and 16 g impacts." },
      { h: "Sensing & control", p: "IMU-based terrain adaptation, sensor fusion, open-loop gait design, Python simulation." },
      { h: "Lab & workshop setup", p: "3D-printing infrastructure, equipment procurement and budgets — run in practice at PREMA Lab." }
    ],
    proofTitle: "why it is worth it",
    proof: [
      "**3 robots** published in peer-reviewed venues, one with an **invention disclosure** (EPFL TTO)",
      "**−33%** Cost of Transport from a single design idea",
      "Tools I build get adopted: **premacontroller** is the lab's data-logging standard"
    ],
    cta: "Tell me about your project"
  },

  mentorship: {
    h: "Mentorship",
    intro: "I enjoy helping people get into robotics and research — in English, Russian or Kazakh.",
    itemsTitle: "what I have done",
    items: [
      { h: "Mentoring graduate students", p: "Mentoring two Master's students at PREMA Lab on soft robotics and wearable actuators." },
      { h: "Beyond Robotics", p: "Headed the project and developed free robotics education materials in Kazakh and Russian (U.S. Embassy & Chevron grant, $20,000)." },
      { h: "Yessenov Foundation review committee", p: "Reviewed 40 applications for the Data Lab and Launch Pad programs." }
    ],
    cta: "Write to me"
  }
};
