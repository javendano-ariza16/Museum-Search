import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import styles from '@/styles/History.module.css';
import { removeFromHistory } from "@/lib/userData";

export default function History() {
    const router = useRouter()

    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

    let parsedHistory = [];

    
    if(!searchHistory) return null;

    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    function historyClicked (e, index){
        router.push(`/artwork?${searchHistory[index]}`)
    }

    async function removeHistoryClicked(e, index){
        e.stopPropagation(); // stop the event from trigging other events
        setSearchHistory( await removeFromHistory(searchHistory[index])) 
    }


    if(parsedHistory.length>0){
        return(
        <ListGroup>
            {parsedHistory.map((historyItem, index) =>
            <ListGroupItem className={styles.historyListItem} onClick={e => historyClicked(e, index)}>
                {Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}
                <Button className="float-end" variant="danger" size="sm" 
                onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
            </ListGroupItem>
            )
            }
        </ListGroup>
        )
    }else{
    return (
        <Card className="card text-white bg-primary mb-3">
          <Card.Body>
            <Card.Title>Nothing Here </Card.Title>
            <Card.Text>
            Try searching for some artwork
            </Card.Text>
            <Link href="/search" passHref><Button variant="secondary">Go Search</Button></Link>
          </Card.Body>
        </Card>
      );
    }
}