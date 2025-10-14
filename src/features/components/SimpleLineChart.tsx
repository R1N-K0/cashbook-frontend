import type { LineChartData } from '@/types'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type Props = {
  data: LineChartData[]
}

export default function SimpleLineChart(props: Props) {
  const { data } = props
  return (
    <div className="w-full flex-1  h-full min-h-60 md:min-h-35 ">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <Area
            type="monotone"
            dataKey="value"
            stroke="#7ADAA5"
            fill="#f5fcf7"
          />

          <XAxis dataKey="name" />
          <YAxis
            tickFormatter={(value) => {
              if (value >= 1_0000_0000)
                return `${(value / 1_0000_0000).toFixed(1)}億`
              else return `${(value / 1_0000).toFixed(1)}万`
            }}
          />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
