import { ApiContext } from "@/api/ApiProvider"
import { GetActiveGameResponse } from "@/models/getActiveGameResponse";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react"

export interface GameService {
    activeGame?: GetActiveGameResponse;
    loading: boolean;
}

export function useGameService(): GameService {
    const api = useContext(ApiContext);

    const result = useQuery({
        queryKey: ['activeGame'],
        queryFn: () => api.getActiveGame(),
    });

    return {
        activeGame: result.data ? {
            _id: result.data._id,
            asset: result.data.asset,
            createdAt: result.data.createdAt,
            name: result.data.name,
            prize: result.data.prize,
            status: result.data.status,
            ticketPrice: result.data.ticketPrice,
            endsAt: new Date(result.data.endsAt)
        } : undefined,
        loading: result.isFetching,
    };
};
