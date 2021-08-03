describe("Probando conceptos", () => {
  it("prueba", () => {
    const filterTestFn = jest.fn();

    // Make the mock return `true` for the first call,
    // and `false` for the second call
    //filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

    for (let i = 0; i < 4; i++) {
      filterTestFn();
    }

    // > [11, "si devuelve"]
    console.log(filterTestFn.mock.calls);
    //console.log(filterTestFn.mock.calls[0][0]); // 11
    //console.log(filterTestFn.mock.calls[1][0]); // 12
  });

  it("Explorando mock function", () => {
    let devuelveTrue = jest.fn(() => true);
    console.log(devuelveTrue());
    devuelveTrue();

    expect(devuelveTrue).toHaveBeenCalled();
    expect(devuelveTrue).toHaveBeenCalledTimes(2);
    expect(devuelveTrue).toHaveReturned();
    expect(devuelveTrue).toHaveReturnedWith(true);

    devuelveTrue.mockImplementation(() => false);
    devuelveTrue();
    expect(devuelveTrue).toHaveReturnedWith(false);
  });
});
