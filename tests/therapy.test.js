// write tests for functions

import getMachineReponse from "~/server/MachineReponse.ts";

describe("function", () => {
  it("should write tests for functions", async () => {
    const response = await getMachineReponse();
    expect(response).toBeInstanceOf(Object);
  });

  it("should return back the same value", () => {});

  it.todo("correctly deducts amount");

  it.todo("correctly");
});
