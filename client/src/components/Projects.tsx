import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Eye } from "lucide-react";
import dashboardImage from "@assets/generated_images/Web_dashboard_project_mockup_9ef34bbd.png";
import ecommerceImage from "@assets/generated_images/E-commerce_project_mockup_67b9ed98.png";
import mobileImage from "@assets/generated_images/Mobile_app_project_mockup_f8a418cb.png";

const projects = [
  {
    title: "Analytics Dashboard",
    description: "A comprehensive analytics dashboard built with React, TypeScript, and D3.js. Features real-time data visualization, user management, and responsive design.",
    image: dashboardImage,
    tags: ["React", "TypeScript", "D3.js", "Node.js", "PostgreSQL"],
    category: "Web Application",
    // todo: remove mock functionality - these should be real project links
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard. Built using Next.js and Stripe API.",
    image: ecommerceImage,
    tags: ["Next.js", "Stripe", "Prisma", "TailwindCSS", "Vercel"],
    category: "E-Commerce", 
    // todo: remove mock functionality - these should be real project links
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Task Management App",
    description: "Mobile-first task management application with real-time collaboration, drag-and-drop functionality, and offline support.",
    image: mobileImage,
    tags: ["React", "PWA", "Socket.io", "Express", "MongoDB"],
    category: "Mobile App",
    // todo: remove mock functionality - these should be real project links
    liveUrl: "#",
    githubUrl: "#",
  },
];

export function Projects() {
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
            setVisibleProjects((prev) => Array.from(new Set([...prev, index])));
          }
        });
      },
      { threshold: 0.2 }
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="py-24 bg-muted/20" data-testid="projects-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and side projects
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              ref={(el) => (refs.current[index] = el)}
              data-index={index}
              className={`group overflow-hidden hover-elevate transition-all duration-700 ${
                visibleProjects.includes(index) ? "animate-slide-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              data-testid={`project-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  data-testid={`img-project-${index}`}
                />
                <div className={`absolute inset-0 bg-black/60 flex items-center justify-center gap-3 transition-opacity duration-300 ${
                  hoveredProject === index ? "opacity-100" : "opacity-0"
                }`}>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="backdrop-blur-sm"
                    onClick={() => {
                      if (project.liveUrl !== "#") {
                        window.open(project.liveUrl, "_blank");
                      } else {
                        console.log(`Live demo placeholder for: ${project.title}`);
                      }
                    }}
                    data-testid={`button-view-project-${index}`}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="backdrop-blur-sm"
                    onClick={() => {
                      if (project.githubUrl !== "#") {
                        window.open(project.githubUrl, "_blank");
                      } else {
                        console.log(`GitHub placeholder for: ${project.title}`);
                      }
                    }}
                    data-testid={`button-github-project-${index}`}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                </div>
                <Badge 
                  className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm"
                  data-testid={`badge-category-${index}`}
                >
                  {project.category}
                </Badge>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className="text-xs"
                      data-testid={`tag-${tag.toLowerCase()}-${index}`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1"
                    onClick={() => console.log(`Opening live demo: ${project.title}`)}
                    data-testid={`button-live-demo-${index}`}
                  >
                    <ExternalLink className="w-3 h-3 mr-2" />
                    Live Demo
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => console.log(`Opening GitHub: ${project.title}`)}
                    data-testid={`button-view-code-${index}`}
                  >
                    <Github className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Want to see more of my work?
          </p>
          <Button
            variant="outline"
            size="lg"
            onClick={() => console.log("Opening GitHub profile")}
            data-testid="button-view-all-projects"
          >
            <Github className="w-4 h-4 mr-2" />
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
}