import {
  Button,
  HStack,
  Image,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import useGenres, { Genre } from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";

interface Props {
  onSelectedGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

function GenreList({ onSelectedGenre, selectedGenre }: Props) {
  const { genres, isLoading, error } = useGenres();

  if (isLoading) return <Spinner />;

  if (error) return null;
  return (
    <List>
      {genres.map((genre) => (
        <ListItem key={genre.id} paddingY="8px">
          <HStack>
            <Image
              src={getCroppedImageUrl(genre.image_background)}
              boxSize="32px"
              borderRadius={8}
            />
            <Button
              onClick={() => onSelectedGenre(genre)}
              fontSize={genre.id === selectedGenre?.id ? "lg" : "normal"}
              variant="link"
            >
              {genre.name}
            </Button>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
}

export default GenreList;
