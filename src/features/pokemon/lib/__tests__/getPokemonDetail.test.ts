import { getPokemonDetail } from "../getPokemonDetail";

describe('getPokemonDetail', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  it('should fetch pokemon detail and transform it correctly', async () => {
    const mockResponse = {
      name: 'bulbasaur',
      sprites: {
        other: {
          'official-artwork': {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
          }
        }
      },
      types: [
        {
          type: {
            name: 'grass'
          }
        }
      ],
      stats: [
        {
          stat: {
            name: 'hp'
          },
          base_stat: 45
        }
      ]
    };
    (global.fetch as jest.Mock)
      .mockResolvedValue(
        {
          ok: true,
          json: async () => Promise.resolve(mockResponse)
        });

    const result = await getPokemonDetail('bulbasaur');
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/bulbasaur');
  });

  it("should throw error if pokemon not found", async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValue(
        {
          ok: false,
          status: 404,
          statusText: 'Not Found'
        }
      )
    await expect(getPokemonDetail('bulbasaur_'))
      .rejects
      .toThrow('Pokemon "bulbasaur_" not found');

  });
})