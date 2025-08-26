import { fetchCoinHistory } from "../api";
import { useQuery } from "@tanstack/react-query";

interface ChartProps {
    coinId: string;
}

type OHLCV = {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
  };

function Chart({coinId}:ChartProps) {
    const { data, isPending, error } = useQuery<OHLCV[]>({
        queryKey: ["ohlcv", coinId],             
        queryFn: () => fetchCoinHistory(coinId),
        staleTime: 60_000,
      });
    
      if (isPending) return <h1>Loading...</h1>;
      if (error) return <h1>데이터 로드 에러</h1>;
    return <h1>Chart</h1>
}

export default Chart;