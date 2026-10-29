// Why seven participants in groups of four become three sessions, not two.

export default function SessionCount() {
  return (
    <div className="diagram">
      <div className="sc">
        <div className="dg-box">
          <strong>The request</strong>
          <span>7 people, groups of 4, and 3 of them share one skill group</span>
        </div>

        <div className="sc-fork down" aria-hidden="true">
          <span className="leg l" />
          <span className="leg r" />
        </div>

        <div className="sc-row">
          <div className="dg-box">
            <strong>Group size</strong>
            <span>7 ÷ 4, rounded up</span>
            <span className="big">2</span>
            <span>sessions</span>
          </div>
          <div className="dg-box accent">
            <strong>Skill group composition</strong>
            <span>3 ÷ 1 allowed per session</span>
            <span className="big">3</span>
            <span>sessions</span>
          </div>
        </div>

        <div className="sc-fork up" aria-hidden="true">
          <span className="leg l" />
          <span className="leg r" />
        </div>

        <div className="dg-box">
          <strong>Whichever is larger wins</strong>
        </div>

        <div className="sc-link" aria-hidden="true" />

        <div className="dg-box result">
          <span className="big">3 sessions</span>
          <span>Not the 2 you would expect</span>
        </div>
      </div>
    </div>
  );
}
