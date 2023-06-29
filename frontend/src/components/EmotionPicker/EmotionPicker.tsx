import FlexBox from "components/FlexBox/FlexBox";
import Radio from "antd/es/radio";
import Tooltip from "antd/es/tooltip";

const emotions = [
  { label: "😣", text: "짜증나" },
  { label: "😥", text: "별로야" },
  { label: "🙂", text: "그저 그래" },
  { label: "😊", text: "좋아" },
  { label: "🤩", text: "최고야" },
];

interface Props {
  onChange?: (e: number) => void;
}
export default function EmotionPicker({ onChange }: Props) {
  return (
    <FlexBox>
      <Radio.Group
        size="large"
        buttonStyle="solid"
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      >
        {emotions.map((emotion, i) => (
          <Tooltip key={i} title={emotion.text}>
            <Radio.Button value={i} style={{ height: "auto", padding: "0.5rem", fontSize: "2rem" }}>
              {emotion.label}
            </Radio.Button>
          </Tooltip>
        ))}
      </Radio.Group>
    </FlexBox>
  );
}
