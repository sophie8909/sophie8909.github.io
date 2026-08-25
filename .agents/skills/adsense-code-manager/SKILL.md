---
name: adsense-code-manager
description: Manage Google AdSense site-wide loader scripts, account verification metadata, and ads.txt publisher authorization in web repositories. Use for auditing, installing, updating, or reconciling AdSense ownership and publisher snippets; do not use for designing ad placements or adding ad-unit markup unless the user explicitly asks.
---

# AdSense Code Manager

Keep the AdSense publisher identity consistent across source files and deployed output without duplicating scripts or editing generated artifacts as source.

## Canonical publisher identity

Use these values unless the user explicitly supplies replacements:

```text
Account ID: ca-pub-2263683088830621
Publisher ID: pub-2263683088830621
Certification authority ID: f08c47fec0942fa0
```

Canonical global loader:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2263683088830621"
  crossorigin="anonymous"></script>
```

Canonical ownership meta tag:

```html
<meta name="google-adsense-account" content="ca-pub-2263683088830621">
```

Canonical `ads.txt` record:

```text
google.com, pub-2263683088830621, DIRECT, f08c47fec0942fa0
```

Preserve these values exactly. Treat publisher IDs as configuration, not secrets.

## Audit before editing

Inspect the live repository and deployment configuration before changing files:

- Find every occurrence of `adsbygoogle`, `google-adsense-account`, `pub-2263683088830621`, and `f08c47fec0942fa0`.
- Identify the authored HTML entrypoints, public/static asset directory, build output, redirect/error pages, server templates, and any runtime ad loader.
- Classify each occurrence as source of truth, generated output, runtime control, or stale duplicate.
- Report whether each managed item is present, missing, duplicated, or inconsistent.

Preserve unrelated dirty work. Do not replace an existing consent gate, ad-free rule, regional restriction, or runtime loader with an unconditional static loader unless the user asks to change that behavior.

## Reconcile the three managed items

### Global loader

Place the canonical loader once in the `<head>` of each authored, user-visible HTML document that should load AdSense. Prefer a shared layout or true source entrypoint over copying it into generated pages. Do not add it again when an equivalent loader is already inserted at runtime.

Do not automatically add the loader to immediate redirects, `noindex` error pages, previews, tests, or local-only fixtures. Include those only when the user's requested coverage requires them.

### Ownership metadata

Place one canonical `google-adsense-account` meta tag in the `<head>` of each authored page covered by the request. Reuse shared head generation when available. Remove or correct conflicting account tags only within the requested scope.

### ads.txt

Ensure the canonical record is served as `/ads.txt` from the production origin. Put it in the framework's deployable public/static source directory when the build system copies that directory to the output. A repository-root `ads.txt` is sufficient only when the deployment configuration actually publishes it.

Keep other valid seller records. Add the canonical record once, without reordering unrelated records unless required by the repository's formatting rules.

## Boundaries

- Do not create `<ins class="adsbygoogle">` units, call `adsbygoogle.push`, choose formats, or alter page layout unless explicitly requested.
- Do not edit ignored build output such as `dist/` as the primary fix. Edit its source, rebuild, and verify the produced files.
- Do not infer a new publisher ID from a domain, environment name, or another repository.
- Do not publish, deploy, change AdSense console settings, or modify DNS without separate authorization.

## Validate

Run the repository's normal build and relevant tests. Then verify the built artifact rather than assuming source placement is enough:

- The intended HTML contains exactly one effective loader and one matching account meta tag.
- The production artifact contains `/ads.txt` with the exact canonical record.
- No conflicting publisher IDs or duplicate managed snippets remain in scope.
- Redirect/error pages and runtime ad controls still behave according to the existing project contract.

Review the final diff and stage only files belonging to the AdSense task.
