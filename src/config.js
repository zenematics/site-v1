// Zenderal release stage: 'Alpha' | 'Beta' | 'Release'
export const ZENDERAL_STAGE = 'Alpha';

// Social links, used by the home hero, the Zenderal page and the footer.
export const LINKS = {
  twitch: 'https://www.twitch.tv/zenematics',
  youtube: 'https://www.youtube.com/@Zenematics',
  discord: 'https://discord.com/invite/aunT9MdevX',
};

export const stageLabel = (stage) => stage + (stage === 'Release' ? '' : ' · In testing');

// YouTube video IDs (the part after `watch?v=`) shown in the home hero panels
// while hovered. Leave one empty to show no video on that panel.
export const PANEL_VIDEOS = {
  content: 'eQ3oREWl7yM',
  zenderal: 'a4TFt0I1m80',
};
