import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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
    credentials: 'AP State Best Teacher Awardee · Ravindra Vidya Niketan & GPCET',
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
      className="bg-[var(--surface)] border-b border-[var(--rule)] py-14 sm:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-8 border-b border-[var(--rule)] items-end">
          <div className="lg:col-span-5">
            <h2
              id="leadership-discourse-heading"
              className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[var(--ink)]"
            >
              Leadership &amp; Institutional Vision
            </h2>
          </div>
          <div className="lg:col-span-7 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-[var(--muted)] max-w-[60ch]">
              Stewardship from the Ravindra Educational Society Governing Body and Academic Council.
            </p>
            <Link
              href="/administration"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--primary-navy)] hover:text-[var(--brand-crimson)] transition-colors"
            >
              <span>Governing Body &amp; Administration</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* 2x2 Architectural Grid separated by hairlines */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--rule)] border border-[var(--rule)] rounded-md overflow-hidden">
          {LEADERSHIP_PROFILES.map((leader) => (
            <article
              key={leader.name}
              className="bg-[var(--surface-raised)] p-6 sm:p-8 flex flex-col justify-between gap-6"
            >
              <blockquote className="font-serif text-base sm:text-lg leading-relaxed text-[var(--ink)]">
                &ldquo;{leader.quote}&rdquo;
              </blockquote>

              <div className="flex items-center justify-between gap-4 pt-4 border-t border-[var(--rule)]">
                <div className="flex items-center gap-3.5">
                  <img
                    src={leader.portraitSrc}
                    alt={`${leader.name}, ${leader.role}`}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-full object-cover border border-[var(--rule)] shrink-0 bg-[var(--surface)]"
                    loading="lazy"
                  />
                  <div>
                    <div className="text-sm font-bold text-[var(--ink)]">{leader.name}</div>
                    <div className="text-xs font-semibold text-[var(--brand-crimson)]">
                      {leader.role}
                    </div>
                    <div className="text-[11px] text-[var(--muted)] mt-0.5">
                      {leader.credentials}
                    </div>
                  </div>
                </div>

                <Link
                  href={leader.profileHref}
                  aria-label={`View ${leader.name} institutional section`}
                  className="p-2 rounded border border-[var(--rule)] text-[var(--primary-navy)] hover:bg-[var(--surface)] transition-colors shrink-0"
                >
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
