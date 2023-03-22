import { styled } from "@web/theme";

type CardProps = {
  padding?: string;
  children?: React.ReactNode;
  flex?: string;
  gap?: string;
  imgLink?: string;
  title?: string;
  desc?: string;
  onClick?: () => void; // added onClick function
};

const MapCard: React.FC<CardProps> = ({
  padding,
  imgLink,
  flex,
  gap,
  title,
  desc,
  onClick, // destructured onClick prop
}: CardProps) => {
  return (
    <Wrapper padding={padding} flex={flex} gap={gap} onClick={onClick}>
      <ImageContainer>
        <Image src={imgLink} alt="Card background image" />
        <Title>{title}</Title>
        <Description>{desc}</Description>
      </ImageContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div<CardProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${(props: any) => props.gap ?? "8px"};
  flex: ${(props: any) => props.flex ?? "none"};
  border-radius: 2px;
  padding: ${(props: any) => props.padding ?? "8px"};
`;

const Title = styled.h4`
  padding: 0px 10px;
  background: #fdf9efb5;
  font-size: 16px;
  width: fit-content;
  font-family: "Noto Sans" !important;
  font-style: normal;
  font-weight: 500;
  border-radius: 1px;
  height: 26px;
  display: block;
  position: absolute;
`;

const Description = styled.span`
  display: block;
  position: relative;
  bottom: -66px;
  font-family: "Noto Sans" !important;
  font-style: normal;
  font-weight: 400;
  color: black;
  font-size: 12px;
  text-align: right;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
  height: 22px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 88px;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: 310px;
  margin-top: 15px;
  max-width: 100%;
  display: block;
  border-radius: 4px;
`;

export default MapCard;
