export type UserRole = 'client' | 'admin' | 'solicitor' | 'paralegal'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

export interface Client {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  status: 'new' | 'onboarding' | 'meeting_scheduled' | 'drafting' | 'review' | 'completed'
  registeredDate: string
  lastActivity: string
  progress: number
  assignedTo?: string
  nextAppointment?: string
}

export interface Appointment {
  id: string
  clientId: string
  date: string
  time: string
  type: 'initial_consultation' | 'review' | 'signing'
  status: 'scheduled' | 'completed' | 'cancelled'
  solicitorId: string
  notes?: string
}

export interface Document {
  id: string
  clientId: string
  type: 'id_verification' | 'draft_will' | 'final_will' | 'supporting_docs'
  name: string
  uploadedDate: string
  status: 'pending' | 'verified' | 'approved' | 'rejected'
  url?: string
}

export interface WillDraft {
  id: string
  clientId: string
  version: number
  createdDate: string
  lastModified: string
  status: 'ai_generated' | 'solicitor_reviewed' | 'paralegal_reviewed' | 'client_approved' | 'final'
  content: {
    testator: {
      fullName: string
      address: string
      dateOfBirth: string
    }
    executors: Executor[]
    beneficiaries: Beneficiary[]
    specificGifts: SpecificGift[]
    residuary: string
    guardians?: Guardian[]
    specialInstructions?: string
  }
  aiSuggestions?: AISuggestion[]
  reviewNotes?: ReviewNote[]
}

export interface Executor {
  id: string
  fullName: string
  address: string
  relationship: string
  isAlternate: boolean
}

export interface Beneficiary {
  id: string
  fullName: string
  relationship: string
  share: string
  conditions?: string
}

export interface SpecificGift {
  id: string
  description: string
  beneficiary: string
}

export interface Guardian {
  id: string
  fullName: string
  address: string
  relationship: string
}

export interface AISuggestion {
  id: string
  type: 'clause' | 'structure' | 'tax' | 'legal'
  title: string
  description: string
  severity: 'info' | 'warning' | 'important'
  accepted?: boolean
}

export interface ReviewNote {
  id: string
  authorId: string
  authorName: string
  authorRole: UserRole
  timestamp: string
  content: string
  resolved: boolean
}

export interface CaseTimeline {
  id: string
  clientId: string
  events: TimelineEvent[]
}

export interface TimelineEvent {
  id: string
  timestamp: string
  type: 'registration' | 'document_upload' | 'appointment' | 'draft_created' | 'review' | 'approval' | 'completion'
  title: string
  description: string
  completed: boolean
}