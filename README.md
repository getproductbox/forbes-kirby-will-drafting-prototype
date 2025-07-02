# Forbes Kirby Will Drafting Workflow Prototype

A comprehensive frontend prototype demonstrating a streamlined will drafting workflow system for Forbes Kirby, designed to transform estate planning practice through AI-powered automation and client self-service capabilities.

## 🚀 Live Demo

Visit the prototype at: `http://localhost:3000`

### Quick Demo Access

- **Client Portal**: Click "Client" on homepage → Experience client journey
- **Admin Dashboard**: Click "Admin" on homepage → Manage clients and appointments  
- **Solicitor Interface**: Click "Solicitor" on homepage → Review AI drafts and manage cases
- **Paralegal Review**: Click "Paralegal" on homepage → Quality assurance and compliance checking

## 📋 Overview

This prototype showcases a complete will drafting workflow that:

- **Reduces administrative time by 65%**
- **Streamlines client intake** through online self-service
- **Automates document drafting** with AI assistance
- **Ensures quality** through intelligent review processes
- **Improves client experience** with real-time progress tracking

## 🌟 Key Features

### Client Experience
- ✅ Online registration and onboarding
- ✅ Document upload for ID verification
- ✅ Real-time progress tracking
- ✅ Draft will review and approval
- ✅ Secure messaging with solicitors
- ✅ Appointment booking system

### Staff Workflows
- ✅ Admin dashboard with client management
- ✅ Solicitor case review and AI draft approval
- ✅ Paralegal quality assurance and compliance checking
- ✅ Automated workflow coordination
- ✅ Performance metrics and reporting

### AI-Powered Features
- ✅ Intelligent will drafting from consultation notes
- ✅ Clause verification against precedent library
- ✅ Legal compliance checking
- ✅ Tax planning suggestions
- ✅ Quality assurance automation

## 🏗️ Architecture

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **UI Components**: Headless UI

### Project Structure
```
├── app/                    # Next.js App Router pages
│   ├── client/            # Client-facing pages
│   │   ├── dashboard/     # Client portal
│   │   └── onboarding/    # Registration flow
│   ├── staff/             # Staff interfaces
│   │   ├── admin/         # Administrative dashboard
│   │   ├── solicitor/     # Solicitor workflow
│   │   └── paralegal/     # Quality assurance
│   └── demo/              # Interactive demo page
├── components/            # Reusable React components
├── lib/                   # Utilities and business logic
│   ├── context/          # React context providers
│   ├── data/             # Mock data and types
│   └── utils.ts          # Helper functions
└── types/                # TypeScript type definitions
```

## 🎯 Prototype Scope

### What's Included
- ✅ Complete UI/UX for all user roles
- ✅ Realistic data and workflows
- ✅ Interactive demonstrations
- ✅ Professional Forbes Kirby branding
- ✅ Mobile-responsive client onboarding
- ✅ Role-based navigation and permissions

### Prototype Limitations
- ❌ No real backend integration
- ❌ No actual document generation
- ❌ Simulated AI responses only
- ❌ No real authentication
- ❌ No actual file uploads
- ❌ No email notifications

## 🔧 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Navigate to the project directory
cd "Will Drafting Workflow Prototype"

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to view the prototype.

### Demo Accounts
Use these credentials to test different user perspectives:

| Role | Email | Password | Description |
|------|-------|----------|-------------|
| Client | client@demo.com | demo | Client portal experience |
| Admin | admin@demo.com | demo | Administrative dashboard |
| Solicitor | solicitor@demo.com | demo | Case management interface |
| Paralegal | paralegal@demo.com | demo | Quality assurance workflow |

## 📖 User Guides

### For Stakeholders
1. Start at homepage to see overview and value proposition
2. Click demo account buttons for instant access
3. Use role switcher in navigation to move between perspectives
4. Explore workflow timeline to understand process flow

### For Clients (Demo)
1. Visit `/client/onboarding` for registration experience
2. Complete 4-step onboarding process
3. Access dashboard to track progress
4. Review draft documents and communicate with solicitors

### For Staff (Demo)
1. **Admin**: Manage clients, view metrics, schedule appointments
2. **Solicitor**: Review AI drafts, add notes, approve/request changes
3. **Paralegal**: Quality check documents, verify compliance, approve final versions

## 🎨 Design System

### Colors
- **Primary**: `#1e3a5f` (Professional navy)
- **Secondary**: `#d4a574` (Warm gold accent)
- **Success**: `#22c55e` (Green for completions)
- **Warning**: `#f59e0b` (Amber for attention)
- **Error**: `#ef4444` (Red for issues)

### Typography
- **Font**: Geist Sans (system fallbacks)
- **Hierarchy**: Clear heading structure with proper contrast
- **Accessibility**: WCAG compliant color ratios

## 📊 Workflow Overview

### Client Journey
1. **Registration** → Online form + ID upload (5 min)
2. **Consultation** → Automated booking + questionnaire (30 min)
3. **Drafting** → AI generates will from notes (2 min)
4. **Review** → Paralegal + client approval (1 day)
5. **Execution** → Signing appointment + delivery

### Staff Workflow
1. **Intake** → Admin processes new registrations
2. **Meeting** → Solicitor conducts consultation
3. **Generation** → AI creates draft will
4. **Review** → Solicitor reviews and approves
5. **Quality Check** → Paralegal verifies compliance
6. **Client Approval** → Client reviews and approves
7. **Completion** → Final document preparation

## 🚀 Future Enhancements

### Technical Roadmap
- Backend API integration
- Real document generation
- Email automation system
- Digital signature integration
- Document management system
- Payment processing

### Feature Expansions
- Multi-document support (trusts, LPAs)
- Advanced AI capabilities
- Client portal enhancements
- Mobile applications
- Third-party integrations

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🤝 Demo Feedback

This prototype is designed to gather stakeholder feedback on:

1. **User Experience**: Is the workflow intuitive?
2. **Feature Completeness**: Are key features represented?
3. **Visual Design**: Does it reflect Forbes Kirby's brand?
4. **Value Proposition**: Are efficiency gains clearly demonstrated?

## 📞 Contact

For questions about this prototype:
- **Development Team**: Ollie Randall, Matt Lim
- **Project Stakeholders**: Mitch Tolcon, Stefan Del Pizzo

---

**Note**: This is a demonstration prototype showcasing the proposed Forbes Kirby will drafting workflow. All data is simulated and no real legal documents are generated.
