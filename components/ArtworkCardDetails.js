import useSWR from 'swr';
import Error from 'next/error';
import { Card,Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useState } from 'react';
import { useEffect } from 'react';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';


export default function ArtworkCardsDetail(props){

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

    const [showAdded, setShowAdded] = useState(false)

    useEffect(()=>{
      setShowAdded(favouritesList?.includes(props.objectID))
  }, [favouritesList])
  

    async function favouritesClicked () {
      if(showAdded) {
        setFavouritesList(await removeFromFavourites(props.objectID)) ;
        console.log(props)
        setShowAdded(false) 
      }else{
        setFavouritesList(await addToFavourites(props.objectID));
        setShowAdded(true)
      }
    }

    const { data, error } = useSWR(
      props.objectID?`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`:null
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
              <p>
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
              <br/>
              <br/>
              <Button variant={showAdded?"primary":"outline-primary"} onClick={favouritesClicked}> {showAdded?"+ Favourite (added)" : "+ Favourite" }</Button>
              </p>
            </Card.Text>
          </Card.Body>
        </Card>
      );
    };