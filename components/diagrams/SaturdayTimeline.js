// The weekly Saturday pipeline, Wednesday to Thursday.
// Built in HTML rather than as an image so it reflows at phone width.

function Box({ title, text, tone = '' }) {
  return (
    <div className={`dg-box ${tone}`}>
      <strong>{title}</strong>
      {text && <span>{text}</span>}
    </div>
  );
}

export default function SaturdayTimeline() {
  return (
    <div className="diagram tl">
      <p className="tl-day">Wednesday</p>

      <div className="tl-step">
        <span className="tl-time">11:00</span>
        <Box title="Kickoff" text="Slack request to site leads: fill in Yes, No or Maybe" />
      </div>

      <div className="tl-step">
        <span className="tl-time">16:00</span>
        <div>
          <Box title="Chase" text="Reads every answer for the target Saturday" />
          <div className="tl-branches">
            <Box title="Answers missing" text="Reminder, naming the site lead" />
            <Box title="All filled in" text="Confirmation" />
            <Box title="Zero rows found" text="Anomaly alert" tone="warn" />
          </div>
        </div>
      </div>

      <p className="tl-day">Thursday</p>

      <div className="tl-step">
        <span className="tl-time">10:00</span>
        <Box title="Preview" text="Read-only headcount, plus data quality counters" />
      </div>

      <div className="tl-cut">
        <strong>12:00 fill cut-off</strong>
        <span>Blank cells count as No</span>
      </div>

      <div className="tl-step">
        <span className="tl-time">13:30</span>
        <Box title="Generate" text="Writes headcount and target date into the slot generator" />
      </div>

      <div className="tl-step">
        <span className="tl-time">13:45</span>
        <div className="tl-push">
          <Box title="Push" text="Import, then five checks in AND before announcing" tone="accent" />
          <Box title="Alert on any fail" text="Names the check that failed" tone="warn" />
        </div>
      </div>
    </div>
  );
}
