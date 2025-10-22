// ============================================================================
// CLIPBOARD UTILITIES - Safe copy with fallback
// ============================================================================

import { toast } from 'sonner';

/**
 * Safely copy text to clipboard with fallback for when Clipboard API is blocked
 * @param text - Text to copy
 * @param successMessage - Optional success message for toast
 * @returns Promise<boolean> - True if successful
 */
export async function copyToClipboard(
  text: string, 
  successMessage?: string
): Promise<boolean> {
  try {
    // Try modern Clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      if (successMessage) {
        toast.success(successMessage);
      }
      return true;
    }
    
    // Fallback to legacy method
    return legacyCopyToClipboard(text, successMessage);
  } catch (error) {
    console.warn('Clipboard API failed, trying fallback...', error);
    return legacyCopyToClipboard(text, successMessage);
  }
}

/**
 * Legacy fallback method using temporary textarea
 * Works even when Clipboard API is blocked
 */
function legacyCopyToClipboard(text: string, successMessage?: string): boolean {
  try {
    // Create temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = text;
    
    // Make it invisible but accessible
    textarea.style.position = 'fixed';
    textarea.style.left = '-999999px';
    textarea.style.top = '-999999px';
    textarea.setAttribute('readonly', '');
    
    document.body.appendChild(textarea);
    
    // Select and copy
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    
    const successful = document.execCommand('copy');
    
    // Clean up
    document.body.removeChild(textarea);
    
    if (successful) {
      if (successMessage) {
        toast.success(successMessage);
      }
      return true;
    } else {
      throw new Error('Copy command failed');
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    toast.error('No se pudo copiar al portapapeles');
    return false;
  }
}

/**
 * Copy with custom error message
 */
export function copyWithFeedback(
  text: string,
  options?: {
    success?: string;
    error?: string;
  }
): Promise<boolean> {
  return copyToClipboard(text, options?.success).catch(() => {
    if (options?.error) {
      toast.error(options.error);
    }
    return false;
  });
}
