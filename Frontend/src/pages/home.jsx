import { CrownOutlined } from "@ant-design/icons";
import { Result } from "antd";
const HomePage = () => {
  return (
    <div>
      HomePage
      <div>
        <Result icon={<CrownOutlined />} title="JWT basic"></Result>
      </div>
    </div>
  );
};

export default HomePage;
