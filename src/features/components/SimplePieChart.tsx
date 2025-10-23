import type { PieChartData } from '@/types'
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts'

const renderActiveShape = (props: unknown) => {
  const {
    cx = 0,
    cy = 0,
    midAngle = 0,
    innerRadius = 0,
    outerRadius = 0,
    startAngle = 0,
    endAngle = 0,
    fill,
    payload,
    percent = 1,
    value = 0,
  } = props as {
    cx?: number
    cy?: number
    midAngle?: number
    innerRadius?: number
    outerRadius?: number
    startAngle?: number
    endAngle?: number
    fill?: string
    payload: PieChartData
    percent?: number
    value?: number
  }

  const RADIAN = Math.PI / 180
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >
        {`${value}`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}

type Props = {
  data: PieChartData[]
}

export default function SimplePieChart(props: Props) {
  const { data } = props
  const renderLegend = () => (
    <ul className="flex flex-wrap lg:flex-col justify-center gap-4">
      {data.map((entry, index) => (
        <li key={index} className="flex items-center space-x-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></span>
          <span className="text-sm text-gray-700 font-medium">
            {entry.name}
          </span>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="flex flex-col lg:flex-row  justify-center items-center gap-4">
      {data.length === 0 ? (
        <div className="text-gray-500  lg:h-53 md:h-43 h-60 flex justify-center items-center">
          データがありません
        </div>
      ) : (
        <>
          <div className="w-full max-w-md   lg:h-53 md:h-43 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  activeShape={renderActiveShape}
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius="65%"
                  outerRadius="90%"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          {renderLegend()}
        </>
      )}
    </div>
  )
}
