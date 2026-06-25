/**
 * Product authoring guide
 *
 * Add a folder under `src/assets/products/<Product Name>/` containing:
 *
 * - content.txt       — structured copy (see format below)
 * - cover image         — e.g. 2-1.webp, 7.webp (auto-detected)
 * - specification image — optional; filename must include "specification" or "linear range"
 * - gallery images      — optional; any other images in the folder
 *
 * Folder names must not contain `#` (Vite asset bundler limitation).
 *
 * No code changes required — drop the folder in and it is picked up automatically.
 *
 * ─── content.txt format ───
 *
 * Standard (oil & gas) — four metadata lines, then sections:
 *
 *   Oil & Gas Equipment
 *   DynamicLink Downhole Screen
 *   Sand Control
 *   Product Name
 *   Overview
 *    First paragraph...
 *   Applications
 *    Bullet one
 *   Features
 *    Bullet one
 *   Benefits
 *    Bullet one
 *
 * Process industry — three metadata lines:
 *
 *   Process Industry Screens
 *   Oil & Gas Industry
 *   Product Name
 *   Advantages
 *    Bullet one
 *   Technical Specification
 *    Materials: Stainless steel
 *
 * Minimal — product name only:
 *
 *   Product Name
 *   Design
 *    Paragraph...
 */

export {};
