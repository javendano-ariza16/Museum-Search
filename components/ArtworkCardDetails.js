import useSWR from 'swr';
import Error from 'next/error';
import { Card } from 'react-bootstrap';
export default function ArtworkCardsDetail(props){
    const { data, error } = useSWR(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props?.objectID}`
      );
    if(error){
        console.log('The issue is in the ArtworkCards')
        return <Error statusCode={404} />;
    }
    if (!data) {
        return null;
      }
    
      const {
        primaryImage,
        title,
        objectDate,
        classification,
        medium,
        artistDisplayName,
        creditLine,
        dimensions,
        artistWikidata_URL,
      } = data;
    
      return (
        <Card>
          {primaryImage && <Card.Img variant="top" src={primaryImage} alt={title} />}
          <Card.Body>
            <Card.Title>{title || 'N/A'}</Card.Title>
            <Card.Text>
              <strong>Date:</strong> {objectDate || 'N/A'}
              <br />
              <strong>Classification:</strong> {classification || 'N/A'}
              <br />
              <strong>Medium:</strong> {medium || 'N/A'}
              <br />
              {medium && <br />}
              <strong>Artist:</strong> {artistDisplayName + ' '|| 'N/A'}
              {artistDisplayName && artistWikidata_URL && (
                <a href={artistWikidata_URL} target="_blank" rel="noreferrer">
                  wiki
                </a>
              )}
              <br />
              <strong>Credit Line:</strong> {creditLine || 'N/A'}
              <br />
              <strong>Dimensions:</strong> {dimensions || 'N/A'}
            </Card.Text>
          </Card.Body>
        </Card>
      );
    };