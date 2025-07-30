import { useEffect, useState } from "react";
import axios from "axios";
import type { Quotes } from "../types/quote";

const QuotesComponent = () => {
  const [quotes, setQuotes] = useState<Quotes>([]);

  useEffect(() => {
    const fetchData = async () => {
      const quotesResult = await axios.get("http://localhost:3232/quotes");
      setQuotes(quotesResult.data);
    };

    fetchData();
  }, []);

  console.log(quotes);

  return (
    <>
      {quotes.map((quote) => (
        <div key={quote.id}>{quote.quote}</div>
      ))}
    </>
  );
};

export default QuotesComponent;
