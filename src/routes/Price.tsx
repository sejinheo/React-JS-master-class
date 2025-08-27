/*function Price() {
    return <h1>Price</h1>
}

export default Price;*/

// src/routes/Price.tsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinTickers, fetchCoinHistory } from "../api";
import styled from "styled-components";

const Wrap = styled.div`
  display: grid;
  gap: 12px;
`;

const PriceHeading = styled.h2`
  margin: 0;
  font-weight: 800;
`;

const ChangeRow = styled.div`
  display: flex;
  gap: 12px;
  font-weight: 700;
`;

const Change = styled.span<{ up: boolean }>`
  color: ${({ up, theme }) =>
        up ? (theme?.accentColor || "#10b981") : "#ef4444"};
`;

interface RouteParams {
    coinId: string;
}
interface PriceData {
    quotes: {
        USD: {
            price: number; percent_change_1h: number; percent_change_24h: number; percent_change_7d: number;
            market_cap: number; volume_24h: number; ath_price: number; ath_date: string;
        }
    }
}
type IHistorical = {
    time_close: string; close: number;
};

export default function Price() {
    const { coinId } = useParams<RouteParams>();

    const { data: t } = useQuery<PriceData>({
        queryKey: ["tickers", coinId], queryFn: () => fetchCoinTickers(coinId), staleTime: 30_000
    });
    const { data: h } = useQuery<IHistorical[]>({
        queryKey: ["ohlcv", coinId], queryFn: () => fetchCoinHistory(coinId), staleTime: 60_000
    });

    if (!t || !h) return <div>Loading...</div>;
    const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

    return (
        <Wrap>
            <PriceHeading>{usd.format(t.quotes.USD.price)}</PriceHeading>
            <ChangeRow>
                <Change up={t.quotes.USD.percent_change_1h >= 0}>
                    1h {t.quotes.USD.percent_change_1h.toFixed(2)}%
                </Change>
                <Change up={t.quotes.USD.percent_change_24h >= 0}>
                    24h {t.quotes.USD.percent_change_24h.toFixed(2)}%
                </Change>
                <Change up={t.quotes.USD.percent_change_7d >= 0}>
                    7d {t.quotes.USD.percent_change_7d.toFixed(2)}%
                </Change>
            </ChangeRow>
        </Wrap>
    );
}
