import Home from "./page";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";


describe("Home Page (integration test)", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  })

  it("should fetch pokemon list and display it correctly", async () => {
    const mockResponse = {

      results: [
        {
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
          name: 'bulbasaur'
        },
        {
          url: 'https://pokeapi.co/api/v2/pokemon/2/',
          name: 'ivysaur'
        }
      ]
    };
    (global.fetch as jest.Mock)
      .mockResolvedValue(
        {
          ok: true,
          json: async () => Promise.resolve(mockResponse)
        })

        const ui = await Home()
        render(ui)

        expect(screen.getByText('bulbasaur')).toBeInTheDocument()
        expect(screen.getByText('ivysaur')).toBeInTheDocument()
      })

})