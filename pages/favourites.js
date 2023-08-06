import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Col, Row, Card, Button } from 'react-bootstrap';
import ArtworkCards from '@/components/ArtworkCard';
import Error from 'next/error';
import Link from "next/link";

export default function Favourites() {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)

    if(!favouritesList) return null;
    console.log(favouritesList)
    
    if(favouritesList.length==0)
    return(
        <Card className="card text-white bg-primary mb-3">
        <Card.Body>
          <Card.Title>Nothing Here </Card.Title>
          <Card.Text>
          Try adding some new artwork to the list.
          </Card.Text>
          <Link href="/search" passHref><Button variant="secondary">Go Search</Button></Link>
        </Card.Body>
      </Card>
    )
    return<>
    <Row className="gy-4">
        {favouritesList.length > 0 && favouritesList.map((currentObjectID)=>
        <Col lg={3} key={currentObjectID}><ArtworkCards objectID={currentObjectID} /></Col>
        )}
    </Row>
    </>
}