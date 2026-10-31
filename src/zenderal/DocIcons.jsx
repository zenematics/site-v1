// Line icons for the docs: section headings (by heading id) and the Before you install checklist (by step title).
// 24-unit grid, drawn with the current text colour, so CSS sets their colour and size.
const P = {
  clipboard: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <rect x="9" y="2.5" width="6" height="3.5" rx="1" />
      <path d="M9 13l2 2 4-4.5" />
    </>
  ),
  cpu: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="0.5" />
      <path d="M10 2.5v3.5M14 2.5v3.5M10 18v3.5M14 18v3.5M2.5 10H6M2.5 14H6M18 10h3.5M18 14h3.5" />
    </>
  ),
  drive: (
    <>
      <path d="M5.5 6h13l2.5 7v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5z" />
      <path d="M3 13h18" />
      <path d="M16.5 16.5h1" />
    </>
  ),
  checklist: (
    <>
      <path d="M3.5 6.5l1.5 1.5 3-3M3.5 12.5l1.5 1.5 3-3M3.5 18.5l1.5 1.5 3-3" />
      <path d="M11 7h9.5M11 13h9.5M11 19h9.5" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12M7 10.5l5 5 5-5" />
      <path d="M4 16.5V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2.5" />
    </>
  ),
  play: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5v7l6-3.5z" />
    </>
  ),
  zap: <path d="M13 2.5L4.5 13.5h6.5l-1 8 8.5-11h-6.5z" />,
  refresh: (
    <>
      <path d="M20 12a8 8 0 1 1-2.35-5.65" />
      <path d="M20 4v4.5h-4.5" />
    </>
  ),
  lifebuoy: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.75" />
      <path d="M5.6 5.6l3.75 3.75M14.65 14.65l3.75 3.75M18.4 5.6l-3.75 3.75M9.35 14.65L5.6 18.4" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3.5l9.5 16.5h-19z" />
      <path d="M12 10v4.5M12 17.25v0.5" />
    </>
  ),
  heart: <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z" />,
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5z" />
      <path d="M3 12.5l9 5 9-5" />
      <path d="M3 16.5l9 5 9-5" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.75 1.75M16.95 16.95l1.75 1.75M5.3 18.7l1.75-1.75M16.95 7.05l1.75-1.75" />
    </>
  ),
  pulse: <path d="M2.5 12H7l2.5-6.5 5 13 2.5-6.5h4.5" />,
  gpu: (
    <>
      <rect x="2.5" y="6.5" width="19" height="10" rx="1.5" />
      <circle cx="9.5" cy="11.5" r="2.75" />
      <path d="M15.5 9.5h3M15.5 13.5h3M5 16.5v2.5h6v-2.5" />
    </>
  ),
  message: <path d="M4 4.5h16v11.5H10l-6 4.5z" />,
  scale: (
    <>
      <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
      <rect x="9" y="9" width="6" height="6" rx="0.5" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l3 3 5-6" />
    </>
  ),
  bag: (
    <>
      <path d="M5 8h14l-1.25 12.5H6.25z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16M9.5 7V4h5v3" />
      <path d="M6 7l1 13.5h10L18 7" />
      <path d="M10 11v6M14 11v6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.6 3.75 5.6 3.75 9S14.5 18.4 12 21c-2.5-2.6-3.75-5.6-3.75-9S9.5 5.6 12 3z" />
    </>
  ),
  folder: <path d="M3 6.5a1.5 1.5 0 0 1 1.5-1.5h4.75l2 2h8.25a1.5 1.5 0 0 1 1.5 1.5v9.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18z" />,
  sliders: (
    <>
      <path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1" />
      <circle cx="15" cy="6" r="2" />
      <circle cx="9" cy="12" r="2" />
      <circle cx="17" cy="18" r="2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 4.75-3.4 7.9-8 9-4.6-1.1-8-4.25-8-9V6z" />
      <path d="M9 12l2 2 4-4.5" />
    </>
  ),
};

export function DocIcon({ name, className }) {
  if (!P[name]) return null;
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {P[name]}
    </svg>
  );
}

// Section heading id -> icon, across the readme, DLSS & Frame Gen and Performance docs.
export const HEADING_ICONS = {
  requirements: 'clipboard',
  'recommended-specs': 'cpu',
  'disk-space': 'drive',
  'before-you-install': 'checklist',
  installation: 'download',
  'first-launch': 'play',
  'dlss-and-frame-generation': 'zap',
  updating: 'refresh',
  troubleshooting: 'lifebuoy',
  'known-issues': 'alert',
  credits: 'heart',
  'recommended-settings': 'sliders',
  'quick-wins': 'zap',
  upscaling: 'scale',
  'theo-s-render-pipeline': 'layers',
  'bottled-shaders': 'sun',
  stuttering: 'pulse',
  'amd-and-intel-gpus': 'gpu',
  'reporting-a-problem': 'message',
  'what-your-gpu-can-run': 'gpu',
  'before-you-start': 'checklist',
  'checking-it-works': 'check',
  'common-problems': 'lifebuoy',
};

// Checklist step title -> icon, matched on a word in the title.
const STEP_ICONS = [
  [/own/i, 'bag'],
  [/clean/i, 'trash'],
  [/english|language/i, 'globe'],
  [/launch/i, 'play'],
  [/folder/i, 'folder'],
  [/antivirus/i, 'shield'],
];
export const stepIcon = (title) => STEP_ICONS.find(([re]) => re.test(title))?.[1];
