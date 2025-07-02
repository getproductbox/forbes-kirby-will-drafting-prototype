'use client'

import { useState } from 'react'
import { mockWillDraft } from '@/lib/data/mockData'
import { 
  FileText, 
  Download, 
  Edit, 
  Eye, 
  EyeOff,
  Printer,
  Share,
  CheckCircle,
  AlertCircle,
  Maximize2,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface WillDocumentPreviewProps {
  willDraft?: typeof mockWillDraft
  showActions?: boolean
  isFullscreen?: boolean
  onClose?: () => void
  clientName?: string
}

export default function WillDocumentPreview({ 
  willDraft = mockWillDraft, 
  showActions = true,
  isFullscreen = false,
  onClose,
  clientName
}: WillDocumentPreviewProps) {
  const [showRedactions, setShowRedactions] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const documentSections = [
    { id: 'header', title: 'Document Header', required: true },
    { id: 'testator', title: 'Testator Declaration', required: true },
    { id: 'revocation', title: 'Revocation Clause', required: true },
    { id: 'executors', title: 'Appointment of Executors', required: true },
    { id: 'guardians', title: 'Appointment of Guardians', required: willDraft.content.guardians && willDraft.content.guardians.length > 0 },
    { id: 'specific-gifts', title: 'Specific Gifts', required: willDraft.content.specificGifts.length > 0 },
    { id: 'residuary', title: 'Residuary Estate', required: true },
    { id: 'powers', title: 'Powers of Executors', required: true },
    { id: 'special', title: 'Special Instructions', required: !!willDraft.content.specialInstructions },
    { id: 'execution', title: 'Execution Clause', required: true },
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const redactText = (text: string) => {
    if (!showRedactions) return text
    return text.replace(/\b\w+\b/g, '█████')
  }

  return (
    <div className={cn(
      'bg-white rounded-lg shadow-sm',
      isFullscreen ? 'fixed inset-0 z-50 overflow-auto' : 'border border-gray-200'
    )}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Last Will and Testament
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {clientName || willDraft.content.testator.fullName} • Version {willDraft.version} • 
              <span className="ml-1">
                Generated {formatDate(willDraft.createdDate)}
              </span>
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            {showActions && (
              <>
                <button
                  onClick={() => setShowRedactions(!showRedactions)}
                  className={cn(
                    'p-2 rounded-lg transition-colors',
                    showRedactions 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                  title={showRedactions ? 'Show content' : 'Hide sensitive data'}
                >
                  {showRedactions ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                
                <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                  <Printer className="w-4 h-4" />
                </button>
                
                <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                  <Share className="w-4 h-4" />
                </button>
                
                <button className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                  <Download className="w-4 h-4" />
                </button>
                
                <button className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
                  <Edit className="w-4 h-4" />
                </button>
              </>
            )}
            
            {isFullscreen && onClose && (
              <button
                onClick={onClose}
                className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={cn(
        'flex',
        isFullscreen ? 'h-full' : 'h-96'
      )}>
        {/* Section Navigation */}
        <div className="w-64 border-r border-gray-200 bg-gray-50 overflow-y-auto">
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-3">Document Sections</h3>
            <div className="space-y-1">
              {documentSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between',
                    activeSection === section.id 
                      ? 'bg-primary text-white' 
                      : 'text-gray-700 hover:bg-gray-100',
                    !section.required && 'opacity-75'
                  )}
                >
                  <span>{section.title}</span>
                  {section.required && (
                    <CheckCircle className="w-3 h-3 text-green-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Document Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-4xl mx-auto">
            <div className="space-y-8 font-serif leading-relaxed">
              
              {/* Document Header */}
              <div className="text-center border-b border-gray-300 pb-6">
                <h1 className="text-2xl font-bold mb-4">LAST WILL AND TESTAMENT</h1>
                <p className="text-lg">of</p>
                <p className="text-xl font-semibold mt-2">
                  {redactText(willDraft.content.testator.fullName.toUpperCase())}
                </p>
              </div>

              {/* Testator Declaration */}
              <section id="testator-section">
                <h2 className="text-lg font-bold mb-4">1. TESTATOR DECLARATION</h2>
                <p className="mb-4">
                  I, <strong>{redactText(willDraft.content.testator.fullName)}</strong>, 
                  of {redactText(willDraft.content.testator.address)}, 
                  born on {formatDate(willDraft.content.testator.dateOfBirth)}, 
                  being of sound mind and disposing memory, do hereby make, publish and declare 
                  this to be my Last Will and Testament, hereby revoking all former wills and 
                  testamentary dispositions by me at any time heretofore made.
                </p>
              </section>

              {/* Revocation Clause */}
              <section id="revocation-section">
                <h2 className="text-lg font-bold mb-4">2. REVOCATION</h2>
                <p className="mb-4">
                  I hereby revoke all wills and testamentary dispositions of every nature 
                  whatsoever by me heretofore made and declare this to be my last Will and Testament.
                </p>
              </section>

              {/* Executors */}
              <section id="executors-section">
                <h2 className="text-lg font-bold mb-4">3. APPOINTMENT OF EXECUTORS</h2>
                <p className="mb-4">
                  I APPOINT as the Executors of this my Will:
                </p>
                {willDraft.content.executors.map((executor, index) => (
                  <div key={executor.id} className="mb-3 ml-6">
                    <p>
                      <strong>
                        {executor.isAlternate ? 'ALTERNATE EXECUTOR: ' : `EXECUTOR ${index + 1}: `}
                      </strong>
                      {redactText(executor.fullName)} of {redactText(executor.address)} 
                      ({executor.relationship})
                    </p>
                  </div>
                ))}
                <p className="mt-4">
                  I DIRECT that no Executor appointed by this Will shall be required to give 
                  security for the due administration of my estate.
                </p>
              </section>

              {/* Guardians (if applicable) */}
              {willDraft.content.guardians && willDraft.content.guardians.length > 0 && (
                <section id="guardians-section">
                  <h2 className="text-lg font-bold mb-4">4. APPOINTMENT OF GUARDIANS</h2>
                  <p className="mb-4">
                    In the event that I shall die leaving surviving me any child or children 
                    under the age of eighteen years, I APPOINT as guardian of such child or children:
                  </p>
                  {willDraft.content.guardians.map((guardian, index) => (
                    <div key={guardian.id} className="mb-3 ml-6">
                      <p>
                        <strong>GUARDIAN {index + 1}: </strong>
                        {redactText(guardian.fullName)} of {redactText(guardian.address)} 
                        ({guardian.relationship})
                      </p>
                    </div>
                  ))}
                </section>
              )}

              {/* Specific Gifts */}
              {willDraft.content.specificGifts.length > 0 && (
                <section id="specific-gifts-section">
                  <h2 className="text-lg font-bold mb-4">
                    {willDraft.content.guardians && willDraft.content.guardians.length > 0 ? '5' : '4'}. 
                    SPECIFIC GIFTS
                  </h2>
                  <p className="mb-4">I GIVE, DEVISE AND BEQUEATH the following specific gifts:</p>
                  {willDraft.content.specificGifts.map((gift, index) => (
                    <div key={gift.id} className="mb-3">
                      <p>
                        <strong>{String.fromCharCode(97 + index)}) </strong>
                        {gift.description} to {gift.beneficiary}
                      </p>
                    </div>
                  ))}
                </section>
              )}

              {/* Residuary Estate */}
              <section id="residuary-section">
                <h2 className="text-lg font-bold mb-4">
                  {(() => {
                    let sectionNum = 4
                    if (willDraft.content.guardians && willDraft.content.guardians.length > 0) sectionNum++
                    if (willDraft.content.specificGifts.length > 0) sectionNum++
                    return sectionNum
                  })()} . RESIDUARY ESTATE
                </h2>
                <p className="mb-4">
                  I GIVE, DEVISE AND BEQUEATH all the rest, residue and remainder of my estate, 
                  both real and personal, of whatsoever nature and wheresoever situate, 
                  which I may own or be entitled to at the time of my death:
                </p>
                
                {willDraft.content.beneficiaries.map((beneficiary, index) => (
                  <div key={beneficiary.id} className="mb-3 ml-6">
                    <p>
                      <strong>{beneficiary.share}: </strong>
                      To {redactText(beneficiary.fullName)} ({beneficiary.relationship})
                      {beneficiary.conditions && (
                        <span className="block mt-1 text-sm italic">
                          Conditions: {beneficiary.conditions}
                        </span>
                      )}
                    </p>
                  </div>
                ))}
              </section>

              {/* Powers of Executors */}
              <section id="powers-section">
                <h2 className="text-lg font-bold mb-4">
                  {(() => {
                    let sectionNum = 5
                    if (willDraft.content.guardians && willDraft.content.guardians.length > 0) sectionNum++
                    if (willDraft.content.specificGifts.length > 0) sectionNum++
                    return sectionNum
                  })()} . POWERS OF EXECUTORS
                </h2>
                <p className="mb-4">
                  I GIVE to my Executors the fullest power of sale, conversion, and management 
                  with respect to my estate, including but not limited to:
                </p>
                <ul className="list-disc ml-8 space-y-1">
                  <li>The power to sell, mortgage, lease, or otherwise dispose of any real or personal property</li>
                  <li>The power to invest and reinvest the proceeds of my estate</li>
                  <li>The power to carry on any business forming part of my estate</li>
                  <li>The power to employ professional advisers and pay reasonable remuneration</li>
                  <li>The power to distribute assets in specie or in cash</li>
                </ul>
              </section>

              {/* Special Instructions */}
              {willDraft.content.specialInstructions && (
                <section id="special-section">
                  <h2 className="text-lg font-bold mb-4">
                    {(() => {
                      let sectionNum = 6
                      if (willDraft.content.guardians && willDraft.content.guardians.length > 0) sectionNum++
                      if (willDraft.content.specificGifts.length > 0) sectionNum++
                      return sectionNum
                    })()} . SPECIAL INSTRUCTIONS
                  </h2>
                  <p className="mb-4">{willDraft.content.specialInstructions}</p>
                </section>
              )}

              {/* Execution Clause */}
              <section id="execution-section">
                <h2 className="text-lg font-bold mb-4">
                  {(() => {
                    let sectionNum = 6
                    if (willDraft.content.guardians && willDraft.content.guardians.length > 0) sectionNum++
                    if (willDraft.content.specificGifts.length > 0) sectionNum++
                    if (willDraft.content.specialInstructions) sectionNum++
                    return sectionNum
                  })()} . EXECUTION
                </h2>
                <p className="mb-8">
                  IN WITNESS WHEREOF I have hereunto set my hand to this my Last Will and Testament, 
                  consisting of this and the preceding pages, each of which I have signed for 
                  identification, this _____ day of _____________, 2025.
                </p>
                
                <div className="grid grid-cols-2 gap-8 mt-12">
                  <div className="text-center">
                    <div className="border-b border-gray-400 mb-2 h-8"></div>
                    <p className="text-sm">
                      {redactText(willDraft.content.testator.fullName)}
                      <br />
                      TESTATOR
                    </p>
                  </div>
                  <div></div>
                </div>

                <div className="mt-12">
                  <p className="font-bold mb-4">
                    SIGNED, PUBLISHED AND DECLARED by the above-named Testator as and for 
                    their last Will and Testament in the presence of us both present at the 
                    same time, who at their request, in their presence, and in the presence 
                    of each other, have subscribed our names as witnesses.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-8 mt-8">
                    <div className="text-center">
                      <div className="border-b border-gray-400 mb-2 h-8"></div>
                      <p className="text-sm">
                        WITNESS 1
                        <br />
                        Name: _______________________
                        <br />
                        Address: ____________________
                        <br />
                        Occupation: _________________
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="border-b border-gray-400 mb-2 h-8"></div>
                      <p className="text-sm">
                        WITNESS 2
                        <br />
                        Name: _______________________
                        <br />
                        Address: ____________________
                        <br />
                        Occupation: _________________
                      </p>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}