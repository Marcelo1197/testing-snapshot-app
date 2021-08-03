import { create, act } from "react-test-renderer";

import { apiKey } from "../api/config";
import mockedAxios from "axios";

import PhotoContextProvider from "../context/PhotoContext";
import Container from "../components/Container";
import Loader from "../components/Loader";
import Gallery from "../components/Gallery";

let componente;

describe("<Container />", () => {

  beforeEach(async () => {
    await act(async () => {
        componente = await create(
        <PhotoContextProvider>
          <Container searchTerm="" />
        </PhotoContextProvider>)
      });
  });

  it("Renderizar correctamente ", () => {
    expect(componente.root).toBeDefined();
    expect(componente.root.findByType(Container)).toBeDefined();
    expect(componente.root.findAllByType(Gallery)).toBeDefined(); //porque si está renderizado Loader, no debería estar <Gallery />
  });

  it("Llama a la API si es necesario o cambia el texto a buscar", async () => {
      const customData =  {
        data: {
          photos: {
            photo: [
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
            ],
          }
        }
      };

      //aca, entiendo, que modificamos lo que devuelve el método get de nuestro mocked axios, asi cada vez que se ejecute axios.get
      //de ahora en mas, dentro de este test, en cualquier componente, se devolverá customData.
      mockedAxios.get.mockImplementation(() => Promise.resolve(customData));

      await act(async () => {
        await componente.update(
          <PhotoContextProvider>
            <Container searchTerm="asdadas" />
          </PhotoContextProvider>
        );
      });

      //luego del act, ya deberíamos tener la data renderizada en nuestro componente.
      expect(componente.root.findByType(Gallery)).toBeDefined();
      expect(componente.root.findByType(Gallery).props.data).toEqual(customData.data.photos.photo);
      expect(componente.root.findAllByType(Loader).length).toEqual(0);

      //comprobamos que se hayan ejecutado los métodos correspondientes de axios
      expect(mockedAxios.get).toHaveBeenCalledTimes(3);
      expect(mockedAxios.put).not.toHaveBeenCalled();
      expect(mockedAxios.post).not.toHaveBeenCalled();

  });
});
