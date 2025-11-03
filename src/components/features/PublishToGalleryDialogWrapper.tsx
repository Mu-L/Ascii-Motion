/**
 * Wrapper component for PublishToGalleryDialog
 * Provides session data from CanvasContext to the dialog
 */

import { PublishToGalleryDialog } from '@ascii-motion/premium';
import { useExportDataCollector } from '../../utils/exportDataCollector';
import { useProjectMetadataStore } from '../../stores/projectMetadataStore';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { SessionData } from '@ascii-motion/premium';
import type { ExportDataBundle } from '../../types/export';

interface PublishToGalleryDialogWrapperProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onPublishSuccess?: (projectId: string) => void;
}

/**
 * Convert ExportDataBundle to SessionData format
 */
function convertToSessionData(data: ExportDataBundle): SessionData {
  return {
    version: '1.0.0',
    name: data.name,
    description: data.description,
    metadata: {
      exportedAt: new Date().toISOString(),
      exportVersion: '1.0.0',
    },
    canvas: {
      width: data.canvasDimensions.width,
      height: data.canvasDimensions.height,
      canvasBackgroundColor: data.canvasBackgroundColor,
      showGrid: data.showGrid,
    },
    animation: {
      frames: data.frames.map((frame) => ({
        id: frame.id,
        name: frame.name,
        duration: frame.duration,
        data: Object.fromEntries(frame.data.entries()),
      })),
      currentFrameIndex: data.currentFrameIndex,
      frameRate: data.frameRate,
      looping: data.looping,
    },
    tools: {
      activeTool: data.toolState.activeTool,
      selectedCharacter: data.toolState.selectedCharacter,
      selectedColor: data.toolState.selectedColor,
      selectedBgColor: data.toolState.selectedBgColor,
      paintBucketContiguous: data.toolState.paintBucketContiguous,
      rectangleFilled: data.toolState.rectangleFilled,
    },
    ui: {
      theme: data.uiState.theme,
      zoom: data.uiState.zoom,
      panOffset: data.uiState.panOffset,
      fontMetrics: data.fontMetrics,
    },
    typography: {
      fontSize: data.typography.fontSize,
      characterSpacing: data.typography.characterSpacing,
      lineSpacing: data.typography.lineSpacing,
      selectedFontId: data.typography.selectedFontId,
    },
    palettes: data.paletteState,
    characterPalettes: data.characterPaletteState,
  };
}

export function PublishToGalleryDialogWrapper({
  isOpen,
  onOpenChange,
  onPublishSuccess,
}: PublishToGalleryDialogWrapperProps) {
  const exportData = useExportDataCollector();
  const { currentProjectId } = useProjectMetadataStore();

  // Don't render dialog if not open
  if (!isOpen) {
    return null;
  }

  // Don't render if no export data
  if (!exportData) {
    console.warn('[PublishToGalleryDialogWrapper] No export data available');
    return null;
  }

  // Check if project is saved to cloud
  if (!currentProjectId) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Project First</DialogTitle>
          </DialogHeader>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You must save your project to the cloud before publishing it to the gallery.
              Please save your project first, then try publishing again.
            </AlertDescription>
          </Alert>
        </DialogContent>
      </Dialog>
    );
  }

  // Convert ExportDataBundle to SessionData
  const sessionData = convertToSessionData(exportData);

  return (
    <PublishToGalleryDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      sessionData={sessionData}
      projectId={currentProjectId}
      onPublishSuccess={onPublishSuccess}
    />
  );
}
