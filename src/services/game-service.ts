import { ApiContext } from "@/api/ApiProvider"
import { GetActiveGameResponse } from "@/models/getActiveGameResponse";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react"
import { toasterError } from "./notification-service";

export interface GameService {
    activeGame?: GetActiveGameResponse;
    loading: boolean;
}

export function useGameService(): GameService {
    const { generalApi } = useContext(ApiContext);

    const result = useQuery({
        queryKey: ['activeGame'],
        queryFn: () => generalApi.getActiveGame(),
    });

    useEffect(() => {
        if (result.isError) {
            toasterError('Unable to load data');
        }
    }, [result.isError]);

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
