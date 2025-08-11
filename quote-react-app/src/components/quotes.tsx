import { useEffect, useState } from "react";
import axios from "axios";
import type { Quotes } from "../types/quote";
import { API_BASE_URL } from "../config/api";

const QuotesComponent = () => {
  const [quotes, setQuotes] = useState<Quotes>([]);

  useEffect(() => {
    const fetchData = async () => {
      const quotesResult = await axios.get(`${API_BASE_URL}/quotes`);
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
