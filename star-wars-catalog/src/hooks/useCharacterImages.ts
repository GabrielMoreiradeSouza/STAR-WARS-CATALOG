import { useQuery } from '@tanstack/react-query';

interface AkababCharacter {
  id: number;
  name: string;
  image: string;
}

const AKABAB_URL = 'https://akabab.github.io/starwars-api/api/all.json';

export function useCharacterImages() {
  return useQuery<Record<string, string>>({
    queryKey: ['characters', 'images'],
    queryFn: async () => {
      const res = await fetch(AKABAB_URL);
      const data: AkababCharacter[] = await res.json();
      const map: Record<string, string> = {};
      for (const char of data) {
        if (char.image) {
          map[char.name.toLowerCase()] = char.image;
        }
      }
      return map;
    },
    staleTime: 60 * 60 * 1000,
  });
}
