export type ServiceDetail = {
  number: string;
  title: string;
  eyebrow: string;
  headline: string;
  intro: string;
  problems: string[];
  deliverables: string[];
  useCases: string[];
  process: { title: string; description: string }[];
};

export const serviceData: Record<string, ServiceDetail> = {
  "software-engineering": {
    number: "01",
    title: "Software Engineering",
    eyebrow: "DIGITAL PRODUCTS & SOFTWARE",
    headline: "Software built around the way your business works.",
    intro:
      "Turn an idea, a manual process or an existing digital product into dependable software. BSANXS designs and develops websites, web applications and APIs around clear business objectives, practical user needs and a foundation that can grow.",
    problems: [
      "Your business relies on repetitive manual tasks or disconnected spreadsheets.",
      "Your website does not communicate your value or convert visitors effectively.",
      "Your team needs a custom application that off-the-shelf tools cannot provide.",
      "Your existing software needs better structure, reliability or room to scale.",
    ],
    deliverables: [
      "Business websites and conversion-focused landing pages",
      "Custom web applications and internal business tools",
      "Backend services, APIs and database integration",
      "Responsive interfaces and essential accessibility considerations",
      "Testing, deployment support and technical documentation",
    ],
    useCases: [
      "Customer portals and booking platforms",
      "Business dashboards and workflow tools",
      "Digital service platforms and MVPs",
      "Integration with existing business systems",
    ],
    process: [
      { title: "Discover", description: "Define the users, business goals, requirements and success criteria." },
      { title: "Design", description: "Plan the user experience, application structure and technical approach." },
      { title: "Build", description: "Develop the agreed features in clear, reviewable stages." },
      { title: "Validate", description: "Test core workflows, resolve issues and prepare for release." },
    ],
  },
  "ai-intelligent-systems": {
    number: "02",
    title: "AI & Intelligent Systems",
    eyebrow: "AI INTEGRATION & AUTOMATION",
    headline: "Put intelligent technology to work on real problems.",
    intro:
      "Apply AI where it can make a measurable difference. BSANXS helps businesses explore and integrate AI capabilities, automate repeatable workflows and connect intelligent tools to the systems people already use—with appropriate human oversight and clear limits.",
    problems: [
      "Staff spend valuable time processing repetitive information and requests.",
      "Business knowledge is scattered across documents, tools and conversations.",
      "Teams want to use AI but need a defined use case and a practical implementation plan.",
      "Existing workflows lack consistency, visibility or clear escalation paths.",
    ],
    deliverables: [
      "AI feature discovery and feasibility assessments",
      "LLM and third-party AI service integrations",
      "Workflow automation and task orchestration",
      "Document processing and information-retrieval workflows",
      "Evaluation, error handling and human-review checkpoints",
    ],
    useCases: [
      "Internal knowledge assistants",
      "Customer enquiry triage and response assistance",
      "Document classification and structured data extraction",
      "Operational reporting and workflow support",
    ],
    process: [
      { title: "Identify", description: "Choose a focused problem with a clear business benefit." },
      { title: "Assess", description: "Review data quality, integration needs, risks and expected costs." },
      { title: "Prototype", description: "Build a limited proof of concept against agreed success criteria." },
      { title: "Integrate", description: "Connect the validated solution, monitor results and refine responsibly." },
    ],
  },
  "systems-integration": {
    number: "03",
    title: "Systems & Integration",
    eyebrow: "CONNECTED TECHNOLOGY ECOSYSTEMS",
    headline: "Make your technology work as one system.",
    intro:
      "Connect applications, services, databases and devices so information can move reliably between them. BSANXS helps reduce fragmented workflows by designing integrations around data consistency, security, maintainability and the realities of your existing environment.",
    problems: [
      "Your tools store duplicate or inconsistent information.",
      "Teams move data manually between platforms.",
      "Different applications cannot communicate effectively.",
      "A new service needs to fit into an existing technical environment.",
    ],
    deliverables: [
      "API design and third-party service integration",
      "Data synchronisation and transformation workflows",
      "Backend integration services and webhooks",
      "System architecture and integration documentation",
      "Error handling, logging and integration testing",
    ],
    useCases: [
      "CRM, website and internal application connections",
      "Payment and notification service integrations",
      "Software-to-device communication",
      "Reporting pipelines across multiple data sources",
    ],
    process: [
      { title: "Map", description: "Document the systems, data flows, dependencies and access requirements." },
      { title: "Architect", description: "Choose integration patterns and define reliability and security controls." },
      { title: "Connect", description: "Implement and test the agreed interfaces and data flows." },
      { title: "Verify", description: "Validate end-to-end behaviour and document ongoing operational needs." },
    ],
  },
  "hardware-electronics-prototyping": {
    number: "04",
    title: "Hardware & Electronics Prototyping",
    eyebrow: "ELECTRONIC CONCEPT DEVELOPMENT",
    headline: "Move an electronics idea toward a testable prototype.",
    intro:
      "Explore whether an electronic concept can work before committing to a larger build. BSANXS supports early-stage prototyping with defined requirements, component selection, sensor and microcontroller exploration, and practical testing appropriate to the project's scope.",
    problems: [
      "You need to test a physical concept before investing in production.",
      "You are unsure which components or sensors fit your requirements.",
      "A proof of concept needs clearer technical requirements and test criteria.",
      "Your software idea depends on signals or measurements from physical hardware.",
    ],
    deliverables: [
      "Prototype requirements and component-selection guidance",
      "Sensor and microcontroller proof-of-concept development",
      "Basic circuit and interface prototyping, where scoped",
      "Firmware experiments and hardware-software testing",
      "Test notes, limitations and recommendations for next steps",
    ],
    useCases: [
      "Sensor-based monitoring concepts",
      "Microcontroller demonstrations",
      "Early product feasibility studies",
      "Hardware interfaces for software prototypes",
    ],
    process: [
      { title: "Define", description: "Set functional requirements, constraints, budget and safety considerations." },
      { title: "Select", description: "Evaluate components and choose a practical prototype approach." },
      { title: "Prototype", description: "Assemble or develop the agreed proof of concept." },
      { title: "Test", description: "Record observed behaviour, limitations and recommended improvements." },
    ],
  },
  "embedded-systems-iot": {
    number: "05",
    title: "Embedded Systems & IoT",
    eyebrow: "FIRMWARE & CONNECTED DEVICES",
    headline: "Connect physical devices to useful digital experiences.",
    intro:
      "Develop the foundations for connected products that sense, communicate and respond. BSANXS can help scope firmware, microcontroller-based prototypes, device connectivity and software interfaces, with the architecture matched to the operating environment and project requirements.",
    problems: [
      "A device needs firmware to control sensors or peripherals.",
      "Hardware measurements need to reach an application or dashboard.",
      "A prototype needs a practical communication and data-collection approach.",
      "You need to evaluate device behaviour before planning a larger deployment.",
    ],
    deliverables: [
      "Embedded software and firmware prototypes",
      "Sensor acquisition and device-control logic",
      "Device-to-application communication prototypes",
      "IoT data-flow and dashboard integration",
      "Functional testing and technical handover documentation",
    ],
    useCases: [
      "Environmental and equipment monitoring",
      "Connected-device proof of concepts",
      "Telemetry collection and visualisation",
      "Automation experiments for physical environments",
    ],
    process: [
      { title: "Scope", description: "Define device behaviour, power, connectivity and environmental constraints." },
      { title: "Engineer", description: "Develop the firmware and communication approach for the selected hardware." },
      { title: "Connect", description: "Link device data to the agreed application or service." },
      { title: "Test", description: "Check expected behaviour and document constraints and next steps." },
    ],
  },
  "3d-printing-product-design": {
    number: "06",
    title: "3D Printing & Product Design",
    eyebrow: "PHYSICAL CONCEPTS & PROTOTYPES",
    headline: "Give your product idea a form you can evaluate.",
    intro:
      "Move from a rough concept toward a physical model or functional prototype. BSANXS can support product-design planning, 3D-printable part development and prototype preparation, with material, tolerance and fabrication choices guided by the intended use.",
    problems: [
      "You need to evaluate the shape or fit of a product before manufacturing.",
      "A prototype requires a custom enclosure or mounting component.",
      "Your design needs to be considered for practical 3D printing.",
      "You want to communicate a physical concept more clearly to stakeholders.",
    ],
    deliverables: [
      "Initial product concept and design planning",
      "3D-printable component and enclosure modelling, as scoped",
      "Prototype preparation and design iterations",
      "Fit, assembly and usability considerations",
      "Fabrication guidance and handover files agreed for the project",
    ],
    useCases: [
      "Electronics enclosures and brackets",
      "Form-and-fit prototypes",
      "Product concept models",
      "Custom mounts and small functional parts",
    ],
    process: [
      { title: "Understand", description: "Clarify the part's purpose, dimensions, environment and constraints." },
      { title: "Model", description: "Develop a suitable design for review and prototype preparation." },
      { title: "Evaluate", description: "Review fit, geometry and intended-use requirements." },
      { title: "Refine", description: "Incorporate agreed changes and prepare the final scoped handover." },
    ],
  },
};
