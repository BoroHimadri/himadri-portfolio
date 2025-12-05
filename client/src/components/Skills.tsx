import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Globe, Server } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: Globe,
    color: "text-blue-500",
    skills: [
      { name: "React", level: 85, description: "Building interactive UIs" },
      { name: "TypeScript", level: 80, description: "Type-safe development" },
      { name: "Next.js", level: 75, description: "Full-stack React framework" },
      { name: "Tailwind CSS", level: 90, description: "Utility-first styling" },
    ],
  },
  {
    title: "Backend & Other Tools",
    icon: Server,
    color: "text-green-500",
    skills: [
      { name: "Node.js", level: 80, description: "Server-side JavaScript" },
      { name: "Express", level: 75, description: "Web application framework" },
      { name: "REST APIs", level: 85, description: "API design & development" },
      { name: "Git", level: 85, description: "Version control" },
    ],
  },
];

export function Skills() {
  const [visibleCategories, setVisibleCategories] = useState<number[]>([]);
  const [animatedSkills, setAnimatedSkills] = useState<string[]>([]);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0"
            );
            setVisibleCategories((prev) =>
              Array.from(new Set([...prev, index]))
            );

            // Animate skill bars after category appears
            setTimeout(() => {
              const categorySkills = skillCategories[index].skills.map(
                (skill) => `${index}-${skill.name}`
              );
              setAnimatedSkills((prev) =>
                Array.from(new Set([...prev, ...categorySkills]))
              );
            }, 200);
          }
        });
      },
      { threshold: 0.3 }
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-24" data-testid="skills-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <Card
              key={category.title}
              ref={(el) => (refs.current[categoryIndex] = el)}
              data-index={categoryIndex}
              className={`p-6 hover-elevate transition-all duration-700 ${
                visibleCategories.includes(categoryIndex)
                  ? "animate-scale-in"
                  : "opacity-0"
              }`}
              style={{ animationDelay: `${categoryIndex * 0.2}s` }}
              data-testid={`skill-category-${category.title.toLowerCase()}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`p-2 rounded-lg bg-primary/10 ${category.color}`}
                >
                  <category.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    className="space-y-2"
                    data-testid={`skill-${skill.name.toLowerCase()}`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{skill.name}</span>
                        <p className="text-xs text-muted-foreground">
                          {skill.description}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {skill.level}%
                      </Badge>
                    </div>
                    <Progress
                      value={
                        animatedSkills.includes(
                          `${categoryIndex}-${skill.name}`
                        )
                          ? skill.level
                          : 0
                      }
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Technologies */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-8">
            Additional Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "JavaScript",
              "HTML5",
              "CSS3",
              "Sass",
              "Webpack",
              "Vite",
              "ESLint",
              "Prettier",
              "Figma",
              "Postman",
              "VS Code",
            ].map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="px-3 py-1 hover-elevate transition-all duration-200 hover:scale-105"
                data-testid={`tech-badge-${tech.toLowerCase()}`}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
