import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Bus, HeartPulse, Dumbbell, Users } from 'lucide-react';
import { MarkdownRenderer } from '@/components/content/MarkdownRenderer';
import { getCleanedContent } from '@/lib/institutional-content';

export const metadata: Metadata = {
  title: 'Campus Life, Libraries & Facilities',
  description:
    'Central & Digital Library (36,808 volumes), Robotics & Cultural Clubs (Kalanjali), Gymnasium, 15-bus Kurnool Transport fleet, Medical Center, and Alumni Association.',
};

export default function CampusLifePage() {
  const libraryMd = getCleanedContent(['campus-life', 'library']);
  const digitalLibMd = getCleanedContent(['campus-life', 'digital-library']);
  const transportMd = getCleanedContent(['campus-life', 'transport']);
  const medicalMd = getCleanedContent(['campus-life', 'medical-center']);
  const gymMd = getCleanedContent(['campus-life', 'gym']);
  const kalanjaliMd = getCleanedContent(['campus-life', 'kalanjali']);
  const alumniMd = getCleanedContent(['campus-life', 'alumni-home']);

  return (
    <div className="bg-[var(--bg)] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Header */}
        <header className="section-masthead pb-6 border-b border-[var(--rule)] grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-7">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-medium tracking-tight text-[var(--ink)]">
              Campus Life, Libraries &amp; Student Infrastructure
            </h1>
            <p className="mt-2.5 text-sm sm:text-base text-[var(--muted)] max-w-[66ch]">
              A self-contained engineering campus on Nandikotkur Road, Kurnool featuring a
              two-floor Central Library, Digital E-Journal Center, fitness gymnasium, 15-bus
              transit network, on-campus medical care, and student technical clubs.
            </p>
          </div>
          <div className="lg:col-span-5 grid grid-cols-3 gap-4 pt-4 lg:pt-0 lg:border-l lg:border-[var(--rule)] lg:pl-6 font-sans tabular-nums">
            <div>
              <div className="font-serif text-2xl sm:text-[1.75rem] font-normal text-[var(--ink)] tabular-nums">36,808</div>
              <div className="text-xs text-[var(--muted)] mt-0.5">Library Books</div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-[1.75rem] font-normal text-[var(--ruby)] tabular-nums">3,118</div>
              <div className="text-xs text-[var(--muted)] mt-0.5">E-Journals</div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-[1.75rem] font-normal text-[var(--brand-crimson)] tabular-nums">15</div>
              <div className="text-xs text-[var(--muted)] mt-0.5">Campus Buses</div>
            </div>
          </div>
        </header>

        {/* Campus Visual Showcase */}
        <section className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-4">
          <figure className="grid grid-rows-[1fr_auto] bg-white border-b border-[var(--rule)] first:md:row-span-2">
            <div className="relative min-h-40 md:min-h-32 bg-[var(--surface)] overflow-hidden">
              <img
                src="/assets/campus/GPCET-building.jpg"
                alt="GPCET Academic Campus Building"
                width={640}
                height={400}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <figcaption className="px-4 py-3 text-xs font-medium text-[var(--ink)] border-t border-[var(--rule)]">
              GPCET Main Academic Block · Nandikotkur Road, Kurnool
            </figcaption>
          </figure>

          <figure className="grid grid-rows-[1fr_auto] bg-white border-b border-[var(--rule)] first:md:row-span-2">
            <div className="relative min-h-40 md:min-h-32 bg-[var(--surface)] overflow-hidden">
              <img
                src="/assets/campus/1-CENTRAL-LIBRARY.jpg"
                alt="GPCET Central Library"
                width={640}
                height={400}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <figcaption className="px-4 py-3 text-xs font-medium text-[var(--ink)] border-t border-[var(--rule)]">
              Central Library · 500-Seat Reading Hall &amp; Barcoded Stacks
            </figcaption>
          </figure>

          <figure className="grid grid-rows-[1fr_auto] bg-white border-b border-[var(--rule)] first:md:row-span-2">
            <div className="relative min-h-40 md:min-h-32 bg-[var(--surface)] overflow-hidden">
              <img
                src="/assets/campus/2-DIGITAL-LIBRARY.jpg"
                alt="GPCET Digital Library"
                width={640}
                height={400}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <figcaption className="px-4 py-3 text-xs font-medium text-[var(--ink)] border-t border-[var(--rule)]">
              Digital Library · IEEE IEL, J-Gate, DELNET &amp; NPTEL Access
            </figcaption>
          </figure>
        </section>

        {/* Central & Digital Library Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6 sm:p-8">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-[11px] font-sans font-semibold tracking-[0.06em] text-[var(--ruby)] mb-2">
              <BookOpen className="w-4 h-4 text-[var(--brand-crimson)]" aria-hidden="true" />
              <span>CENTRAL &amp; DIGITAL LIBRARY</span>
            </div>
            {libraryMd && <MarkdownRenderer content={libraryMd.content} />}
          </div>
          <div className="lg:col-span-5 lg:border-l lg:border-[var(--rule)] lg:pl-8 space-y-4">
            {digitalLibMd && <MarkdownRenderer content={digitalLibMd.content} />}
            <div className="pt-4 border-t border-[var(--rule)] flex flex-col gap-2 text-xs">
              <Link href="/campus-life/library-nptel" className="font-semibold text-[var(--ruby)] hover:text-[var(--brand-crimson)]">
                NPTEL Video Lecture Repository →
              </Link>
              <Link href="/campus-life/library-delnet" className="font-semibold text-[var(--ruby)] hover:text-[var(--brand-crimson)]">
                DELNET &amp; Inter-Library Loan →
              </Link>
              <Link href="/campus-life/library-timings" className="font-semibold text-[var(--ruby)] hover:text-[var(--brand-crimson)]">
                Library Timings &amp; Contact →
              </Link>
            </div>
          </div>
        </section>

        {/* Transport & Medical */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 text-[11px] font-sans font-semibold tracking-[0.06em] text-[var(--ruby)] mb-2">
              <Bus className="w-4 h-4 text-[var(--brand-crimson)]" aria-hidden="true" />
              <span>CAMPUS TRANSIT FLEET</span>
            </div>
            {transportMd && <MarkdownRenderer content={transportMd.content} />}
          </div>

          <div className="lg:col-span-5 bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 text-[11px] font-sans font-semibold tracking-[0.06em] text-[var(--ruby)] mb-2">
              <HeartPulse className="w-4 h-4 text-[var(--brand-crimson)]" aria-hidden="true" />
              <span>MEDICAL CENTER &amp; AMBULANCE</span>
            </div>
            {medicalMd && <MarkdownRenderer content={medicalMd.content} />}
          </div>
        </section>

        {/* Student Clubs, Gym & Alumni */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--rule)] border border-[var(--rule)] rounded-md overflow-hidden">
          <div className="bg-[var(--surface-raised)] p-6">
            <div className="inline-flex items-center gap-2 text-[11px] font-sans font-semibold tracking-[0.06em] text-[var(--ruby)] mb-2">
              <Dumbbell className="w-4 h-4 text-[var(--brand-crimson)]" aria-hidden="true" />
              <span>FITNESS &amp; SPORTS</span>
            </div>
            {gymMd && <MarkdownRenderer content={gymMd.content} />}
            <Link
              href="/campus-life/sports"
              className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[var(--ruby)]"
            >
              Sports Facilities <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="bg-[var(--surface-raised)] p-6">
            <div className="text-[11px] font-sans font-semibold tracking-[0.06em] text-[var(--ruby)] mb-2">
              STUDENT CLUBS &amp; KALANJALI
            </div>
            {kalanjaliMd && <MarkdownRenderer content={kalanjaliMd.content} />}
            <Link
              href="/campus-life/c-club"
              className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[var(--ruby)]"
            >
              Coding &amp; Technical Clubs <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="bg-[var(--surface-raised)] p-6">
            <div className="inline-flex items-center gap-2 text-[11px] font-sans font-semibold tracking-[0.06em] text-[var(--ruby)] mb-2">
              <Users className="w-4 h-4 text-[var(--ruby)]" aria-hidden="true" />
              <span>ALUMNI ASSOCIATION</span>
            </div>
            {alumniMd && <MarkdownRenderer content={alumniMd.content} />}
            <Link
              href="/campus-life/alumni-contribution"
              className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[var(--ruby)]"
            >
              Alumni Contributions <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
