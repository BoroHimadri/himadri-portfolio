import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";

const codeSnippets = [
  "const developer = { name: 'Himadri Boro', experience: '2 years' };",
  "function buildAmazingApps() { return 'React + TypeScript'; }",
  "npm install awesome-portfolio",
  "git commit -m 'Another successful project'",
  "const skills = ['React', 'Node.js', 'TypeScript'];",
];

export function Hero() {
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5"
      data-testid="hero-section"
    >
      {/* Floating code snippets background */}
      <div className="absolute inset-0 pointer-events-none">
        {codeSnippets.map((snippet, index) => (
          <div
            key={snippet}
            className={`absolute text-xs sm:text-sm font-mono text-muted-foreground/20 transition-all duration-1000 ${
              index === currentSnippet ? "opacity-100" : "opacity-20"
            }`}
            style={{
              left: `${10 + index * 15}%`,
              top: `${20 + index * 12}%`,
              animationDelay: `${index * 0.5}s`,
            }}
          >
            <span className="animate-float">{snippet}</span>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "animate-slide-up" : "opacity-0"
          }`}
        >
          <Badge
            variant="secondary"
            className="mb-6 animate-scale-in"
            data-testid="badge-developer"
          >
            Software Developer
          </Badge>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-chart-2 bg-clip-text text-transparent animate-gradient-x">
            Crafting Digital
            <br />
            Experiences
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            I'm a passionate frontend developer with{" "}
            <strong>3 years of experience</strong> building modern web
            applications using React, Next.js, Node.js, and cutting-edge
            technologies.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              size="lg"
              onClick={scrollToAbout}
              className="group"
              data-testid="button-view-work"
            >
              View My Work
              <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </Button>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="hover:scale-110 transition-transform"
                onClick={() =>
                  console.log("GitHub profile link placeholder - add real URL")
                }
                data-testid="button-github"
              >
                <Github className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hover:scale-110 transition-transform"
                onClick={() =>
                  console.log(
                    "LinkedIn profile link placeholder - add real URL"
                  )
                }
                data-testid="button-linkedin"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hover:scale-110 transition-transform"
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                data-testid="button-email"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto">
            {["React", "TypeScript", "Node.js", "Next.js"].map(
              (tech, index) => (
                <div
                  key={tech}
                  className="p-3 rounded-lg bg-card border border-card-border text-sm font-medium hover-elevate transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  data-testid={`tech-${tech.toLowerCase()}`}
                >
                  {tech}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
}
