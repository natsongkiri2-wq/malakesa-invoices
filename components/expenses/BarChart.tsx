'use client'

// ─── BarChart — horizontal bar chart for expense reports ─────────────────────

interface BarItem {
  label: string
  value: number
}

interface BarChartProps {
  data: BarItem[]
  /** Maximum value for scaling (defaults to max in data) */
  maxValue?: number
  /** Show inline value label inside the bar when bar is wide enough */
  showInlineLabel?: boolean
}

export default function BarChart({ data, maxValue, showInlineLabel = true }: BarChartProps) {
  const max = maxValue ?? Math.max(...data.map((d) => d.value))

  return (
    <div className="exp-chart">
      {data.map(({ label, value }) => {
        const pct = max > 0 ? Math.round((value / max) * 100) : 0
        const wide = pct > 20

        return (
          <div key={label} className="exp-chart-row">
            <div className="exp-chart-label" title={label}>
              {label.length > 18 ? label.slice(0, 17) + '…' : label}
            </div>
            <div className="exp-chart-track">
              <div
                className="exp-chart-fill"
                style={{ width: `${pct}%` }}
                role="meter"
                aria-valuenow={value}
                aria-valuemax={max}
                aria-label={label}
              >
                {showInlineLabel && wide
                  ? `VUV ${value.toLocaleString()}`
                  : null}
              </div>
            </div>
            <div className="exp-chart-val">
              VUV {value.toLocaleString()}
            </div>
          </div>
        )
      })}
    </div>
  )
}
