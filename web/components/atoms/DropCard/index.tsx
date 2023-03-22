import { styled } from "@web/theme";

type CardProps = {
  imgSrc?: string;
  title: string;
  imgSrc2?: string;
  title2?: string;
  imgSrc3?: string;
  title3?: string;
  imgSrc4?: string;
  title4?: string;
  description: string;
  width?: number;
  height?: number;
};

const DropCard: React.FC<CardProps> = ({
  imgSrc,
  title,
  imgSrc2,
  title2,
  imgSrc3,
  title3,
  imgSrc4,
  title4,
  description,
  width,
  height,
}: CardProps) => {
  return (
    <Wrapper>
      <Line>
        <Icon src={imgSrc} width={width} height={height} />
        <Title>{title}</Title>
      </Line>
      {imgSrc2 && (
        <Line>
          <Icon src={imgSrc2} width={width} height={height} />
          <Title>{title2}</Title>
        </Line>
      )}
      {imgSrc3 && (
        <Line>
          <Icon src={imgSrc3} width={width} height={height} />
          <Title>{title3}</Title>
        </Line>
      )}
      {imgSrc4 && (
        <Line>
          <Icon src={imgSrc4} width={width} height={height} />
          <Title>{title4}</Title>
        </Line>
      )}

      <Description>{description}</Description>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 4px;
  max-width: 300px;
`;

const Line = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
`;

const Icon = styled.img`
  margin-right: 3px;
`;

const Title = styled.span`
  font-size: 14px;
  color: #333;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 0;
  display: flex;
  justify-content: end;
`;

export default DropCard;
