import {useSelector,useDispatch} from "react-redux"
import { Link as ReactLink} from 'react-router-dom';
import {useNavigate,Navigate} from "react-router-dom"
import {
    Badge,
    Button,
    Center,
    color,
    Flex,
    Heading,
    Image,
    Link,
    Stack,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  
  export default function SocialProfile() {

   
     // global state
  const {email,username,name,bio} = useSelector((state) => state.user)
  const dispatch = useDispatch()

   // cannot access this page if not login
   const token = localStorage.getItem('token')
   if(!token) return <Navigate to="/login" />
  const color = useColorModeValue
    return (
      <Center py={0}>
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          w={{ sm: '50%', md: '70%' }}
          height={{ sm: '476px', md: '20rem' }}
          direction={{ base: 'column', md: 'row' }}
          bg={color('white', 'gray.900')}
          boxShadow={'2xl'}
          padding={4}>
          {/* <Flex flex={1} bg="blue.200"> */}
          <Flex flex={1}  alignItems="center"  justifyContent="center">
            <Image
              objectFit="cover"
              boxSize="50%"
              borderRadius={'50%'}
              src={
                'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
              }
            />
          </Flex>
          <Stack
            flex={3}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}>
            <Heading fontSize={'2xl'} fontFamily={'body'}>
               {name}
            </Heading>
            <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
            {username}
            </Text>
            <Text
              textAlign={'center'}
              color={color('gray.700', 'gray.400')}
              px={3}>
            {bio}
            </Text>
            <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
              <Badge
                px={2}
                py={1}
                bg={color('gray.50', 'gray.800')}
                fontWeight={'400'}>
                #art
              </Badge>
              <Badge
                px={2}
                py={1}
                bg={color('gray.50', 'gray.800')}
                fontWeight={'400'}>
                #photography
              </Badge>
              <Badge
                px={2}
                py={1}
                bg={color('gray.50', 'gray.800')}
                fontWeight={'400'}>
                #music
              </Badge>
            </Stack>
  
            <Stack
              width={'30%'}
              mt={'2rem'}
              direction={'row'}
              padding={2}
              justifyContent={'space-between'}
              alignItems={'center'}>
              {/* <Button
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                _focus={{
                  bg: 'gray.200',
                }}>
                Message
              </Button> */}
              <Button
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                boxShadow={
                  '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                _hover={{
                  bg: 'blue.500',
                }}
                _focus={{
                  bg: 'blue.500',
                }}>
                Create Post
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Center>
    );
  }