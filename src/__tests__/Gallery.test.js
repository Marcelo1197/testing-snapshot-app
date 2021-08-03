import ReactTestUtils from "react-dom/test-utils";
import { create, act } from "react-test-renderer";

import Gallery from "../components/Gallery";
import NoImages from "../components/NoImages";
import Image from "../components/Image";
let componente;
const props = {
  data: [],
};

describe("<Gallery />", () => {
  beforeEach(() => {
    componente = create(<Gallery {...props} />);
  });

  it("Renderizado correcto de <Gallery />", () => {
    expect(componente).toBeDefined();
    expect(componente.root.findByType("div")).toBeDefined();
    expect(componente.root.findByType("ul")).toBeDefined();
  });

  it("Si no nos llega ninguna imagen de la API, mostrar <NoImages />", () => {
    expect(componente.root.props.data.length).toEqual(0); //chequeamos que no nos este llegando nada de data
    expect(componente.root.findByType(NoImages)).toBeDefined(); //noImages se renderiza SOLO cuando no nos llega data desde la API.
  });

  it("Si nos llega data desde la API, se renderizan uno o mas <Image />", () => {
    const data = [
      {
        farm: "farmTest01",
        server: "serverTest",
        id: "testId01",
        secret: "ddd",
        title: "ramdomtitle",
      },
      {
        farm: "farmTest02",
        server: "serverTest",
        id: "testId02",
        secret: "ddd",
        title: "ramdomtitle546",
      },
      {
        farm: "farmTest03",
        server: "serverTest",
        id: "TestId03",
        secret: "ddd",
        title: "ramdomtitle12",
      },
    ];

    componente.update(<Gallery data={data} />);

    expect(componente.root.findAllByType(NoImages).length).toEqual(0); //Nos devuelve un array con la cantidad de <NoImages /> renderizados. Como no queremos que se renderice, debe ser 0.
    expect(componente.root.findAllByType(Image).length).toEqual(data.length);
    expect(componente.root.findAllByType(Image).length).toBeGreaterThanOrEqual(
      1
    );
  });
});
