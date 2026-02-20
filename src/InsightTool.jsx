import { useState } from "react";
import logo1 from "./assets/logo1.png";
import logo2 from "./assets/logo2.png";

const INITIAL_INSIGHTS = [
  {
    id: 1,
    session: "2/19 – Tech & BA Panel",
    theme: "Knowledge & Documentation",
    type: "Pain Point",
    severity: "Critical",
    insight: "Workarounds have become business processes",
    detail: "Over 25+ years, informal workarounds have been normalized into official workflows. Users don't distinguish them from 'how things work.' The new system risks breaking processes users don't even realize are workarounds.",
    quote: "",
    source: "James Whitcomb",
    tags: ["onboarding", "documentation", "change-management"],
    actionable: true,
    action: "During user interviews, ask directly: 'What steps do you do every day that feel like a workaround?' Map these before designing anything.",
    status: "New"
  },
  {
    id: 2,
    session: "2/19 – Tech & BA Panel",
    theme: "Knowledge & Documentation",
    type: "Pain Point",
    severity: "Critical",
    insight: "No formal user training exists — all learning is through shadowing",
    detail: "There is zero documented training for end users. Everything is learned on-the-job by shadowing experienced colleagues. This means knowledge walks out the door with people and new employees face steep undocumented learning curves.",
    quote: "On the job training as situations occur.",
    source: "Scot Murphy",
    tags: ["onboarding", "training", "knowledge-management"],
    actionable: true,
    action: "Design onboarding flows and in-app contextual help into the new system from day one. Revenue Accounting power users are the informal experts — involve them in validation sessions.",
    status: "New"
  },
  {
    id: 3,
    session: "2/19 – Tech & BA Panel",
    theme: "Knowledge & Documentation",
    type: "Pain Point",
    severity: "High",
    insight: "Documentation dates to 1988; validity is unknown without investigation",
    detail: "Existing documentation ranges from 1988 PDFs (with coffee stains) to recently digitized Markdown files. Some is still valid; the team has no reliable method to determine what. Thousands of pages are in SharePoint. The default assumption has become 'it's probably outdated.'",
    quote: "I trust usually that it's likely not valid, and I'm pleasantly surprised when it is.",
    source: "James Whitcomb",
    tags: ["documentation", "discovery", "ai-opportunity"],
    actionable: true,
    action: "Get SharePoint access (coordinate with Jacob Dohner). Use Bedrock/AI to cross-reference docs against actual codebase to flag what's still valid. This is a direct AI accelerator opportunity.",
    status: "New"
  },
  {
    id: 4,
    session: "2/19 – Tech & BA Panel",
    theme: "System Architecture",
    type: "Pain Point",
    severity: "Critical",
    insight: "Business logic is buried across PowerBuilder, stored procedures, triggers, and undocumented batch scripts",
    detail: "There is no single place where business logic lives. It spans the PB application, deeply nested stored procedures (procedures calling procedures), database triggers, and batch scripts. Developers described spending hours tracing a single issue through layers of code.",
    quote: "It's all over the place. It can be something within the PowerBuilder app to very deeply hidden parts of a procedure... Find oh, here's the line of code buried in line 500 to 550 within the secondary package that it called.",
    source: "Andrew Smith",
    tags: ["architecture", "business-logic", "ai-opportunity", "modernization-risk"],
    actionable: true,
    action: "Leverage AI code analysis (Bedrock) before making any UX decisions. Until business logic is mapped, we cannot safely redesign workflows. Partner with Bryan Tharpe on discovery tooling approach.",
    status: "New"
  },
  {
    id: 5,
    session: "2/19 – Tech & BA Panel",
    theme: "System Architecture",
    type: "Pain Point",
    severity: "Critical",
    insight: "100+ external systems write directly into Oracle with no standardized contracts",
    detail: "There is no well-defined API or interface layer. External systems insert directly into Oracle tables, often invoking internal functions without coordination. This creates an absurd number of entry points with unknown side effects.",
    quote: "The contracts between the systems are not well defined.",
    source: "Scot Murphy",
    tags: ["architecture", "integrations", "data-quality", "modernization-risk"],
    actionable: false,
    action: "Flag for Andy Kong and Stanley Bertrand. This is an architectural concern that must be addressed before or alongside UX modernization — not a UX fix.",
    status: "New"
  },
  {
    id: 6,
    session: "2/19 – Tech & BA Panel",
    theme: "Data Quality",
    type: "Pain Point",
    severity: "High",
    insight: "Data validation is ad hoc, undocumented, and inconsistently applied",
    detail: "Preconditions for valid data were 'defined once and never updated' or evolved into something convoluted. Invalid data from integrations frequently passes surface checks but fails silently downstream. Some features may have been broken for 10+ years undetected.",
    quote: "There's definitely not a lot of well-defined precondition identification throughout it... the definition of what is correct was defined once and then never actually updated.",
    source: "Scot Murphy",
    tags: ["data-quality", "validation", "error-handling", "ai-opportunity"],
    actionable: true,
    action: "Design explicit, human-readable validation feedback into new system UX. Work with Carl Bade to use AI to map existing validations — users likely don't know what rules exist.",
    status: "New"
  },
  {
    id: 7,
    session: "2/19 – Tech & BA Panel",
    theme: "Data Quality",
    type: "Pain Point",
    severity: "High",
    insight: "No tooling to trace data flow — investigation is entirely manual",
    detail: "When a data issue occurs, the team must manually read through code to trace how data flows through the system (what triggered what). Gabriel described this process as the most common recurring support burden. Autosis gives some visibility but it's limited.",
    quote: "We don't have any effective way to do that aside from like individuals going through, reading through code, trying to see like OK someone inserted this row here.",
    source: "Gabriel Lein",
    tags: ["data-quality", "tooling", "support", "ai-opportunity"],
    actionable: true,
    action: "AI data lineage tooling is a direct value-add. Discuss with Andy Kong whether proxy logging could be introduced during migration to capture data origin/flow patterns.",
    status: "New"
  },
  {
    id: 8,
    session: "2/19 – Tech & BA Panel",
    theme: "Support & Operations",
    type: "Pain Point",
    severity: "Medium",
    insight: "Support requests frequently bypass ServiceNow via direct messages",
    detail: "Despite team policy requiring ServiceNow tickets, many issues (especially from Revenue Accounting) are reported via Teams messages. The team is actively pushing back but still expected to help. True support volume is likely undercounted in ticketing data.",
    quote: "Constant stuff being reported outside of ServiceNow. We try to push people towards incidents, but a lot of teams message. We're still expected to help.",
    source: "Jacob Dohner",
    tags: ["support", "process", "revenue-accounting"],
    actionable: true,
    action: "When designing the new system, build lightweight in-app feedback/issue reporting. Reduce friction to log official requests. Better error messages reduce the need to contact support at all.",
    status: "New"
  },
  {
    id: 9,
    session: "2/19 – Tech & BA Panel",
    theme: "Support & Operations",
    type: "Pain Point",
    severity: "Critical",
    insight: "One daily job (Autosis) is a single point of failure for the entire system",
    detail: "A specific scheduled job must run every day. If it doesn't, the system stops functioning normally. This is described as causing a 'very bad day.' Most catastrophic outages come from outside Atlas (servers, SSL certs, config errors) rather than the application itself.",
    quote: "It's like the button in Lost. If somebody doesn't push it every day, everything stops.",
    source: "Jason Beavers (referencing team)",
    tags: ["architecture", "reliability", "critical-path", "modernization-risk"],
    actionable: false,
    action: "Flag for Andy Kong and Stanley. This is not a UX issue but a critical architectural dependency that must be replicated or replaced in the cloud migration. Do not proceed with migration until this is addressed.",
    status: "New"
  },
  {
    id: 10,
    session: "2/19 – Tech & BA Panel",
    theme: "User Groups",
    type: "Finding",
    severity: "High",
    insight: "Revenue Accounting is the highest-frequency user group AND the informal knowledge base",
    detail: "Revenue Accounting are described as 'the cash register' — the most critical user group. They also know Atlas best: Gabriel goes to them to understand how things 'should' work. They have established processes and resist formal ticketing. They should be first for user interviews.",
    quote: "Revenue accounting is used to being able to skip the line.",
    source: "Gabriel Lein",
    tags: ["user-groups", "revenue-accounting", "prioritization"],
    actionable: true,
    action: "Coordinate with Jacob Dohner to schedule Revenue Accounting user interviews as the first round. Focus on: daily workflows, workarounds, what they love and fear losing, and their implicit validation rules.",
    status: "New"
  },
  {
    id: 11,
    session: "2/19 – Tech & BA Panel",
    theme: "Terminology & Taxonomy",
    type: "Pain Point",
    severity: "High",
    insight: "Each department developed its own dialect over 25 years — terminology doesn't translate across teams or systems",
    detail: "Different teams and systems refer to the same things differently. Right Angle has cross-reference lists to translate Atlas data into its own terms. Post-OneOK acquisition made this worse. There's no shared glossary. Even between systems, the same database column can mean different things.",
    quote: "Sometimes it's even different from system to system... between Atlas and Right Angle, Right Angle has a bunch of cross reference lists that take data from Atlas and says hey, you told us this information, here's what this actually means for Right Angle.",
    source: "James Whitcomb",
    tags: ["terminology", "data-governance", "cross-team", "integration"],
    actionable: true,
    action: "Get access to the shared definitions library (Jacob Dohner). During user interviews, explicitly ask teams to define their key terms — compare across groups. This will be essential input for data model design in the new system.",
    status: "New"
  },
  {
    id: 12,
    session: "2/19 – Tech & BA Panel",
    theme: "Modernization Risks",
    type: "Pain Point",
    severity: "Critical",
    insight: "Previous modernization (Magellan 2010) failed due to lack of user research — history must not repeat",
    detail: "Magellan was the first modernization attempt ~2010. It failed. The Swift UI, a more recent attempt, was also received poorly despite modern UX principles — it lacked user engagement during design. Users rejected swim lanes and non-grid interfaces. They want Excel-like grids.",
    quote: "Swift was developed with modern UX principles but lacked sufficient user engagement and interviews during its design phase, resulting in features that did not align with user preferences.",
    source: "Session 1 Notes (Copilot summary)",
    tags: ["modernization-risk", "ux-strategy", "change-management", "user-research"],
    actionable: true,
    action: "Do not design without users. Validate every major UX pattern with actual users before building. Start prototypes with grid-first layouts and evolve from there. Frame modernization as 'keeping what works, fixing what doesn't' not 'redesign.'",
    status: "New"
  },
  {
    id: 13,
    session: "2/19 – Tech & BA Panel",
    theme: "System Architecture",
    type: "Finding",
    severity: "High",
    insight: "This session group are support/dev team — actual users must still be interviewed",
    detail: "Critically, none of the session participants are daily Atlas users. Their insights are filtered through a support and development lens. They were clear: 'We aren't the users. Our pain points are significantly different from the actual users of Atlas.' Direct user access is the top next step.",
    quote: "We're not the users of Atlas, we just maintain it. Nobody else is going to be looking at documentation for Atlas. It would just solely be us.",
    source: "Jacob Dohner",
    tags: ["user-research", "prioritization", "discovery"],
    actionable: true,
    action: "Coordinate with Jacob Dohner to get access to Revenue Accounting, Shipper Services, Field Operators, and Product Services teams for direct user interviews. These should happen before any design work begins.",
    status: "New"
  }
];

const THEMES = ["All Themes", "Knowledge & Documentation", "System Architecture", "Data Quality", "Support & Operations", "User Groups", "Terminology & Taxonomy", "Modernization Risks"];
const TYPES = ["All Types", "Pain Point", "Finding"];
const SEVERITIES = ["All Severities", "Critical", "High", "Medium", "Low"];
const STATUSES = ["New", "In Progress", "Addressed", "Deferred"];

const SEVERITY_COLORS = {
  Critical: { bg: "#FEE2E2", text: "#991B1B", dot: "#EF4444" },
  High: { bg: "#FEF3C7", text: "#92400E", dot: "#F59E0B" },
  Medium: { bg: "#DBEAFE", text: "#1E40AF", dot: "#3B82F6" },
  Low: { bg: "#D1FAE5", text: "#065F46", dot: "#10B981" },
};

const TYPE_COLORS = {
  "Pain Point": { bg: "#FEE2E2", text: "#991B1B" },
  "Finding": { bg: "#DBEAFE", text: "#1E40AF" },
};

const STATUS_COLORS = {
  "New": { bg: "#E0E7FF", text: "#3730A3" },
  "In Progress": { bg: "#FEF3C7", text: "#92400E" },
  "Addressed": { bg: "#D1FAE5", text: "#065F46" },
  "Deferred": { bg: "#F3F4F6", text: "#6B7280" },
};

export default function InsightTool() {
  const [insights, setInsights] = useState(INITIAL_INSIGHTS);
  const [filterTheme, setFilterTheme] = useState("All Themes");
  const [filterType, setFilterType] = useState("All Types");
  const [filterSeverity, setFilterSeverity] = useState("All Severities");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [view, setView] = useState("grid");

  const updateStatus = (id, status) => {
    setInsights(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  const filtered = insights.filter(i => {
    if (filterTheme !== "All Themes" && i.theme !== filterTheme) return false;
    if (filterType !== "All Types" && i.type !== filterType) return false;
    if (filterSeverity !== "All Severities" && i.severity !== filterSeverity) return false;
    if (search && !i.insight.toLowerCase().includes(search.toLowerCase()) &&
        !i.detail.toLowerCase().includes(search.toLowerCase()) &&
        !i.tags.some(t => t.includes(search.toLowerCase()))) return false;
    return true;
  });

  const stats = {
    total: insights.length,
    painPoints: insights.filter(i => i.type === "Pain Point").length,
    findings: insights.filter(i => i.type === "Finding").length,
  };

  const SelectFilter = ({ value, onChange, options }) => (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        padding: "6px 10px", borderRadius: 6, border: "1px solid #D1D5DB",
        fontSize: 13, color: "#374151", background: "white", cursor: "pointer"
      }}
    >
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );

  const Tag = ({ text }) => (
    <span style={{ background: "#E0F4FB", color: "#0092CF", padding: "2px 8px", borderRadius: 20, fontSize: 11, fontWeight: 500 }}>
      #{text}
    </span>
  );

  const Badge = ({ label, colors }) => (
    <span style={{ background: colors.bg, color: colors.text, padding: "2px 8px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
      {label}
    </span>
  );

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: "#F8FAFC", minHeight: "100vh", padding: 0 }}>
      {/* Header */}
      <div style={{ background: "#003362", padding: "20px 28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <img src={logo1} alt="OneOK Logo" style={{ height: 26, width: 80, objectFit: "contain" }} />
          <div style={{ width: 1, height: 26, background: "rgba(255,255,255,0.4)" }} />
          <img src={logo2} alt="OneOK Logo" style={{ height: 26, width: 80, objectFit: "contain" }} />
        </div>
        <div style={{ fontSize: 28, fontWeight: 800, color: "white", letterSpacing: "-0.5px", marginBottom: 6 }}>Interview Insights</div>
        <p style={{ color: "#A8CEED", fontSize: 13, margin: 0 }}>OneOK Cloud Transformation · Discovery Phase</p>

        {/* Stats */}
        <div style={{ display: "flex", gap: 20, marginTop: 16 }}>
          {[
            ["Total Insights", stats.total, "#0092CF"],
            ["Pain Points", stats.painPoints, "#F87171"],
            ["Findings", stats.findings, "#6EE7B7"],
          ].map(([label, val, color], i, arr) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 26, fontWeight: 800, color }}>{val}</div>
                <div style={{ fontSize: 11, color: "#93C5FD", fontWeight: 500 }}>{label}</div>
              </div>
              {i < arr.length - 1 && <div style={{ width: 1, height: 36, background: "rgba(255,255,255,0.15)" }} />}
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: "white", padding: "12px 28px", borderBottom: "1px solid #E5E7EB", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <input
          placeholder="Search insights..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 13, width: 200 }}
        />
        <SelectFilter value={filterTheme} onChange={setFilterTheme} options={THEMES} />
        <SelectFilter value={filterType} onChange={setFilterType} options={TYPES} />
        <SelectFilter value={filterSeverity} onChange={setFilterSeverity} options={SEVERITIES} />
        <span style={{ marginLeft: "auto", fontSize: 13, color: "#6B7280", fontWeight: 500 }}>
          {filtered.length} of {insights.length} insights
        </span>
        <div style={{ display: "flex", gap: 4 }}>
          {["grid", "list"].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: "5px 12px", borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 12, fontWeight: 600,
              background: view === v ? "#003362" : "white", color: view === v ? "white" : "#374151", cursor: "pointer"
            }}>{v === "grid" ? "⊞ Grid" : "☰ List"}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "20px 28px" }}>
        <div style={{ display: view === "grid" ? "grid" : "flex", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", flexDirection: "column", gap: 16 }}>
          {filtered.map(insight => {
            const isExpanded = expanded === insight.id;
            const sevColors = SEVERITY_COLORS[insight.severity];
            const typeColors = TYPE_COLORS[insight.type];

            return (
              <div key={insight.id} style={{
                background: "white", borderRadius: 10, border: "1px solid #E5E7EB",
                borderLeft: `4px solid ${sevColors.dot}`, overflow: "hidden",
                boxShadow: isExpanded ? "0 4px 12px rgba(0,0,0,0.10)" : "0 1px 3px rgba(0,0,0,0.06)",
                transition: "box-shadow 0.2s"
              }}>
                {/* Card header */}
                <div style={{ padding: "16px 16px 12px" }}>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                    <Badge label={insight.severity} colors={sevColors} />
                    <Badge label={insight.type} colors={typeColors} />
                  </div>

                  <div style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 500, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    {insight.theme} · {insight.session}
                  </div>

                  <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#111827", lineHeight: 1.4, marginBottom: 8 }}>
                    {insight.insight}
                  </h3>

                  <p style={{ margin: 0, fontSize: 13, color: "#4B5563", lineHeight: 1.5, display: isExpanded ? "block" : "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {insight.detail}
                  </p>
                </div>

                {/* Expanded content */}
                {isExpanded && (
                  <div style={{ padding: "0 16px 16px" }}>
                    {insight.quote && (
                      <div style={{ margin: "12px 0", padding: "10px 14px", background: "#E0F4FB", borderLeft: "3px solid #0092CF", borderRadius: "0 6px 6px 0" }}>
                        <p style={{ margin: 0, fontSize: 13, color: "#003362", fontStyle: "italic", lineHeight: 1.5 }}>"{ insight.quote}"</p>
                        <p style={{ margin: "6px 0 0", fontSize: 11, color: "#0092CF", fontWeight: 600 }}>— {insight.source}</p>
                      </div>
                    )}

                    {insight.action && (
                      <div style={{ margin: "12px 0", padding: "10px 14px", background: "#FFFBEB", borderLeft: "3px solid #F59E0B", borderRadius: "0 6px 6px 0" }}>
                        <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, color: "#92400E", textTransform: "uppercase" }}>→ Recommended Action</p>
                        <p style={{ margin: 0, fontSize: 13, color: "#78350F", lineHeight: 1.5 }}>{insight.action}</p>
                      </div>
                    )}

                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
                      {insight.tags.map(t => <Tag key={t} text={t} />)}
                    </div>


                  </div>
                )}

                {/* Card footer */}
                <div style={{ padding: "8px 16px", background: "#F9FAFB", borderTop: "1px solid #F3F4F6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: "#9CA3AF" }}>Source: {insight.source}</span>
                  <button onClick={() => setExpanded(isExpanded ? null : insight.id)} style={{
                    padding: "4px 12px", borderRadius: 6, border: "1px solid #D1D5DB", fontSize: 12,
                    fontWeight: 600, cursor: "pointer", background: "white", color: "#374151"
                  }}>
                    {isExpanded ? "↑ Collapse" : "↓ Expand"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#9CA3AF" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <p style={{ fontSize: 15, fontWeight: 500 }}>No insights match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
