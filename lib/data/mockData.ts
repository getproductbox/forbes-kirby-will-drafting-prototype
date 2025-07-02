import { User, Client, Appointment, Document, WillDraft, CaseTimeline, TimelineEvent } from '@/types'

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Sarah Thompson',
    email: 'sarah.thompson@example.com',
    role: 'client',
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    id: 'user-2',
    name: 'Michael Chen',
    email: 'michael.chen@forbeskirby.com',
    role: 'solicitor',
    avatar: 'https://i.pravatar.cc/150?u=michael'
  },
  {
    id: 'user-3',
    name: 'Emma Wilson',
    email: 'emma.wilson@forbeskirby.com',
    role: 'paralegal',
    avatar: 'https://i.pravatar.cc/150?u=emma'
  },
  {
    id: 'user-4',
    name: 'James Mitchell',
    email: 'james.mitchell@forbeskirby.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?u=james'
  }
]

export const mockClients: Client[] = [
  {
    id: 'client-1',
    firstName: 'Sarah',
    lastName: 'Thompson',
    email: 'sarah.thompson@example.com',
    phone: '07123 456789',
    status: 'review',
    registeredDate: '2024-12-15',
    lastActivity: '2024-12-28',
    progress: 75,
    assignedTo: 'Michael Chen',
    nextAppointment: '2025-01-05'
  },
  {
    id: 'client-2',
    firstName: 'Robert',
    lastName: 'Johnson',
    email: 'robert.johnson@example.com',
    phone: '07234 567890',
    status: 'drafting',
    registeredDate: '2024-12-20',
    lastActivity: '2024-12-27',
    progress: 50,
    assignedTo: 'Michael Chen'
  },
  {
    id: 'client-3',
    firstName: 'Jennifer',
    lastName: 'Williams',
    email: 'jennifer.williams@example.com',
    phone: '07345 678901',
    status: 'onboarding',
    registeredDate: '2024-12-25',
    lastActivity: '2024-12-26',
    progress: 25,
    assignedTo: 'Michael Chen',
    nextAppointment: '2025-01-03'
  },
  {
    id: 'client-4',
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@example.com',
    phone: '07456 789012',
    status: 'completed',
    registeredDate: '2024-11-01',
    lastActivity: '2024-12-10',
    progress: 100,
    assignedTo: 'Michael Chen'
  },
  {
    id: 'client-5',
    firstName: 'Lisa',
    lastName: 'Davis',
    email: 'lisa.davis@example.com',
    phone: '07567 890123',
    status: 'new',
    registeredDate: '2024-12-28',
    lastActivity: '2024-12-28',
    progress: 10
  }
]

export const mockAppointments: Appointment[] = [
  {
    id: 'appt-1',
    clientId: 'client-1',
    date: '2025-01-05',
    time: '10:00',
    type: 'review',
    status: 'scheduled',
    solicitorId: 'user-2',
    notes: 'Final review of will draft with client'
  },
  {
    id: 'appt-2',
    clientId: 'client-3',
    date: '2025-01-03',
    time: '14:00',
    type: 'initial_consultation',
    status: 'scheduled',
    solicitorId: 'user-2',
    notes: 'Initial consultation to discuss estate planning needs'
  }
]

export const mockDocuments: Document[] = [
  {
    id: 'doc-1',
    clientId: 'client-1',
    type: 'id_verification',
    name: 'Passport_SThompson.pdf',
    uploadedDate: '2024-12-15',
    status: 'verified'
  },
  {
    id: 'doc-2',
    clientId: 'client-1',
    type: 'draft_will',
    name: 'Will_Draft_v2_SThompson.pdf',
    uploadedDate: '2024-12-26',
    status: 'approved'
  },
  {
    id: 'doc-3',
    clientId: 'client-2',
    type: 'id_verification',
    name: 'DrivingLicense_RJohnson.pdf',
    uploadedDate: '2024-12-20',
    status: 'verified'
  },
  {
    id: 'doc-4',
    clientId: 'client-2',
    type: 'draft_will',
    name: 'Will_Draft_v1_RJohnson.pdf',
    uploadedDate: '2024-12-27',
    status: 'pending'
  }
]

export const mockWillDraft: WillDraft = {
  id: 'will-1',
  clientId: 'client-1',
  version: 2,
  createdDate: '2024-12-20',
  lastModified: '2024-12-26',
  status: 'paralegal_reviewed',
  content: {
    testator: {
      fullName: 'Sarah Louise Thompson',
      address: '45 Oxford Street, London, W1D 2DZ',
      dateOfBirth: '1975-03-15'
    },
    executors: [
      {
        id: 'exec-1',
        fullName: 'James Thompson',
        address: '12 High Street, Cambridge, CB2 1NF',
        relationship: 'Brother',
        isAlternate: false
      },
      {
        id: 'exec-2',
        fullName: 'Margaret Thompson',
        address: '78 Queen Street, Edinburgh, EH2 1JL',
        relationship: 'Sister',
        isAlternate: true
      }
    ],
    beneficiaries: [
      {
        id: 'ben-1',
        fullName: 'Emily Thompson',
        relationship: 'Daughter',
        share: '40%',
        conditions: 'To receive upon reaching age 25'
      },
      {
        id: 'ben-2',
        fullName: 'Oliver Thompson',
        relationship: 'Son',
        share: '40%',
        conditions: 'To receive upon reaching age 25'
      },
      {
        id: 'ben-3',
        fullName: 'Cancer Research UK',
        relationship: 'Charity',
        share: '20%'
      }
    ],
    specificGifts: [
      {
        id: 'gift-1',
        description: 'My collection of first edition books',
        beneficiary: 'James Thompson (Brother)'
      },
      {
        id: 'gift-2',
        description: 'My grandmother\'s diamond ring',
        beneficiary: 'Emily Thompson (Daughter)'
      }
    ],
    residuary: 'The remainder of my estate to be divided equally between my children',
    guardians: [
      {
        id: 'guardian-1',
        fullName: 'James Thompson',
        address: '12 High Street, Cambridge, CB2 1NF',
        relationship: 'Brother'
      }
    ],
    specialInstructions: 'I wish to be cremated and my ashes scattered at sea near Brighton where I spent my childhood summers.'
  },
  aiSuggestions: [
    {
      id: 'ai-1',
      type: 'tax',
      title: 'Inheritance Tax Consideration',
      description: 'The estate value may exceed the nil-rate band. Consider tax planning strategies such as charitable donations or trusts.',
      severity: 'important',
      accepted: false
    },
    {
      id: 'ai-2',
      type: 'clause',
      title: 'Digital Assets Clause',
      description: 'Consider adding provisions for digital assets including online accounts, cryptocurrency, and digital media.',
      severity: 'info',
      accepted: true
    },
    {
      id: 'ai-3',
      type: 'structure',
      title: 'Trust for Minor Beneficiaries',
      description: 'Given the age conditions for your children, a formal trust structure might provide better protection and tax efficiency.',
      severity: 'warning',
      accepted: false
    }
  ],
  reviewNotes: [
    {
      id: 'note-1',
      authorId: 'user-2',
      authorName: 'Michael Chen',
      authorRole: 'solicitor',
      timestamp: '2024-12-22T14:30:00',
      content: 'Client confirmed all executor details are correct. Discussed inheritance tax implications.',
      resolved: true
    },
    {
      id: 'note-2',
      authorId: 'user-3',
      authorName: 'Emma Wilson',
      authorRole: 'paralegal',
      timestamp: '2024-12-26T10:15:00',
      content: 'All clauses verified against precedent library. Digital assets clause added as per AI suggestion.',
      resolved: true
    }
  ]
}

export const mockTimeline: CaseTimeline = {
  id: 'timeline-1',
  clientId: 'client-1',
  events: [
    {
      id: 'event-1',
      timestamp: '2024-12-15T09:00:00',
      type: 'registration',
      title: 'Client Registration',
      description: 'Sarah Thompson registered through online portal',
      completed: true
    },
    {
      id: 'event-2',
      timestamp: '2024-12-15T09:30:00',
      type: 'document_upload',
      title: 'ID Verification',
      description: 'Passport uploaded for identity verification',
      completed: true
    },
    {
      id: 'event-3',
      timestamp: '2024-12-18T14:00:00',
      type: 'appointment',
      title: 'Initial Consultation',
      description: 'Meeting with Michael Chen to discuss estate planning needs',
      completed: true
    },
    {
      id: 'event-4',
      timestamp: '2024-12-20T11:00:00',
      type: 'draft_created',
      title: 'Will Draft Generated',
      description: 'AI-powered draft created based on consultation notes',
      completed: true
    },
    {
      id: 'event-5',
      timestamp: '2024-12-22T14:30:00',
      type: 'review',
      title: 'Solicitor Review',
      description: 'Michael Chen reviewed and annotated the draft',
      completed: true
    },
    {
      id: 'event-6',
      timestamp: '2024-12-26T10:15:00',
      type: 'review',
      title: 'Paralegal Review',
      description: 'Emma Wilson completed quality checks',
      completed: true
    },
    {
      id: 'event-7',
      timestamp: '2025-01-05T10:00:00',
      type: 'appointment',
      title: 'Final Review Meeting',
      description: 'Scheduled meeting for client approval',
      completed: false
    },
    {
      id: 'event-8',
      timestamp: '2025-01-08T00:00:00',
      type: 'completion',
      title: 'Will Execution',
      description: 'Formal signing and witnessing ceremony',
      completed: false
    }
  ]
}

export const mockDemoAccounts = [
  {
    email: 'client@demo.com',
    password: 'demo',
    role: 'client',
    name: 'Sarah Thompson'
  },
  {
    email: 'admin@demo.com',
    password: 'demo',
    role: 'admin',
    name: 'James Mitchell'
  },
  {
    email: 'solicitor@demo.com',
    password: 'demo',
    role: 'solicitor',
    name: 'Michael Chen'
  },
  {
    email: 'paralegal@demo.com',
    password: 'demo',
    role: 'paralegal',
    name: 'Emma Wilson'
  }
]

export const mockStats = {
  totalClients: 127,
  activeClients: 23,
  completedThisMonth: 18,
  averageCompletionTime: '7 days',
  clientSatisfaction: 4.8,
  timeSaved: '65%',
  documentsProcessed: 342,
  upcomingAppointments: 12
}