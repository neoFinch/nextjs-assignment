import { getPokemonList } from "../getPokemonList";

describe('getPokemonList', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  })
  it('should fetch pokemon list and transform it correctly', async () => {

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
        });

    const result = await getPokemonList(2, 0);
    expect(result).toEqual([
      { id: '1', name: 'bulbasaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
      { id: '2', name: 'ivysaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png' },
    ]);
    expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?limit=2&offset=0');
  });

  it("throws network error when fetch rejects", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("network fail"));
    await expect(getPokemonList(2, 0)).rejects.toThrow('network fail');
  });

  it('should throw error if response does not have results property', async () => {
    const mockResponse = {
      data: [
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
      .mockResolvedValue({
        ok: true,
        json: async () => Promise.resolve(mockResponse)
      });
    await expect(getPokemonList(2, 0)).rejects.toThrow('Invalid response format from Pokemon API');
  });
});