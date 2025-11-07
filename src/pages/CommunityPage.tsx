import { useState } from 'react'
import { useNavigate, useParams, Routes, Route, Navigate } from 'react-router-dom'
import { CommunityGalleryPage, ProjectDetailPage, UserProfilePage, AdminModerationPanel } from '@ascii-motion/premium'

/**
 * Community page route component
 * Wraps CommunityGalleryPage with navigation handlers
 * Supports nested routes for individual projects and user profiles
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
        
        {/* Admin moderation panel */}
        <Route path="admin/moderation" element={<AdminModerationPanel />} />
        
        {/* Individual project detail view */}
        <Route path="project/:projectId" element={<ProjectDetailPage />} />
        
        {/* User profile view */}
        <Route 
          path="u/:username" 
          element={
            <UserProfilePageWrapper onClose={() => navigate('/community')} />
          } 
        />
        
        {/* Catch-all: redirect invalid community routes back to gallery */}
        <Route path="*" element={<Navigate to="/community" replace />} />
      </Routes>
      
      {/* TODO: Add PublishToGalleryDialog here if needed */}
      {showPublishDialog && (
        <div>Publish dialog placeholder</div>
      )}
    </>
  )
}

/**
 * Wrapper component to extract username from route params
 */
function UserProfilePageWrapper({ onClose }: { onClose: () => void }) {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  
  if (!username) {
    return null;
  }
  
  const handleNavigateToProfile = (newUsername: string) => {
    navigate(`/community/u/${newUsername}`);
  };
  
  return (
    <UserProfilePage 
      username={username} 
      onClose={onClose}
      onNavigateToProfile={handleNavigateToProfile}
    />
  );
}
