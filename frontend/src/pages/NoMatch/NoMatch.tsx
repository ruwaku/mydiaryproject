import Result from "antd/es/result";
import Button from "antd/es/button";
import Space from "antd/es/space";
import { useNavigate } from "react-router-dom";
import FlexBox from "components/FlexBox/FlexBox";
import theme from "antd/es/theme";

export default function NoMatch() {
  const navigate = useNavigate();
  const antd = theme.useToken();
  return (
    <FlexBox
      justifyContent="center"
      alignItems="center"
      style={{ height: "100%", background: antd.token.colorBgBase }}
    >
      <Result
        status="warning"
        title="페이지를 찾을 수 없습니다"
        subTitle="다른 곳으로 이동되었거나 존재하지 않는 경로입니다"
        extra={
          <Space>
            <Button
              onClick={() => {
                navigate("/");
              }}
            >
              처음 페이지로
            </Button>
            <Button
              onClick={() => {
                navigate(-1);
              }}
            >
              이전 페이지로
            </Button>
          </Space>
        }
      />
    </FlexBox>
  );
}
