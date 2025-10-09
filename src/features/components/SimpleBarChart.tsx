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
    <div className="lg:h-70 md:h-43 h-60">
      {data.length === 0 ? (
        <div className="text-gray-500 h-full flex justify-center items-center">
          データがありません
        </div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" padding={{ left: 20, right: 20 }} />
              <YAxis
                tickFormatter={(value) => {
                  if (value >= 1_0000_0000)
                    return `${(value / 1_0000_0000).toFixed(1)}億`
                  else return `${(value / 1_0000).toFixed(1)}万`
                }}
              />
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
        </>
      )}
    </div>
  )
}
