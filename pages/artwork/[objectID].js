import { useRouter } from 'next/router';
import { Row, Col } from 'react-bootstrap';
import ArtworkCardsDetail from '@/components/ArtworkCardDetails';

export default function ArtworkById() {
    const router = useRouter();
    const { objectID } = router.query;
    console.log(objectID)
    return <Row>
        <Col>
            <ArtworkCardsDetail objectID={objectID} />
        </Col>
    </Row>

}