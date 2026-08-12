// client/src/components/sections/Skills.jsx
import { useState, useMemo, useEffect } from "react";
import { createElement } from "react";
import { useLocation, Link } from "react-router-dom";
import Container from "@/components/ui/Container";
import Image from "@/components/ui/Image";
import { usePortfolio } from "@/context/PortfolioContext";
import { getSkillIcon } from "@/utils/skillIcons";
import SkillCardSkeleton from "@/components/skeletons/SkillCardSkeleton";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import skillsBg from "@/assets/images/Skills_Background.jpg";
import {
  FaArrowRight,
  FaCode,
  FaServer,
  FaPaintBrush,
  FaLayerGroup,
  FaDatabase,
  FaShieldAlt,
  FaTerminal,
  FaTools,
  FaCodeBranch,
} from "react-icons/fa";

const BADGE_STYLES = [
  "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 ring-emerald-500/30",
  "bg-slate-200 text-slate-700 dark:bg-slate-200/10 dark:text-slate-100 ring-slate-300/20",
  "bg-red-500/15 text-red-600 dark:text-red-400 ring-red-500/30",
  "bg-orange-500/15 text-orange-600 dark:text-orange-400 ring-orange-500/30",
  "bg-pink-500/15 text-pink-600 dark:text-pink-400 ring-pink-500/30",
  "bg-amber-500/15 text-amber-600 dark:text-amber-400 ring-amber-500/30",
  "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 ring-cyan-500/30",
  "bg-purple-500/15 text-purple-600 dark:text-purple-400 ring-purple-500/30",
  "bg-green-500/15 text-green-600 dark:text-green-400 ring-green-500/30",
  "bg-lime-500/15 text-lime-600 dark:text-lime-400 ring-lime-500/30",
  "bg-gray-400/15 text-gray-600 dark:text-gray-300 ring-gray-400/30",
  "bg-teal-500/15 text-teal-600 dark:text-teal-400 ring-teal-500/30",
];

function badgeStyle(index) {
  return BADGE_STYLES[index % BADGE_STYLES.length];
}

function barColor(proficiency = 0) {
  if (proficiency >= 75) return "from-cyan-500 to-emerald-500";
  if (proficiency >= 45) return "from-amber-500 to-orange-500";
  return "from-rose-500 to-red-500";
}

function Skills() {
  const { skills, loading, error, retry } = usePortfolio();
  const location = useLocation();
  const isAllSkillsPage = location.pathname === "/skills";

  const [activeSkill, setActiveSkill] = useState(null);

  useEffect(() => {
    if (!activeSkill) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setActiveSkill(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeSkill]);

  const groups = useMemo(() => {
    const categorized = {};
    (skills || []).forEach((skill) => {
      const cat = skill.category || "Other";
      if (!categorized[cat]) categorized[cat] = [];
      categorized[cat].push(skill);
    });

    const categoryConfig = {
      Frontend: { icon: FaCode, accent: "text-primary" },
      Backend: { icon: FaServer, accent: "text-secondary" },
      Database: { icon: FaDatabase, accent: "text-primary" },
      DevOps: { icon: FaTerminal, accent: "text-secondary" },
      Design: { icon: FaPaintBrush, accent: "text-primary" },
      Tools: { icon: FaTools, accent: "text-secondary" },
      CyberSecurity: { icon: FaShieldAlt, accent: "text-primary" },
      "Programming Languages": { icon: FaCodeBranch, accent: "text-secondary" },
      Other: { icon: FaLayerGroup, accent: "text-secondary" },
    };

    return Object.entries(categorized)
      .map(([label, items]) => ({
        key: label,
        label,
        icon: categoryConfig[label]?.icon || FaLayerGroup,
        accent: categoryConfig[label]?.accent || "text-primary",
        items: items.sort((a, b) => {
          if (a.order !== b.order) return (a.order || 0) - (b.order || 0);
          return (b.proficiency || 0) - (a.proficiency || 0);
        }),
      }))
      .sort((a, b) => b.items.length - a.items.length);
  }, [skills]);

  const PREVIEW_COUNT = 3;
  let runningIndex = 0;

  return (
    <section className="relative overflow-hidden bg-background py-28 text-foreground md:py-36">
      {/* ambient accents — same treatment as About */}
      <div className="pointer-events-none absolute left-[-200px] top-20 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[170px]" />
      <div className="pointer-events-none absolute bottom-0 right-[-150px] h-[500px] w-[500px] rounded-full bg-secondary/20 blur-[180px]" />

      <Container className="relative">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-start">
          {/* Left column — heading */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:-mt-3 space-y-6">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-primary/60" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Skills
              </span>
            </div>

            <h2 className="text-4xl font-black leading-[1.15] tracking-tight sm:text-5xl">
              Technologies{" "}
              <span className="relative inline-block text-primary">
                I Use
                <div className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-gradient-to-r from-primary/60 to-secondary/60" />
              </span>
            </h2>

            <p className="text-lg leading-8 text-muted max-w-md">
              My primary tech stack for building modern web applications.
            </p>

            {/* Image — same treatment as About section */}
            <div className="relative mt-8">
              {/* offset blue glow behind the card */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-72 w-72 rounded-full bg-gradient-to-br from-primary/30 to-secondary/25 blur-3xl" />

              {/* corner accents: top-right + bottom-left only */}
              <div className="absolute -top-[3px] -right-[3px] h-[55%] w-[55%] rounded-tr-[30px] border-r-[3px] border-t-[3px] border-primary" />
              <div className="absolute -bottom-[3px] -left-[3px] h-[55%] w-[55%] rounded-bl-[30px] border-b-[3px] border-l-[3px] border-primary" />

              {/* glassmorphism card */}
              <div className="relative rounded-[30px] border border-white/60 bg-white/30 p-2 shadow-2xl shadow-black/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
                <div className="relative overflow-hidden rounded-[24px]">
                  <Image
                    src={skillsBg}
                    alt="Skills Visual representation"
                    className="w-full h-auto object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/5 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>

          {/* Right column — category grid */}
          <div className="lg:col-span-8">
            {loading ? (
              <SkillCardSkeleton
                count={12}
                cols="sm:grid-cols-2 lg:grid-cols-3"
              />
            ) : error ? (
              <ErrorState message={error} onRetry={retry} />
            ) : !skills?.length ? (
              <EmptyState
                title="No skills yet"
                description="Add skills from the admin panel and they'll appear here automatically."
              />
            ) : (
              <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
                {groups
                  .filter((group) => group.items.length > 0)
                  .slice(0, isAllSkillsPage ? undefined : 4)
                  .map((group) => {
                    const GroupIcon = group.icon;
                    const visible = isAllSkillsPage
                      ? group.items
                      : group.items.slice(0, PREVIEW_COUNT);

                    return (
                      <div key={group.key} className="space-y-4">
                        <div className="flex items-center gap-3">
                          <GroupIcon className={group.accent} size={14} />
                          <h4 className="text-sm font-bold uppercase tracking-widest text-muted">
                            {group.label}
                          </h4>
                          <div className="h-px flex-1 bg-border" />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          {visible.map((skill) => {
                            const cardIndex = runningIndex++;
                            return (
                              <SkillCard
                                key={skill._id}
                                skill={skill}
                                index={cardIndex}
                                onDetails={setActiveSkill}
                              />
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        {!isAllSkillsPage && !loading && skills?.length > 0 && (
          <div className="mt-16 flex justify-end">
            <Link
              to="/skills"
              className="group flex items-center gap-3 rounded-full border border-foreground/15 bg-surface px-8 py-4 font-semibold text-foreground shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white hover:shadow-xl hover:shadow-primary/30"
            >
              Show All Skills
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </Container>

      {/* Details modal */}
      {activeSkill && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeSkill.name} proficiency details`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setActiveSkill(null)}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.key === "Escape" && setActiveSkill(null)}
            tabIndex={-1}
          >
            <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />

            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface text-primary">
                {activeSkill.icon ? (
                  <img
                    src={activeSkill.icon}
                    alt={activeSkill.name}
                    className="h-9 w-9 object-contain"
                  />
                ) : (
                  createElement(getSkillIcon(activeSkill.name), { size: 34 })
                )}
              </div>
              <div>
                <h3 className="text-2xl font-black">{activeSkill.name}</h3>
                <span className="text-xs text-primary font-medium uppercase tracking-wider">
                  {activeSkill.category || "General"}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted">
                <span>Proficiency</span>
                <span className="text-primary">{activeSkill.proficiency}%</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${barColor(activeSkill.proficiency)}`}
                  style={{ width: `${activeSkill.proficiency}%` }}
                />
              </div>
            </div>

            <button
              className="mt-8 w-full rounded-xl border border-border bg-surface py-3 text-sm font-semibold transition hover:bg-primary hover:text-white"
              onClick={() => setActiveSkill(null)}
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function SkillCard({ skill, index, onDetails }) {
  const proficiency = skill.proficiency || 0;
  const icon = skill.icon ? (
    <Image
      src={skill.icon}
      alt={skill.name}
      className="h-7 w-7 object-contain"
    />
  ) : (
    createElement(getSkillIcon(skill.name), { size: 24 })
  );

  return (
    <div className="group relative flex h-[230px] flex-col items-center rounded-2xl border border-foreground/10 bg-card p-4 text-center shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
      {/* hover glow */}
      <div className="pointer-events-none absolute -top-10 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/25 to-secondary/25 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

      {/* bottom accent bar grows on hover */}
      <div className="absolute inset-x-4 bottom-0 h-0.5 w-0 bg-gradient-to-r from-primary to-secondary transition-all duration-500 group-hover:w-[calc(100%-2rem)]" />

      {/* Icon badge */}
      <div
        className={`relative mt-3 flex h-14 w-14 items-center justify-center rounded-full ring-1 shadow-inner transition-all duration-300 group-hover:scale-110 group-hover:ring-primary/40 ${badgeStyle(index)}`}
      >
        {icon}
      </div>

      {/* Name */}
      <h5 className="relative mt-4 w-full truncate text-sm font-bold leading-tight">
        {skill.name}
      </h5>

      {/* Spacer pushes proficiency + CTA to bottom */}
      <div className="flex-1" />

      {/* Proficiency */}
      <div className="relative mt-4 w-full space-y-1.5">
        <div className="flex items-center justify-between text-[10px] font-semibold">
          <span className="text-muted">Proficiency</span>
          <span className="text-primary">{proficiency}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${barColor(proficiency)}`}
            style={{ width: `${proficiency}%` }}
          />
        </div>
      </div>

      {/* View Details */}
      <button
        onClick={() => onDetails(skill)}
        className="relative mt-4 rounded-full border border-border bg-surface px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
      >
        View Details
      </button>
    </div>
  );
}

export default Skills;
