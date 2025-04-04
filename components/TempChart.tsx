import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function TempChart({ data }: { data: any[] }) {
  const chartData = data.slice(0, 12).map((h: any) => ({
    time: h.datetime,
    temp: h.temp,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="temp" stroke="#3b82f6" />
      </LineChart>
    </ResponsiveContainer>
  );
}
