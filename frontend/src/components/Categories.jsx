import styled from "styled-components";
import { categories } from "../sliderData";
import Categoryitem from "./Categoryitem";
import { mobil } from "../responsive";
const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobil({ padding: "0px", flexDirection: "column" })}
`;

function Categories() {
  return (
    <Container>
      {categories.map((item) => (
        <Categoryitem item={item} />
      ))}
    </Container>
  );
}

export default Categories;
