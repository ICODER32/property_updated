import { Button, Card, CardBody, CardFooter, Heading, Stack, Text } from '@chakra-ui/react'
import { Carousel } from 'react-responsive-carousel'
import { Navbar } from '../components'
import { USER_PROPERTIES_QUERY, DELETE_PROPERTY } from '../utils/mutations'
import { Link } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client';
const AdminProperties = () => {
    const id = localStorage.getItem('user_id')

    const { loading, error, data } = useQuery(USER_PROPERTIES_QUERY, {
        variables: { user_id: id },
    });
    const [deletePropertyMutation, { data: data2, loading: loading2, error: error2 }] = useMutation(DELETE_PROPERTY);

    const handleDelete = (id) => {

        deletePropertyMutation({ variables: { _id: id } }).then(() => {
            alert("Deleted Successfully")
            window.location.reload()
        }).catch(err => {
            alert(error2)
        });


    }

    if (error) {
        return (<>
            <Navbar />
            <h1>{error}</h1></>)
    }

    if (data?.userProperties.length === 0) {
        return (
            <>
                <Navbar />
                <h1>No Properties Yet</h1>
            </>
        )
    }

    return (
        <>
            <Navbar />
            {
                loading ? (<>
                    <h3>Loading....</h3>
                </>) : (
                    <>
                        {
                            data?.userProperties.map(item => (
                                <div className='admin_property'>

                                    <Card
                                        direction={{ base: 'column', sm: 'row' }}
                                        overflow='hidden'
                                        variant='outline'
                                    >
                                        <Carousel>
                                            {item.images.map(item => (
                                                <img src={item} height='200px' width='100px' />
                                            ))}
                                        </Carousel>


                                        <Stack>
                                            <CardBody>
                                                <Heading size='md'>{item.name}</Heading>

                                                <Text py='2'>
                                                    {item.description}
                                                </Text>
                                                <Text py='2'>
                                                    {item.room ? 'Room' : 'House'}
                                                </Text>
                                                <Text py='2'>
                                                    {item.night_cost} $
                                                </Text>
                                                <Text py='2'>
                                                    {item.max_guests}
                                                </Text>
                                            </CardBody>

                                            <CardFooter>
                                                <Button onClick={() => { handleDelete(item._id) }} m={10} variant='solid' colorScheme='red'>
                                                    Delete
                                                </Button>
                                                <Link to={`/editProperty/${item._id}`}>
                                                    <Button margin={10} variant='solid' colorScheme='green'>
                                                        Edit
                                                    </Button>
                                                </Link>
                                            </CardFooter>
                                        </Stack>
                                    </Card>
                                </div>
                            ))
                        }
                    </>

                )
            }
        </>
    )
}

export default AdminProperties