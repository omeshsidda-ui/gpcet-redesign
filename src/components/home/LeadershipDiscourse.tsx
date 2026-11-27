import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import EditorialReveal from '@/components/ui/EditorialReveal';

interface LeaderStatement {
  name: string;
  role: string;
  credentials: string;
  portraitSrc: string;
  quote: string;
  profileHref: string;
}

const LEADERSHIP_PROFILES: LeaderStatement[] = [
  {
    name: 'Sri G. Pullaiah',
    role: 'Founder, Secretary & Correspondent',
    credentials: 'AP State Best Teacher Awardee · Sri Sai Krishna Educational Society & GPCET',
    portraitSrc: '/assets/leadership/chairman.jpg',
    quote:
      'Founded on the enduring motto "Join to Learn and Leave to Serve," GPCET unites traditional academic discipline, punctuality, and moral character with modern engineering education for the youth of Rayalaseema.',
    profileHref: '/administration',
  },
  {
    name: 'Sri G. Vamsidhar',
    role: 'Vice-Chairman',
    credentials: 'Governing Body Leadership · Infrastructure & Industry Partnerships',
    portraitSrc: '/assets/leadership/Sri.-G-Vamsidhar-Vice-Chairman.jpg',
    quote:
      'Our commitment is uncompromising institutional quality—building state-of-the-art computing clusters, AICTE IDEA Lab prototyping facilities, and direct industry collaborations that prepare engineers for global careers.',
    profileHref: '/administration',
  },
  {
    name: 'Dr. C. Srinivasa Rao',
    role: 'Principal',
    credentials: 'M.E., Ph.D. · Member Secretary, Governing Body & Chief Mentor, IDEA Lab',
    portraitSrc: '/assets/leadership/principal.jpg',
    quote:
      'Advancement in technology and human resource development plays a vital role in a nation’s sustainable growth. Since inception, GPCET has concentrated on providing industry-ready engineers supported by qualified faculty and an engaging campus ambience.',
    profileHref: '/administration',
  },
  {
    name: 'Dr. M. Srilakshmi',
    role: 'Professor & Dean, CSE',
    credentials: 'Ph.D. · Academic Council Member & Head of Computer Science & Engineering',
    portraitSrc: '/assets/leadership/srilakshmi.jpg',
    quote:
      'Autonomous curriculum governance enables us to revise syllabi continuously through our Board of Studies, pairing rigorous computer science fundamentals with experiential laboratory research and outcome-based learning.',
    profileHref: '/departments/cse',
  },
];

export default function LeadershipDiscourse() {
  return (
    <section
      aria-labelledby="leadership-discourse-heading"
      className="bg-[var(--surface)] border-b border-[var(--rule)] py-16 sm:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <EditorialReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-8 border-b border-[var(--rule)] items-end">
            <div className="lg:col-span-5">
              <h2
                id="leadership-discourse-heading"
                className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[var(--ink)]"
              >
                Leadership &amp; Institutional Vision
              </h2>
            </div>
            <div className="lg:col-span-7 flex flex-wrap items-center justify-between gap-4">
              <p className="text-[15px] text-[var(--muted)] leading-relaxed max-w-[60ch]">
                Stewardship from the Sri Sai Krishna Educational Society Governing Body and Academic Council.
              </p>
              <Link
                href="/administration"
                className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--ruby)] hover:text-[var(--brand-crimson)] underline underline-offset-4 decoration-[var(--ruby)]/30 hover:decoration-[var(--brand-crimson)] transition-colors active:scale-[0.985]"
              >
                <span>Governing Body &amp; Administration</span>
                <ArrowRight
                  className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </EditorialReveal>

        {/* 2x2 Architectural Grid separated by hairlines */}
        <div className="mt-10 grid lg:grid-cols-2 gap-x-14 gap-y-2">
          {LEADERSHIP_PROFILES.map((leader, idx) => (
            <EditorialReveal key={leader.name} delayMs={idx * 70} className="h-full">
              <article className="group/card h-full py-8 flex flex-col justify-between gap-6 border-t-2 border-[var(--ruby)]">
                <blockquote className="font-serif italic text-[1.25rem] sm:text-[1.45rem] font-normal leading-[1.48] text-[var(--ink)]">
                  &ldquo;{leader.quote}&rdquo;
                </blockquote>

                <div className="flex items-center justify-between gap-4 pt-5 border-t border-[var(--rule)]">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-20 border border-[var(--ink)]/20 p-0.5 bg-[var(--surface-raised)] rounded-sm shrink-0 transition-colors duration-200 group-hover/card:border-[var(--ruby)]/45">
                      <div className="w-full h-full overflow-hidden">
                        <img
                          src={leader.portraitSrc}
                          alt={`${leader.name}, ${leader.role}`}
                          width={64}
                          height={80}
                          className="w-full h-full object-cover object-top transition-transform duration-300 ease-out group-hover/card:scale-[1.03]"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-serif text-lg font-medium text-[var(--ink)] leading-snug">
                        {leader.name}
                      </div>
                      <div className="text-[13px] font-semibold text-[var(--ruby)] mt-0.5">
                        {leader.role}
                      </div>
                      <div className="text-[13px] text-[var(--muted)] mt-0.5 leading-snug">
                        {leader.credentials}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={leader.profileHref}
                    aria-label={`View ${leader.name} institutional section`}
                    className="group inline-flex items-center justify-center p-2.5 rounded-sm border border-[var(--rule)] bg-[var(--surface-raised)] text-[var(--ruby)] hover:border-[var(--ruby)] hover:bg-[var(--bg)] transition-all duration-150 active:scale-[0.985] shrink-0"
                  >
                    <ArrowRight
                      className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </article>
            </EditorialReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
