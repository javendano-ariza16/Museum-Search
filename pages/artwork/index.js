import { useState, useEffect } from 'react';
import useSWR from 'swr';
import	{useRouter} from 'next/router';
import { Col, Row, Pagination } from 'react-bootstrap';
import ArtworkCards from '@/components/ArtworkCard';
import Error from 'next/error';

const PER_PAGE=12;

export default function ArtworkPage () {
    const [artworkList, setArtworkList] = useState([]);
    const [page, setPage] = useState(1);
    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];

    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);

    useEffect(() => {
        if (data) {
           let results = []
            for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
                const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
                results.push(chunk);
              }         
            setArtworkList(results);
            setPage(1)
        }
      }, [data]);

      if (error) {
        console.log('The issue is in the artworkpage')
        return <Error statusCode={404} />;
      }     

      function previousPage(){
        if(page > 1)
        setPage(page - 1)
      }
      function nextPage(){
        if(page < artworkList.length)
        setPage(page + 1)
      }
      if(artworkList)
      return<>
        <Row className="gy-4">
            {artworkList.length > 0 && artworkList[page-1].map((currentObjectID)=>
            <Col lg={3} key={currentObjectID}><ArtworkCards objectID={currentObjectID} /></Col>
            )}
            {artworkList.length == 0 && <h4>Nothing Here</h4>}
            {/* We have to improve this part */}
        </Row>
          {artworkList.length > 0 &&
           <Row>
              <Col>
                  <Pagination>
                      <Pagination.Prev onClick={previousPage} />
                      <Pagination.Item>{page}</Pagination.Item>
                      <Pagination.Next onClick={nextPage} />
                  </Pagination>
              </Col>
            </Row>}
    </>
      //TO DO: Improve this part     
  };