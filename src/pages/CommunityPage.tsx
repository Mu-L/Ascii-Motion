import { useState } from 'react'
import { useNavigate, Routes, Route } from 'react-router-dom'
import { CommunityGalleryPage, ProjectDetailPage } from '@ascii-motion/premium'

/**
 * Community page route component
 * Wraps CommunityGalleryPage with navigation handlers
 * Supports nested routes for individual projects
 */
export function CommunityPage() {
  const navigate = useNavigate()
  const [showPublishDialog, setShowPublishDialog] = useState(false)

  return (
    <>
      <Routes>
        {/* Main gallery view */}
        <Route index element={
          <CommunityGalleryPage
            onClose={() => navigate('/')}
            onPublish={() => {
              navigate('/')
              // Small delay to ensure navigation completes before opening dialog
              setTimeout(() => setShowPublishDialog(true), 100)
            }}
          />
        } />
        
        {/* Individual project detail view */}
        <Route path="project/:projectId" element={<ProjectDetailPage />} />
      </Routes>
      
      {/* TODO: Add PublishToGalleryDialog here if needed */}
      {showPublishDialog && (
        <div>Publish dialog placeholder</div>
      )}
    </>
  )
}
