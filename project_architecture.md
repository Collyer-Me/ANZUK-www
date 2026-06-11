# Project Architecture & Roadmap: Global Marketing Hub

## Overview
This document outlines the architectural strategy for our new global marketing platform. The goal is a high-performance, SEO-first, AI-optimized website serving multiple regions (US, UK, AU, NZ) with a centralized CMS source of truth.

## The Technology Stack
* **CMS (Source of Truth):** Strapi (Headless) - Self-hosted on Azure App Service (Containerized).
* **Frontend Framework:** Astro - Selected for zero-JS-by-default performance, superior SEO/GEO scores, and maintainability.
* **Static Hosting:** Azure Static Web Apps (SWA).
* **Edge & Security:** Cloudflare - Leveraging Cloudflare Workers for geo-routing and Cloudflare CDN/WAF for security and performance.

## Core Architectural Principles
1.  **"Suggest, Don't Force" Geo-Routing:** Use Cloudflare Workers to detect visitor location (`cf-ipcountry`). Instead of forced redirects, provide a seamless UX that suggests the correct regional site (e.g., `/au/`) while allowing users to override.
2.  **SEO-First URL Structure:** Subdirectory-based localization (e.g., `example.com/au/`, `example.com/uk/`) to consolidate Domain Authority.
3.  **AI-Optimized Content:** Strict adherence to semantic HTML (`<article>`, `<section>`, etc.) and automated JSON-LD schema injection for machine-readability.
4.  **Astro Islands:** Use React/Vue components only where interactivity is required; keep the core marketing pages as lean, static HTML.

## Implementation Roadmap

### Phase 1: Setup & Environment
* **Strapi:** Initialize Strapi instance on Azure. Define base `LocalizedPage` content types (Title, Meta, Canonical, Region).
* **Astro:** Initialize the Astro project. Configure for static output (`output: 'static'`).
* **Cursor Setup:** Create `.cursor/rules/` to enforce semantic HTML, JSON-LD consistency, and regional routing patterns.

### Phase 2: Frontend Foundation
* **Design System:** Build reusable marketing UI components (Hero, Feature Grid, CTA, Testimonial) in Astro using Tailwind CSS.
* **API Layer:** Develop a robust service layer in Astro to fetch content from Strapi based on `locale` tags.
* **Regional Layouts:** Implement the `en-US`, `en-GB`, `en-AU`, `en-NZ` routing structure.

### Phase 3: Edge & Deployment
* **Deployment Pipeline:** Configure GitHub Actions for seamless deployment of the Astro build to Azure Static Web Apps.
* **Cloudflare Integration:**
    * Setup DNS and SSL via Cloudflare.
    * Deploy Cloudflare Worker for geo-detection and region-switching banner logic.
    * Implement Hreflang and Canonical tag management.

### Phase 4: SEO & AI Optimization
* **Schema Markup:** Automate JSON-LD injection for business location, services, and FAQ content.
* **Performance Audits:** Verify Core Web Vitals targets using Lighthouse to ensure SEO ranking readiness.

## Getting Started with Cursor
To ensure the team maintains a high standard of quality, use the following approach in Cursor:
1.  **System Rules:** Keep a central `project-rules.md` file in the repository defining our coding standards.
2.  **Prompt-Driven Development:** When generating new pages, use specific prompts like: *"Build an Astro page for [Region], fetch [Component] from Strapi, ensure strict H-tag hierarchy, and include valid JSON-LD schema for [Topic]."*
3.  **Component Reusability:** Favor the creation of a component library to ensure the marketing team can assemble new campaign pages rapidly.
