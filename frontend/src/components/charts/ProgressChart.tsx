import { motion } from 'framer-motion';

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface ProgressChartProps {
  data: DataPoint[];
  title: string;
  type?: 'bar' | 'line';
}

export function ProgressChart({ data, title, type = 'bar' }: ProgressChartProps) {
  const maxValue = Math.max(...data.map(d => d.value), 1);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg">
      <h3 className="text-2xl font-bold text-text mb-6">{title}</h3>

      <div className="space-y-4">
        {type === 'bar' ? (
          // Bar Chart
          data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-text">{item.label}</span>
                <span className="text-sm font-bold text-primary">{item.value}%</span>
              </div>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.value / maxValue) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-full rounded-full"
                  style={{
                    background: item.color || `linear-gradient(to right, #4CAF50, #2196F3)`,
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          // Line Chart (simplified)
          <div className="relative h-64">
            <svg width="100%" height="100%" className="overflow-visible">
              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={`${100 - y}%`}
                  x2="100%"
                  y2={`${100 - y}%`}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
              ))}

              {/* Line path */}
              <motion.polyline
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2 }}
                points={data
                  .map((item, i) => {
                    const x = (i / (data.length - 1)) * 100;
                    const y = 100 - (item.value / maxValue) * 100;
                    return `${x}%,${y}%`;
                  })
                  .join(' ')}
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Points */}
              {data.map((item, i) => {
                const x = (i / (data.length - 1)) * 100;
                const y = 100 - (item.value / maxValue) * 100;
                return (
                  <motion.circle
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 + 0.5 }}
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r="6"
                    fill="#4CAF50"
                    stroke="white"
                    strokeWidth="2"
                  />
                );
              })}

              {/* Gradient definition */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4CAF50" />
                  <stop offset="100%" stopColor="#2196F3" />
                </linearGradient>
              </defs>
            </svg>

            {/* X-axis labels */}
            <div className="flex justify-between mt-2">
              {data.map((item, i) => (
                <span key={i} className="text-xs text-text/70">
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
