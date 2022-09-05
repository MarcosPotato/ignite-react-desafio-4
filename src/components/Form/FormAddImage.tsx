import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { FieldError, useForm } from 'react-hook-form';
import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormData{
  image: string
  title: string
  description: string
}

interface RequestData{
  url: string
  title: string
  description: string
}

interface FormAddImageProps {
  closeModal: () => void;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const formValidations = {
    image: {
      required: true,
      validate: (value: FileList) => {
        const valueInKbytes = value[0].size / 1000
        return valueInKbytes < 10000
      }
    },
    title: {
      required: true,
      minLength: 2,
      maxLength: 20
    },
    description: {
      required: true,
      maxLength: 65
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation((data: RequestData) => {
    return api.post("images", data)
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries(['images'])
    }
  });

  const {
    register,
    handleSubmit,
    reset,
    formState,
    setError,
    trigger,
  } = useForm();

  const { errors } = formState;

  const onSubmit = async (data: FormData): Promise<void> => {
    console.log("teste 123123")
    console.log(data)
    try {
      if(!imageUrl){
        toast({
          status: "error",
          title: "Imagem não adicionada",
          description: "É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.",
          duration: 5000,
          isClosable: true
        })

        return
      }

      await mutation.mutateAsync({
        ...data,
        url: imageUrl
      })

      toast({
        status: "success",
        title: "Imagem cadastrada",
        description: "Sua imagem foi cadastrada com sucesso.",
        duration: 5000,
        isClosable: true
      })
    } catch {
      toast({
        status: "error",
        title: "Falha no cadastro",
        description: "Ocorreu um erro ao tentar cadastrar a sua imagem.",
        duration: 5000,
        isClosable: true
      })
    } finally {
      reset()
      setImageUrl("")
      setLocalImageUrl("")
      closeModal()
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          error={ errors.image as FieldError }
          { ...register("image", formValidations.image) }
        />

        <TextInput
          placeholder="Título da imagem..."
          error={ errors.title as FieldError }
          { ...register("title", formValidations.title) }
        />

        <TextInput
          placeholder="Descrição da imagem..."
          error={ errors.description as FieldError }
          { ...register("description", formValidations.description) }
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
