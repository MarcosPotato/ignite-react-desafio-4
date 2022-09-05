import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return(
    <>
    <Modal isOpen={ isOpen } onClose={ onClose }>
      <ModalOverlay />
      <ModalContent
        backgroundColor="gray.800"
        borderRadius="10px"
        width="auto"
        maxWidth="900px"
      >
        <ModalBody padding="0" maxWidth="900px">
          <Image
            maxWidth="900px"
            maxHeight="600px" 
            src={ imgUrl } 
            alt="selected image"
            borderTopLeftRadius="10px"
            borderTopRightRadius="10px"
          />
        </ModalBody>
        <ModalFooter display="flex" justifyContent="flex-start">
          <Link href={ imgUrl } target="_blank" color="gray.50">
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
  )
}
