# AI Spend Auditor - Component Architecture

## Overview

This document outlines the component structure for the AI Spend Auditor landing page. All components follow modern SaaS design patterns with clean, minimal styling using Tailwind CSS.

## Component Structure

### Layout Components

#### `Navigation` (`components/Navigation.tsx`)
- **Purpose**: Sticky header navigation with responsive mobile menu
- **Features**:
  - Logo with gradient icon
  - Desktop navigation links
  - Mobile hamburger menu
  - CTA button ("Run Audit")
  - Smooth transitions and hover states
- **State**: Uses `useState` for mobile menu toggle
- **Responsive**: Hides desktop nav on mobile, shows hamburger menu

#### `Footer` (`components/Footer.tsx`)
- **Purpose**: Site footer with links and company info
- **Features**:
  - Brand section with logo
  - 4-column link structure (Product, Company, Legal)
  - Social media links
  - Copyright information
  - Dark theme (slate-900 background)

### Hero Section

#### `Hero` (`components/Hero.tsx`)
- **Purpose**: Main landing page hero with headline and CTA
- **Features**:
  - Large, bold headline: "Cut Unnecessary AI Spend in Minutes"
  - Subheadline with value proposition
  - Two CTA buttons (primary + secondary)
  - Trust indicators showing supported tools
  - Dashboard preview card (desktop only)
  - Subtle background gradients
  - Responsive grid layout (1 col mobile, 2 col desktop)

### Information Sections

#### `SupportedTools` (`components/SupportedTools.tsx`)
- **Purpose**: Display supported AI tools in a grid
- **Features**:
  - 6-tool grid with emoji icons
  - Color-coded backgrounds per tool
  - Hover effects
  - Responsive grid (2 cols mobile, 3 cols tablet, 6 cols desktop)
  - Info text about adding new tools

#### `HowItWorks` (`components/HowItWorks.tsx`)
- **Purpose**: 3-step process explanation
- **Features**:
  - Step cards with numbers and icons
  - Connector lines between steps (desktop only)
  - Hover shadow effects
  - Responsive layout (1 col mobile, 3 cols desktop)
  - Clear, concise descriptions

#### `SocialProof` (`components/SocialProof.tsx`)
- **Purpose**: Build trust with stats and testimonials
- **Features**:
  - 3 key statistics (startups audited, avg savings, total savings)
  - 3 testimonial cards with:
    - 5-star ratings
    - Customer quotes
    - Author name and role
    - Savings amount
  - Responsive grid layout
  - Hover effects on cards

#### `FAQ` (`components/FAQ.tsx`)
- **Purpose**: Answer common questions
- **Features**:
  - 5 accordion-style FAQ items
  - Expandable/collapsible answers
  - Smooth animations
  - Contact CTA at bottom
  - State management for open/closed items
- **State**: Uses `useState` for accordion open state

### Form Section

#### `AuditForm` (`components/AuditForm.tsx`)
- **Purpose**: Main audit form for user input
- **Features**:
  - AI tools multi-select with visual feedback
  - Monthly spend input with $ prefix
  - Number of seats input
  - Team size dropdown
  - Primary use case dropdown
  - Plan selection (radio buttons)
  - Submit button
  - Privacy notice
  - Responsive form layout
- **State**: Uses `useState` for selected tools
- **Client Component**: Marked with `"use client"` for interactivity

### Call-to-Action

#### `CTA` (`components/CTA.tsx`)
- **Purpose**: Final conversion CTA section
- **Features**:
  - Blue gradient background
  - Compelling headline
  - Subheadline
  - White CTA button
  - Centered layout

## Design System

### Colors
- **Primary**: Blue-600 (#2563eb)
- **Neutrals**: Slate palette (50-900)
- **Accents**: Green, Purple, Orange for tool icons
- **Background**: White (light mode)

### Typography
- **Font Family**: Geist Sans (via Google Fonts)
- **Headings**: Bold, large sizes (5xl-7xl for hero)
- **Body**: Regular weight, slate-600 for secondary text
- **Buttons**: Semibold, consistent sizing

### Spacing
- **Sections**: 20-32 units padding (py-20 to py-32)
- **Container**: Max-width 6xl (1152px)
- **Gaps**: 6-8 units between elements
- **Padding**: 4-8 units inside cards

### Shadows
- **Subtle**: shadow-sm (default)
- **Hover**: shadow-md to shadow-lg
- **Cards**: shadow-xl for emphasis

### Responsive Breakpoints
- **Mobile**: Default (< 640px)
- **Tablet**: sm: (640px+)
- **Desktop**: md: (768px+), lg: (1024px+)

## Component Usage

### In `app/page.tsx`
```tsx
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import SupportedTools from "@/components/SupportedTools";
import HowItWorks from "@/components/HowItWorks";
import AuditForm from "@/components/AuditForm";
import SocialProof from "@/components/SocialProof";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <SupportedTools />
      <HowItWorks />
      <AuditForm />
      <SocialProof />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
```

## Accessibility Features

- Semantic HTML (nav, section, footer, button, form)
- Proper heading hierarchy (h1, h2, h3)
- Form labels associated with inputs
- Focus states on interactive elements
- Color contrast meets WCAG standards
- Responsive text sizing

## Future Enhancements

- Add dark mode support
- Integrate with backend API
- Add form validation
- Implement analytics tracking
- Add animations/transitions
- Create reusable UI component library
- Add loading states
- Implement error handling

## File Structure
```
components/
├── Navigation.tsx
├── Hero.tsx
├── SupportedTools.tsx
├── HowItWorks.tsx
├── AuditForm.tsx
├── SocialProof.tsx
├── FAQ.tsx
├── CTA.tsx
└── Footer.tsx

app/
├── page.tsx (main landing page)
├── layout.tsx
└── globals.css
```
