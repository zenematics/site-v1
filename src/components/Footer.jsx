import { LINKS } from '../config.js';

export default function Footer() {
  return (
    <footer className="footer">
      <a href={import.meta.env.BASE_URL} className="footer__brand">
        <img src={`${import.meta.env.BASE_URL}uploads/zen-logo-white.png`} alt="" className="footer__logo" />
        <span className="footer__name">Zenematics</span>
      </a>
      <div className="footer__links">
        <a href={LINKS.twitch} target="_blank" rel="noopener noreferrer">Twitch</a>
        <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
        <a href={LINKS.discord} target="_blank" rel="noopener noreferrer">Discord</a>
      </div>
      <span className="footer__note">Zenderal is a fan project and is not affiliated with SureAI.</span>
    </footer>
  );
}
