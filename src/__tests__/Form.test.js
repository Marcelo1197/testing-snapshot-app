import { create, act } from "react-test-renderer";

import Form from "../components/Form";

const props = {
  history: {},
  handleSubmit: () => {},
};

let componente;

describe("<Form />", () => {
  beforeEach(() => {
    componente = create(<Form {...props} />);
  });

  it("Renderizado del componente", () => {
    expect(componente).toBeDefined();
    //DBG console.log(componente);
    expect(componente.toJSON().type).toEqual("form");
    //DBG console.log(componente.toJSON());
    //Comprobamos que estén definidos/existan los elementos en nuestra snapshot del dom
    expect(componente.root.findByType("input")).toBeDefined();
    expect(componente.root.findByType("button")).toBeDefined();
    expect(componente.root.findByType("svg")).toBeDefined();
  });

  it("Si el input está vacío, el botón debe estar deshabilitado", () => {
    const boton = componente.root.findByType("button"); // o definimos const form = componente.findByType("form"); y luego const boton = form.findByType("button");
    const input = componente.root.findByType("input");

    expect(boton.props.disabled).toBeTruthy();
    expect(boton.props.className).toEqual("search-button null");

    //DBGconsole.log(input.props);
    //DBG console.log(boton.props);
  });

  it("Si el input tiene contenido, el botón debe estar habilitado", () => {
    const input = componente.root.findByType("input");
    const boton = componente.root.findByType("button");

    // el onchange espera recibir un {} que tenga esta estructura: e.target.value
    act(() => {
      input.props.onChange({ target: { value: "hola" } });
    });
    expect(boton.props.className).toEqual("search-button active");
    expect(boton.props.disabled).toBeFalsy();
  });

  it("El evento onSubmit debe ejecutarse correctamente", () => {
    const form = componente.root.findByType("form");
    form.props.onSubmit();

    //testeamos .handleSubmit() porque es la funcion que se le asigno al evento onSubmit

      expect(props.handleSubmit()).toHaveBeenCalled();
      expect(props.handleSubmit()).toHaveBeenCalledTimes(2);
      expect(props.handleSubmit()).toHaveBeenNthCalledWith(
        undefined,
        props.history,
        ""
      );

    /*
    validamos que "" sea el 3er argumento de handleSubmit(), porque recordar que dentro de cada it, se crea una nueva instancia
    del componente, gracias a beforeEach(). Por ende, hay que pensarlo todo como una "primera ejecucion". 
    Dentro de este it, se crea/monta el componente en el snapshot, se dispara el onSubmit, y como no indicamos ningun valor al input
    del form, el 3er argumento de handleSubmit() será "".
    Sería distinto si ejecutamos el onChange con el act() como linea 44, allí si tendríamos un 3er argumetno distinto de "".
    */
  });
});
