/**
 * Future CMS integration types.
 * Not implemented yet — defines the contract for admin auth, media, and settings.
 */

export interface CMSUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "editor" | "viewer";
}

export interface CMSAuthSession {
  user: CMSUser;
  expiresAt: string;
}

export interface MediaLibraryItem {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  alt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CMSSettings {
  siteName: string;
  maintenanceMode: boolean;
  defaultLocale: string;
  analyticsId?: string;
}

export interface CMSCapabilities {
  inlineTextEditing: boolean;
  imageReplacement: boolean;
  newsManagement: boolean;
  settingsManagement: boolean;
  adminAuthentication: boolean;
  homepageContentManagement: boolean;
  mediaLibrary: boolean;
}

/** Placeholder — swap implementation when CMS is added */
export const CMS_CAPABILITIES: CMSCapabilities = {
  inlineTextEditing: false,
  imageReplacement: false,
  newsManagement: false,
  settingsManagement: false,
  adminAuthentication: false,
  homepageContentManagement: false,
  mediaLibrary: false,
};
