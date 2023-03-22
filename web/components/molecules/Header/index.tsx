import { styled } from "@web/theme";

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <span style={{ padding: "0 5px" }}>世界の地形</span>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  flex: 0 0 auto;
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00bebe;
  font-size: large;
  padding-top: 12px;
`;

export default Header;
