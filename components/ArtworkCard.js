import useSWR from 'swr';
import Error from 'next/error';
import { Card, Button  } from 'react-bootstrap';
import Link from 'next/link';

export default function ArtworkCards(props){
    const { data, error } = useSWR(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props?.objectID}`
      );
    if(error){
      console.log("ArtworkCards")
        return <Error statusCode={404} />;
    }
    if(data)
      return (
        <Card>
          <Card.Img
            variant="top"
            src={data.primaryImageSmall || 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'}
            alt={data.title}
          />
          <Card.Body>
            <Card.Title>{data.title || 'N/A'}</Card.Title>
            <Card.Text>
              <p>
              <strong>Date:</strong> {data.objectDate || 'N/A'}
              <br />
              <strong>Classification:</strong> {data.classification || 'N/A'}
              <br />
              <strong>Medium:</strong> {data.medium || 'N/A'}
              <br/>
              </p>
              </Card.Text>
                <Link href={`/artwork/${data.objectID}`} passHref>
                  <Button>{data.objectID}</Button>
                </Link>
          </Card.Body>
        </Card>
      );
    };