import { ExternalLink, Award, BadgeCheck, Shield } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "@/components/StarBackground";
import { Footer } from "../components/Footer";

// ─── Certificate Data ──────────────────────────────────────────────────────────
// Add more certificates here as objects in this array
const certificates = [
   {
    id: 1,
    title: "Professional Touch Typing Certificate",
    issuer: "Touch Typing Online",
    issuerUrl: "https://www.touchtyping.online",
    date: "2026",
    credentialUrl: "https://www.touchtyping.online/certificate/a2751686-7625-44a2-bd09-5866ad20d41a",
    // Replace with your actual hosted certificate image URL
    image: "/touchtyping-certificate-touchtpingonline.png",
      description:
      "Demonstrated touch typing proficiency with a certified words-per-minute score, achieving accurate and efficient typing without looking at the keyboard.",
    skills: ["Touch Typing", "WPM Speed", "Accuracy", "Keyboard Proficiency"],
  },
];

// ─── Single Certificate Card ───────────────────────────────────────────────────
const CertificateCard = ({ cert }) => {
  return (
    <article
      className="gradient-border card-hover group relative overflow-hidden rounded-2xl bg-card"
      aria-label={`Certificate: ${cert.title}`}
    >
      {/* Glowing top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="p-0 md:flex">
        {/* ── Certificate Image ── */}
        <div className="md:w-96 lg:w-[420px] flex-shrink-0 relative overflow-hidden">
          <div className="h-72 md:h-full min-h-[18rem] bg-primary/5 flex items-center justify-center relative">
            {/* Subtle grid pattern behind image */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            {/* Glow blob behind image */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-40 rounded-full bg-primary/20 blur-3xl" />
            </div>
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View credential for ${cert.title}`}
              className="relative z-10 block p-4 transition-transform duration-300 group-hover:scale-[1.03]"
            >
              <img
                src={cert.image}
                alt={`${cert.title} certificate badge issued by ${cert.issuer}`}
                className="w-full max-w-[340px] h-auto object-contain drop-shadow-[0_4px_24px_rgba(139,92,246,0.5)] mx-auto rounded-lg"
                loading="lazy"
              />
              {/* "Click to view" hint */}
              <span className="mt-3 flex items-center justify-center gap-1.5 text-xs text-primary/60 group-hover:text-primary transition-colors duration-300">
                <ExternalLink className="h-3 w-3" /> Click to verify
              </span>
            </a>
          </div>
        </div>

        {/* ── Certificate Details ── */}
        <div className="flex flex-col justify-between p-6 md:p-8 flex-1">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0 mt-1">
                <BadgeCheck className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors duration-300">
                  {cert.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Issued by{" "}
                  <a
                    href={cert.issuerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                    aria-label={`Visit ${cert.issuer} website`}
                  >
                    {cert.issuer}
                  </a>{" "}
                  &middot; {cert.date}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed">
              {cert.description}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {cert.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs rounded-full border border-primary/30 text-primary bg-primary/5 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cosmic-button flex items-center justify-center gap-2"
              aria-label={`Verify ${cert.title} credential`}
            >
              <Shield className="h-4 w-4" />
              Verify Credential
            </a>
            <a
              href={cert.issuerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center gap-2 text-sm font-medium"
              aria-label={`Learn more about ${cert.issuer}`}
            >
              <ExternalLink className="h-4 w-4" />
              View Issuer
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export const CertificationPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* SEO – update via react-helmet or your meta solution */}
      {/* <Helmet>
        <title>Certifications | Your Name – Front-End Developer</title>
        <meta name="description" content="Professional certifications earned by [Your Name] in web development, React, and UI/UX design." />
        <link rel="canonical" href="https://yourwebsite.com/certification" />
      </Helmet> */}

      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Background */}
      <StarBackground className="absolute inset-0 -z-10" />

      {/* Navbar */}
      <Navbar />

      {/* ── Main ── */}
      <main className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">

          {/* Page Header */}
          <header className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-4">
              <Award className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              My <span className="text-primary">Certifications</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Professional credentials that validate my expertise across web development,
              design, and engineering disciplines.
            </p>

            {/* Decorative divider */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
          </header>

          {/* Certificate List */}
          <section aria-label="Certificates list" className="space-y-8">
            {certificates.map((cert) => (
              <CertificateCard key={cert.id} cert={cert} />
            ))}
          </section>

          {/* Empty state – shown when no certs */}
          {certificates.length === 0 && (
            <div className="text-center text-muted-foreground py-20">
              No certifications listed yet. Check back soon!
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground text-sm mb-4">
              Want to work together or verify my credentials?
            </p>
            <a href="/#contact" className="cosmic-button inline-block">
              Get In Touch
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CertificationPage;