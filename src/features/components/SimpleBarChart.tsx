import type { BarChartData } from '@/types/index'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type Props = {
  data: BarChartData[]
  children?: React.ReactNode
}

export default function SimpleBarChart(props: Props) {
  const { data } = props

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" padding={{ left: 20, right: 20 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          barSize={40}
          dataKey="value"
          fill="#CAE7EE"
          stroke="CAE7EE"
          activeBar={<Rectangle fill="#55B2C9" stroke="#55B2C9" />}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
