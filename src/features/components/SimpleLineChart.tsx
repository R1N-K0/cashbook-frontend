import type { LineChartData } from '@/types'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'

type Props = {
  data: LineChartData[]
}

export default function SimpleLineChart(props: Props) {
  const { data } = props
  return (
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
        <Area type="monotone" dataKey="value" stroke="#7ADAA5" fill="#f5fcf7" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
