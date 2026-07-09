/**
 * Shared CMS contracts for the future dashboard and edit mode.
 * The public website remains static for now; these types describe the backend surface.
 */

export type CMSRole = "admin" | "editor";
export type CMSLocale = "en" | "ar";
export type CMSContentStatus = "draft" | "published" | "archived";
export type CMSContentType =
  | "site"
  | "navigation"
  | "footer"
  | "page"
  | "product"
  | "news"
  | "certificate"
  | "shared";
export type CMSMediaType = "image" | "document" | "video" | "other";

export interface CMSLocalizedValue<T> {
  en: T;
  ar: T;
}

export interface CMSUser {
  id: string;
  email: string;
  name: string;
  role: CMSRole;
  mustChangePassword?: boolean;
}

export interface CMSAuthSession {
  user: CMSUser;
  expiresAt: string;
}

export interface CMSContentVersion {
  id: string;
  versionNumber: number;
  payload: unknown;
  changeSummary?: string;
  isPublished: boolean;
  createdAt: string;
  publishedAt?: string;
  createdBy?: CMSUser;
}

export interface CMSContentRecord {
  id: string;
  key: string;
  type: CMSContentType;
  status: CMSContentStatus;
  slug?: string;
  latestVersionNumber: number;
  createdAt: string;
  updatedAt: string;
  currentVersion?: CMSContentVersion;
}

export interface MediaLibraryItem {
  id: string;
  key: string;
  type: CMSMediaType;
  latestVersionNumber: number;
  currentVersion?: CMSMediaVersion;
  createdAt: string;
  updatedAt: string;
}

export interface CMSMediaVersion {
  id: string;
  versionNumber: number;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  alt?: CMSLocalizedValue<string>;
  createdAt: string;
  createdBy?: CMSUser;
}

export interface CMSSettings {
  siteName: string;
  maintenanceMode: boolean;
  defaultLocale: CMSLocale;
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
  imageReplacement: true,
  newsManagement: true,
  settingsManagement: false,
  adminAuthentication: true,
  homepageContentManagement: true,
  mediaLibrary: true,
};
