<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>XML Sitemap</title>
        <style>
          body { font-family: system-ui, sans-serif; margin: 2rem; color: #0c1524; }
          h1 { font-size: 1.5rem; margin-bottom: 0.25rem; }
          p { color: #555; margin-top: 0; }
          table { width: 100%; border-collapse: collapse; margin-top: 1.5rem; font-size: 0.9rem; }
          th, td { border: 1px solid #ddd; padding: 0.6rem 0.75rem; text-align: left; vertical-align: top; }
          th { background: #0c1524; color: #fff; }
          tr:nth-child(even) { background: #f8f9fb; }
          a { color: #0c1524; word-break: break-all; }
        </style>
      </head>
      <body>
        <h1>XML Sitemap</h1>
        <p>This file is for search engines. Humans can browse the table below.</p>
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Last modified</th>
              <th>Change frequency</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="s:urlset/s:url">
              <tr>
                <td><a href="{s:loc}"><xsl:value-of select="s:loc" /></a></td>
                <td><xsl:value-of select="s:lastmod" /></td>
                <td><xsl:value-of select="s:changefreq" /></td>
                <td><xsl:value-of select="s:priority" /></td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
