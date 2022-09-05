import { Flex, SimpleGrid, useDisclosure, Image, Stack, Text, Heading } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const [imageUrl, setImageUrl] = useState<string>("")

  const handleViewImage = useCallback((imageUrl: string) => {
    setImageUrl(imageUrl)
    onOpen()
  },[])

  return (
    <>
      <SimpleGrid columns={3} gap="40px" flex={1}>
        { cards.map(card => (
          <Card key={ card.id } data={card} viewImage={ handleViewImage }/>
        ))}
      </SimpleGrid>
      <ModalViewImage 
        imgUrl={ imageUrl }
        isOpen={ isOpen }
        onClose={ onClose }
      />
    </>
  );
}
