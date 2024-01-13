import Card from "./card"

function Dashboard() {
  return (
    <>
      <div className="p-6 flex justify-between">
        <Card title="Tổng doanh thu" total="10.000.000" percent="55"></Card>
        <Card title="Tổng doanh thu" total="10.000.000" percent="55"></Card>
        <Card title="Tổng doanh thu" total="10.000.000" percent="55"></Card>
        <Card title="Tổng doanh thu" total="10.000.000" percent="55"></Card>
      </div>
    </>
  );
}

export default Dashboard;
