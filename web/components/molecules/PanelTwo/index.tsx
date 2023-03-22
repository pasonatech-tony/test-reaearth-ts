import DropCard from "@web/components/atoms/DropCard";
import { Collapse, Switch } from "antd";

const { Panel } = Collapse;

const PanelTwo: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  // データを重ねる

  // 火山の分布
  //   (出典：USGS資料)

  // 地震の震源
  //   (出典：USGS資料)

  // 狭まる境界
  // 広がる境界
  // ずれる境界
  // 不確定境界
  // (出典：Diercke Weltatlas)

  const genExtra = () => <Switch checkedChildren="" unCheckedChildren="" />;
  return (
    <div style={{ maxWidth: "310px", justifyContent: "center" }}>
      <Collapse onChange={onChange}>
        <Panel showArrow={false} header="火山分布" key="1" extra={genExtra()}>
          <DropCard
            imgSrc="https://raw.githubusercontent.com/pasonatech-tony/svg-store/main/volcano.svg"
            title="火山の分布"
            description="(出典：USGS資料)"
            width={12}
            height={13}
          />
        </Panel>
        <Panel showArrow={false} header="震源分布" key="2" extra={genExtra()}>
          <DropCard
            imgSrc="https://raw.githubusercontent.com/pasonatech-tony/svg-store/main/epicenter.svg"
            title="地震の震源"
            description="(出典：USGS資料)"
            width={22}
            height={11}
          />
        </Panel>
        <Panel
          showArrow={false}
          header="プレート境界"
          key="3"
          extra={genExtra()}
        >
          <DropCard
            imgSrc="https://raw.githubusercontent.com/pasonatech-tony/svg-store/main/narrow.svg"
            title="狭まる境界"
            imgSrc2="https://raw.githubusercontent.com/pasonatech-tony/svg-store/main/expanded.svg"
            title2="広がる境界"
            imgSrc3="https://raw.githubusercontent.com/pasonatech-tony/svg-store/main/displaced.svg"
            title3="ずれる境界"
            imgSrc4="https://raw.githubusercontent.com/pasonatech-tony/svg-store/main/indeterminate.svg"
            title4="不確定境界"
            description="(出典：Diercke Weltatlas)"
            width={24}
            height={20}
          />
        </Panel>
      </Collapse>
    </div>
  );
};

export default PanelTwo;
