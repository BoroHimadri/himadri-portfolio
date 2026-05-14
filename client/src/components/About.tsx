import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Code, Coffee } from "lucide-react";
import profileImage from "@assets/generated_images/portfolio_img.jpg";

const timelineEvents = [
  {
    id: "timeline:2023-2024",
    year: "2023-2024",
    title: "Experience",
    description:
      "Working on complex web applications,designed & developed IOT sensor monitoring dashboard panels and mentoring newcomers at agrisage (formerly NavPrayukti Pvt. Ltd.)",
    icon: MapPin,
  },
  {
    id: "timeline:2024-2025",
    year: "2024-present",
    title: "Experience",
    description:
      " Developed a smart mushroom cultivation dashboard that integrates real-time sensor monitoring and daily actionable guides—empowering growers to optimize button mushroom production with turnkey growhouse solutions ,Developed End-to-end Farmer Producer Company suite of admin, regional, CEO, FIG, and farmer apps that digitizes farmer data, assets, and field records in one connected system in Aiflux Innovations Pvt. Ltd.",
    icon: Coffee,
  },
];

export function About() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0"
            );
            setVisibleItems((prev) => Array.from(new Set([...prev, index])));
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
    <section
      id="about"
      className="py-24 bg-muted/20"
      data-testid="about-section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My journey from curious beginner to confident full stack developer
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Profile Card */}
          <Card className="p-8 text-center lg:text-left hover-elevate">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20">
                <img
                  src={profileImage}
                  alt="Developer Profile"
                  className="w-full h-full object-cover"
                  data-testid="img-profile"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Himadri Boro</h3>
                <p className="text-muted-foreground mb-4">Software Developer</p>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4">
                  <Badge variant="secondary" data-testid="badge-location">
                    <MapPin className="w-3 h-3 mr-1" />
                    Hybrid
                  </Badge>
                  <Badge variant="secondary" data-testid="badge-experience">
                    <Calendar className="w-3 h-3 mr-1" />3 Years Experience
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Passionate about creating user-friendly applications and
                  solving complex problems through clean, efficient code. Always
                  eager to learn new technologies and best practices.
                </p>
              </div>
            </div>
          </Card>

          {/* Timeline */}
          <div className="space-y-8">
            <h3 className="text-xl font-semibold mb-6">My Journey</h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>

              {timelineEvents.map((event, index) => (
                <div
                  key={event.id}
                  ref={(el) => (refs.current[index] = el)}
                  data-index={index}
                  className={`relative flex items-start gap-4 pb-8 transition-all duration-700 ${
                    visibleItems.includes(index)
                      ? "animate-slide-up"
                      : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                  data-testid={`timeline-${event.year}`}
                >
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center relative z-10">
                    <event.icon className="w-5 h-5 text-primary-foreground" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {event.year}
                      </Badge>
                    </div>
                    <h4 className="font-semibold mb-2">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16">
          {[
            { label: "Years Experience", value: "3" },
            { label: "Projects Built", value: "8+" },
            { label: "Technologies", value: "8+" },
            { label: "Coffee Cups", value: "∞" },
          ].map((stat, index) => (
            <Card key={stat.label} className="p-6 text-center hover-elevate">
              <div
                className="text-2xl font-bold text-primary mb-1"
                data-testid={`stat-value-${index}`}
              >
                {stat.value}
              </div>
              <div
                className="text-sm text-muted-foreground"
                data-testid={`stat-label-${index}`}
              >
                {stat.label}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
