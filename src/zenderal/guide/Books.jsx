import { BOOK_TIERS, CRAFTING_SKILLS, LEARNING_SKILLS } from './data.js';

export default function Books() {
  return (
    <div className="md">
      <p>
        Skills in Enderal don't grow by using them. Levelling up gives you <strong>Learning Points</strong> and{' '}
        <strong>Crafting Points</strong>, and the only way to spend them is to read a book of the right skill. In
        Zenderal that's the only way: there's no level-up menu that spends points for you.
      </p>

      <h2>How a book works</h2>
      <ul>
        <li>
          Reading a book spends <strong>1 point</strong> and raises its skill by <strong>1</strong>. The book is used
          up.
        </li>
        <li>
          <strong>Learning Books</strong> spend Learning Points on combat, armor, stealth and magic skills.{' '}
          <strong>Crafting Books</strong> spend Crafting Points on crafting and social skills.
        </li>
        <li>
          Every book has a tier, and the tier is a <strong>cap</strong>: an Apprentice book can't take a skill past 25.
          Read it at 25 or above and you're told the skill is too developed. You keep the book and the point.
        </li>
        <li>
          You can read a book far above your level, an Expert book at skill 10 for example. The game warns you first,
          then raises the skill by 1 as usual. Cheaper books do the same job until you reach their cap.
        </li>
        <li>No points left? The book stays in your bag.</li>
      </ul>

      <h2>Tiers</h2>
      <div className="spells__scroll">
        <table>
          <thead>
            <tr>
              <th>Tier</th>
              <th>Raises a skill in</th>
              <th>Learning book</th>
              <th>Crafting book</th>
            </tr>
          </thead>
          <tbody>
            {BOOK_TIERS.map((t) => (
              <tr key={t.tier}>
                <td>{t.tier}</td>
                <td>{t.range}</td>
                <td>{t.learning} gold</td>
                <td>{t.crafting} gold</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="g-note">Base prices; merchants and Rhetoric move them.</p>

      <h2>Which skills use which book</h2>
      <div className="g-twocol">
        <div>
          <h3>Learning Books</h3>
          <div className="g-tags">
            {LEARNING_SKILLS.map((s) => (
              <span key={s} className="g-tag">{s}</span>
            ))}
          </div>
        </div>
        <div>
          <h3>Crafting Books</h3>
          <div className="g-tags">
            {CRAFTING_SKILLS.map((s) => (
              <span key={s} className="g-tag">{s}</span>
            ))}
          </div>
        </div>
      </div>

      <h2>Other books that give points</h2>
      <ul>
        <li>
          <strong>Learning Book: +2 Learning Points</strong> and <strong>+2 Crafting Points</strong> add points
          instead of spending them.
        </li>
        <li>
          <strong>Memory books</strong> grant a Memory Point, the currency for perks in the memory trees (and the
          road to an affinity).
        </li>
        <li>Talent books from Forgotten Stories teach class talents once you meet their tree requirements.</li>
      </ul>

      <blockquote>
        <p>
          <strong>Tip</strong>
          Buy books in batches when you're in a city. Once a skill reaches 25 only Adept books or better will raise
          it, so carry a few of the next tier before you get there.
        </p>
      </blockquote>
    </div>
  );
}
