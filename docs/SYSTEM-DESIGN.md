# System design

## Scope

A client-rendered React portfolio served as static files. The page has a prerecorded greeting video, sound controls, two decorative video backgrounds, scramble text, cursor dots, orbiting borders and responsive glass surfaces. No authentication, backend or database is needed for these features.

## Components and policies

| Concern | Owner | Contract |
| --- | --- | --- |
| Composition | App | Compose sections and compute quiet from pause plus reduced motion |
| Text animation | ScrambleText | Animate visible glyphs on reveal/hover, preserve semantic text, cancel frames on teardown |
| Text motion policy | ScrambleContext | Supply quiet to every text component |
| Greeting media | useGreeting | Keep the video ref, sound state, replay and rejection feedback |
| Background media | VideoBackground | Muted autoplay, loop, playsInline, poster and pause handling |
| Cursor | CursorMatrix | Fine-pointer trail, bounded samples, cleanup |
| Portrait depth | Scene | Own Three.js renderer, resize observer, static rendering while paused and GPU disposal |
| Visual design | global.css | Shared colors, glass, elevation, button orbit and responsive rules |

## Text rendering

ScrambleText is a local React implementation, not an imported package with an asserted 1 KB bundle size. The stable text reserves its layout space. An absolute visual layer briefly replaces unrevealed characters with glyphs. A separate accessible layer exposes the original text, preventing assistive technologies from announcing random characters. The duration is bounded to 650 ms. An IntersectionObserver starts the first reveal, and pointer hover can replay it. Reduced motion and the page pause control suppress the effect.

## Visual system

The primary accent is lime over dark surfaces. Glass navigation uses backdrop blur, translucent highlights, a fine border and layered shadows. Content cards have lighter inset highlights and softer exterior shadows. Orbiting dots trace rounded borders on buttons, the greeting card and navbar. Focus outlines remain visible. Background video layers sit below page content; overlays reduce contrast without hiding the fabric movement. The footer owns a separate instance of the same background video.

## Build and deployment

Node.js 22+ and npm install dependencies. Esbuild bundles src/main.jsx; the build copies public assets and CSS into dist. Netlify's configuration runs npm run build and publishes dist. Manual upload requires only the contents of dist, with index.html at the root. Netlify deploys are not performed by the local development server.

## Reliability and limits

Autoplay starts muted. Audible playback requires a click. Errors are shown as media status text. Videos have posters. WebGL is decorative and failures leave the rest of the page usable. Every effect cancels its own resources. The site is static and contains no runtime secrets.

The production build, output syntax and ZIP integrity are verified. Browser layout, CSS motion-path rendering, GPU behavior and audible playback still require checking in the target browser. The local ScrambleText size is not claimed to be exactly 1 KB. The avatar is prerecorded video rather than a live 3D model.
