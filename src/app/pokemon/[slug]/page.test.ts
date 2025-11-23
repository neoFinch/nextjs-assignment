/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import PokemonPage from "./page";
import "@testing-library/jest-dom";

describe("Pokemon Detail Page (Integration Test)", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("renders pokemon detail", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () =>
        Promise.resolve({
          name: "bulbasaur",
          sprites: {
            other: {
              "official-artwork": {
                front_default:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
              },
            },
          },
          types: [{ type: { name: "grass" } }],
          stats: [{ stat: { name: "hp" }, base_stat: 45 }],
        }),
    });

    const ui = await PokemonPage({ params: Promise.resolve({ slug: "bulbasaur" }) });

    render(ui);

    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("grass")).toBeInTheDocument();
    expect(screen.getByText("hp")).toBeInTheDocument();
  });
});
