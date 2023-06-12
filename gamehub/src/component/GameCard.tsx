import { Game } from "../hooks/useGames";
import { Card, CardBody, Heading, Image, Text } from "@chakra-ui/react";
import PlatformiconList from "./PlatformiconList";

interface Props {
  game: Game;
}
function GameCard({ game }: Props) {
  return (
    <Card borderRadius={10} overflow="hidden">
      <Image src={game.background_image} />
      <CardBody>
        <Heading fontSize="2xl">{game.name}</Heading>
        {/* {game.parent_platforms.map(({ platform }) => (
          <Text>{platform.name}</Text>
        ))} */}

        <PlatformiconList
          platforms={game.parent_platforms.map((p) => p.platform)}
        />
      </CardBody>
    </Card>
  );
}

export default GameCard;
