import EmotionPicker from "components/EmotionPicker/EmotionPicker";
import Typography from "antd/es/typography";
import Form from "antd/es/form";
import theme from "antd/es/theme";

export default function DailyAssistant() {
  const [form] = Form.useForm();
  const antd = theme.useToken();
  return (
    <div style={{ background: antd.token.colorPrimaryBg, padding: "1rem 2rem 0" }}>
      <Typography.Title level={5} style={{ textAlign: "center", color: antd.token.cyan7 }}>
        Daily Assistant👻
      </Typography.Title>
      <Form form={form} colon={false} layout="vertical">
        <Form.Item name="emotion" label="오늘 기분이 어때요?" trigger="onChange">
          <EmotionPicker />
        </Form.Item>
      </Form>
    </div>
  );
}
