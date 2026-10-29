// Zenderal release stage: 'Alpha' | 'Beta' | 'Release'
export const ZENDERAL_STAGE = 'Beta';

// Social links, used by the home hero and the Zenderal page.
export const LINKS = {
  twitch: 'https://www.twitch.tv/zenematics',
  youtube: 'https://www.youtube.com/@Zenematics',
  discord: 'https://discord.com/invite/aunT9MdevX',
  patreon: 'https://www.patreon.com/cw/relentlesszen',
};

export const stageLabel = (stage) => stage + (stage === 'Release' ? '' : ' · In testing');

// YouTube video IDs (the part after `watch?v=`) shown in the home hero panels
// while hovered. Leave one empty to show no video on that panel. The Zenderal
// panel plays the growing-vines logo instead.
export const PANEL_VIDEOS = {
  content: 'cEvT3NjZgRw',
};
